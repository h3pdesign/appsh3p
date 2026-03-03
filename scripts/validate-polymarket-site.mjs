import fs from "node:fs";
import path from "node:path";

const baseDir = path.join("docs", "public", "polymarket-us-politics");

const centralPage = "state-of-us-politics.html";

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

const pages = [centralPage, ...wrapperPages];

const requiredCentralPageSnippets = [
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

function fail(message) {
  console.error(`VALIDATION ERROR: ${message}`);
  process.exit(1);
}

function assertFileExists(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required file: ${filePath}`);
  }
}

function validatePages() {
  for (const page of pages) {
    const pagePath = path.join(baseDir, page);
    assertFileExists(pagePath);
    const html = fs.readFileSync(pagePath, "utf8");

    const requiredSnippets = page === centralPage
      ? requiredCentralPageSnippets
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
}

validatePages();
validateConflictFeed();
validateConflictNewsFeed();
validatePolymarketSnapshot();
console.log("Polymarket site validation passed.");
