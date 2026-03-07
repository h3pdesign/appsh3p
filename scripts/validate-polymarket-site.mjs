import fs from "node:fs";
import path from "node:path";

const baseDir = path.join("docs", "public", "polymarket-us-politics");

const centralPage = "state-of-us-politics.html";
const conflictPage = "conflict-monitor.html";

const wrapperPages = [
  "foreign-policy.html",
  "2028-race.html",
  "trump.html",
  "fed-economy.html",
  "midterms.html",
  "congress.html",
  "legal.html",
  "social-media.html",
];

const pages = [centralPage, conflictPage, ...wrapperPages];

const requiredPredictionPageSnippets = [
  "<meta name=\"description\"",
  "<link rel=\"canonical\"",
  "id=\"syncStatus\"",
  "status-pill",
  "function setSyncStatus(",
  "function formatDualTimestamp(",
  "POLYMARKET_SNAPSHOT_URL",
  "loadPolymarketSnapshot(",
];

const requiredConflictPageSnippets = [
  "<meta name=\"description\"",
  "<link rel=\"canonical\"",
  "id=\"syncStatus\"",
  "status-pill",
  "function setSyncStatus(",
  "function formatDualTimestamp(",
  "id=\"conflictTimelineList\"",
  "id=\"iranWarSource2\"",
  "id=\"ukraine-war\"",
  "CONFLICT_NEWS_URL",
  "renderConflictTicker(",
  "POLYMARKET_SNAPSHOT_URL",
  "loadPolymarketSnapshot(",
];

const requiredWrapperSnippets = [
  "<meta name=\"description\"",
  "<link rel=\"canonical\"",
  "<meta http-equiv=\"refresh\"",
  "/polymarket-us-politics/state-of-us-politics.html?focus=",
];

const IRAN_PROJECTILE_BASELINE_MIN = {
  missiles_total_2026: 810,
  drones_total_2026: 1245,
};

function fail(message) {
  console.error(`VALIDATION ERROR: ${message}`);
  process.exit(1);
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }
}

function parseCliArgs(argv) {
  const out = {};
  for (const arg of argv.slice(2)) {
    if (!arg.startsWith("--")) continue;
    const [key, value] = arg.slice(2).split("=");
    out[key] = value == null ? true : value;
  }
  return out;
}

function parseTimestamp(value) {
  const ts = Date.parse(String(value || ""));
  return Number.isFinite(ts) ? ts : NaN;
}

function validatePages() {
  for (const page of pages) {
    const pagePath = path.join(baseDir, page);
    assertFileExists(pagePath);
    const html = fs.readFileSync(pagePath, "utf8");

    const requiredSnippets = page === centralPage
      ? requiredPredictionPageSnippets
      : page === conflictPage
        ? requiredConflictPageSnippets
        : requiredWrapperSnippets;

    for (const snippet of requiredSnippets) {
      if (!html.includes(snippet)) {
        fail(`${page} is missing required snippet: ${snippet}`);
      }
    }

    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    if (!headMatch) {
      fail(`${page} is missing a <head> block`);
    }
    const headTitleCount = (headMatch[0].match(/<title>/g) || []).length;
    if (headTitleCount !== 1) {
      fail(`${page} must contain exactly one <title> tag inside <head> (found ${headTitleCount})`);
    }
  }
}

function validateConflictFeed() {
  const feedPath = path.join(baseDir, "data", "iran-war-metrics.json");
  assertFileExists(feedPath);
  const raw = fs.readFileSync(feedPath, "utf8");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Invalid JSON in ${feedPath}: ${error.message}`);
  }

  if (!parsed || typeof parsed !== "object") {
    fail(`${feedPath} must be a JSON object`);
  }
  if (!Array.isArray(parsed.conflicts) || parsed.conflicts.length === 0) {
    fail(`${feedPath} must include a non-empty conflicts array`);
  }

  const active = parsed.conflicts.find(c => c.id === parsed.active_conflict_id) || parsed.conflicts[0];
  if (!active) {
    fail(`${feedPath} has no active conflict entry`);
  }

  const requiredConflictFields = [
    "id",
    "title",
    "subtitle",
    "metrics",
    "map_points",
    "timeline",
    "source_name",
    "secondary_source_name",
  ];
  for (const field of requiredConflictFields) {
    if (!(field in active)) {
      fail(`${feedPath} conflict ${active.id || "<unknown>"} missing field: ${field}`);
    }
  }

  if (!Array.isArray(active.metrics) || active.metrics.length === 0) {
    fail(`${feedPath} conflict ${active.id} must contain at least one metric`);
  }
  if (!Array.isArray(active.map_points) || active.map_points.length === 0) {
    fail(`${feedPath} conflict ${active.id} must contain at least one map point`);
  }
  if (!Array.isArray(active.timeline) || active.timeline.length === 0) {
    fail(`${feedPath} conflict ${active.id} must contain at least one timeline entry`);
  }

  if (active.id === "iran_2026") {
    const metricsById = new Map(
      (Array.isArray(active.metrics) ? active.metrics : []).map(metric => [String(metric?.id || ""), metric])
    );

    for (const [metricId, minimum] of Object.entries(IRAN_PROJECTILE_BASELINE_MIN)) {
      const metric = metricsById.get(metricId);
      if (!metric) {
        fail(`${feedPath} conflict iran_2026 missing required projectile metric: ${metricId}`);
      }
      const value = Number(metric?.value);
      if (!Number.isFinite(value) || value < minimum) {
        fail(`${feedPath} conflict iran_2026 metric ${metricId} is below baseline (${value} < ${minimum})`);
      }
      const scope = String(metric?.scope || "").toLowerCase();
      if (!scope.includes("cumulative")) {
        fail(`${feedPath} conflict iran_2026 metric ${metricId} scope must declare cumulative semantics`);
      }
    }
  }

  return parsed;
}

function validateConflictNewsFeed() {
  const feedPath = path.join(baseDir, "data", "conflict-news.json");
  assertFileExists(feedPath);
  const raw = fs.readFileSync(feedPath, "utf8");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Invalid JSON in ${feedPath}: ${error.message}`);
  }

  if (!parsed || typeof parsed !== "object") {
    fail(`${feedPath} must be a JSON object`);
  }
  if (!parsed.conflicts || typeof parsed.conflicts !== "object") {
    fail(`${feedPath} must include conflicts object`);
  }

  for (const id of ["iran_2026", "ukraine_2026"]) {
    if (!Array.isArray(parsed.conflicts[id])) {
      fail(`${feedPath} conflicts.${id} must be an array`);
    }
  }

  return parsed;
}


function validateSocialTrackerMetrics() {
  const metricsPath = path.join(baseDir, "data", "social-tracker-metrics.json");
  assertFileExists(metricsPath);
  const raw = fs.readFileSync(metricsPath, "utf8");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Invalid JSON in ${metricsPath}: ${error.message}`);
  }

  if (!parsed || typeof parsed !== "object") {
    fail(`${metricsPath} must be a JSON object`);
  }
  if (!parsed.updated_at_utc) {
    fail(`${metricsPath} must include updated_at_utc`);
  }
  if (!Array.isArray(parsed.metrics) || parsed.metrics.length < 3) {
    fail(`${metricsPath} must include at least three social metrics`);
  }

  for (const metric of parsed.metrics) {
    if (!metric?.id || !metric?.label) {
      fail(`${metricsPath} metrics entries must include id and label`);
    }
    if (!Number.isFinite(Number(metric?.value))) {
      fail(`${metricsPath} metric ${metric.id} has invalid numeric value`);
    }
  }

  return parsed;
}

function validatePolymarketSnapshot() {
  const snapshotPath = path.join(baseDir, "data", "polymarket-market-snapshot.json");
  assertFileExists(snapshotPath);
  const raw = fs.readFileSync(snapshotPath, "utf8");

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Invalid JSON in ${snapshotPath}: ${error.message}`);
  }

  if (!parsed || typeof parsed !== "object") {
    fail(`${snapshotPath} must be a JSON object`);
  }

  if (!Array.isArray(parsed.markets) || parsed.markets.length === 0) {
    fail(`${snapshotPath} must include a non-empty markets array`);
  }

  if (!parsed.updated_at_utc) {
    fail(`${snapshotPath} must include updated_at_utc`);
  }

  const first = parsed.markets[0];
  for (const key of ["id", "question", "outcomes", "outcomePrices"]) {
    if (!(key in first)) {
      fail(`${snapshotPath} first market missing field: ${key}`);
    }
  }

  return parsed;
}

function validateFreshness(conflictFeed, newsFeed, snapshotFeed, maxAgeMinutes) {
  const maxAgeMs = Math.max(1, Number(maxAgeMinutes) || 150) * 60 * 1000;
  const now = Date.now();

  const checks = [];
  checks.push({ label: "polymarket snapshot", value: snapshotFeed?.updated_at_utc });
  checks.push({ label: "conflict feed", value: conflictFeed?.updated_at_utc });
  checks.push({ label: "conflict news", value: newsFeed?.updated_at_utc });

  const conflicts = Array.isArray(conflictFeed?.conflicts) ? conflictFeed.conflicts : [];
  conflicts.forEach(conflict => {
    checks.push({
      label: `conflict ${conflict.id || "unknown"}`,
      value: conflict?.as_of_utc || conflict?.updated_at_utc || conflictFeed?.updated_at_utc,
    });
  });

  for (const item of checks) {
    if (!item.value) {
      fail(`Freshness check failed: ${item.label} has no timestamp`);
    }
    const ts = parseTimestamp(item.value);
    if (!Number.isFinite(ts)) {
      fail(`Freshness check failed: ${item.label} timestamp invalid (${item.value})`);
    }
    const ageMs = now - ts;
    if (ageMs > maxAgeMs) {
      const ageMin = Math.round(ageMs / 60000);
      fail(`Freshness check failed: ${item.label} is stale (${ageMin} min old, threshold ${Math.round(maxAgeMs / 60000)} min)`);
    }
  }
}

const args = parseCliArgs(process.argv);
const checkStale = Boolean(args["check-stale"]);
const maxAgeMinutes = Number(args["max-age-minutes"] || 150);

validatePages();
const conflictFeed = validateConflictFeed();
const newsFeed = validateConflictNewsFeed();
const snapshotFeed = validatePolymarketSnapshot();
validateSocialTrackerMetrics();

if (checkStale) {
  validateFreshness(conflictFeed, newsFeed, snapshotFeed, maxAgeMinutes);
}

console.log("Polymarket site validation passed.");
