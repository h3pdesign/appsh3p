import fs from "node:fs";
import path from "node:path";

const baseDir = path.join("docs", "public", "polymarket-us-politics");

const pages = [
  "state-of-us-politics.html",
  "foreign-policy.html",
  "2028-race.html",
  "trump.html",
  "fed-economy.html",
  "midterms.html",
  "congress.html",
  "legal.html",
  "social-media.html",
];

const requiredPageSnippets = [
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

    for (const snippet of requiredPageSnippets) {
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

validatePages();
validateConflictFeed();
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
validateConflictNewsFeed();
console.log("Polymarket site validation passed.");
