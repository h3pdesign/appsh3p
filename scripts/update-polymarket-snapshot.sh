#!/usr/bin/env sh
set -eu

MAP_PATH="docs/public/polymarket-us-politics/data/market-id-map.json"
OUT_PATH="docs/public/polymarket-us-politics/data/polymarket-market-snapshot.json"
META_PATH="docs/public/polymarket-us-politics/data/polymarket-snapshot-meta.json"

API_BASE="https://gamma-api.polymarket.com/markets"
USER_AGENT="appsh3p-market-snapshot/1.0"

TMP_DIR=$(mktemp -d)
IDS_FILE="$TMP_DIR/ids.txt"
SUCCESS_FILE="$TMP_DIR/success.ndjson"
FAILED_FILE="$TMP_DIR/failed.ndjson"

cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT INT TERM

# Extract unique market ids from the map
node - <<'NODE' "$MAP_PATH" > "$IDS_FILE"
const fs = require("fs");

const mapPath = process.argv[2];
const payload = JSON.parse(fs.readFileSync(mapPath, "utf8"));
const entries = Array.isArray(payload?.entries) ? payload.entries : [];

const ids = [...new Set(
  entries
    .map(e => String(e?.market_id || "").trim())
    .filter(Boolean)
)];

for (const id of ids) process.stdout.write(id + "\n");
NODE

TOTAL_IDS=$(wc -l < "$IDS_FILE" | tr -d ' ')

: > "$SUCCESS_FILE"
: > "$FAILED_FILE"

# Fetch markets one by one (simple + reliable)
while IFS= read -r ID; do
  [ -n "$ID" ] || continue

  BODY=$(curl -L -sS --max-time 15 \
    -H "accept: application/json" \
    -H "user-agent: $USER_AGENT" \
    "$API_BASE/$ID" || true)

  if [ -n "$BODY" ] && printf '%s' "$BODY" | node -e '
    const fs=require("fs");
    const raw=fs.readFileSync(0,"utf8");
    const p=JSON.parse(raw);
    if(!p || !p.id) process.exit(1);
  ' 2>/dev/null; then
    printf '%s\n' "$BODY" >> "$SUCCESS_FILE"
  else
    printf '{"id":"%s","error":"fetch failed"}\n' "$ID" >> "$FAILED_FILE"
  fi

  # be kind to the API
  sleep 0.04
done < "$IDS_FILE"

# Build snapshot JSON + write meta JSON (always changes)
node - <<'NODE' "$SUCCESS_FILE" "$FAILED_FILE" "$OUT_PATH" "$META_PATH" "$TOTAL_IDS"
const fs = require("fs");

const [successPath, failedPath, outPath, metaPath, totalIdsRaw] = process.argv.slice(2);
const totalIds = Number(totalIdsRaw) || 0;

function readNdjson(path) {
  const raw = fs.readFileSync(path, "utf8").trim();
  if (!raw) return [];
  return raw.split(/\n+/).map(line => JSON.parse(line));
}

function projectMarket(market) {
  return {
    id: String(market?.id || ""),
    question: market?.question || null,
    slug: market?.slug || null,
    outcomes: market?.outcomes ?? [],
    outcomePrices: market?.outcomePrices ?? [],
    volume: market?.volume ?? null,
    updatedAt: market?.updatedAt || null,
    updated_at: market?.updated_at || null,
    lastUpdated: market?.lastUpdated || null,
    last_updated: market?.last_updated || null,
    active: Boolean(market?.active),
    closed: Boolean(market?.closed),
  };
}

const markets = readNdjson(successPath).map(projectMarket).filter(m => m.id);
const failed = readNdjson(failedPath);

if (markets.length === 0) {
  console.error("Snapshot update failed: no markets fetched successfully");
  process.exit(1);
}

const nowIso = new Date().toISOString();

const snapshot = {
  updated_at_utc: nowIso,
  source: "Polymarket Gamma API",
  total_ids: totalIds,
  fetched_markets: markets.length,
  failed_count: failed.length,
  failed,
  markets,
};

fs.writeFileSync(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);

const meta = {
  source: "Polymarket Gamma API",
  fetchedAtUtc: nowIso,
};

fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

console.log(`Snapshot written: ${markets.length}/${totalIds} markets`);
console.log(`Meta written: ${metaPath}`);
NODE