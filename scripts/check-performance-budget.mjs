#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const TARGET = 'docs/public/polymarket-us-politics/state-of-us-politics.html';
const RAW_BUDGET_BYTES = 320 * 1024;
const GZIP_BUDGET_BYTES = 90 * 1024;
const INLINE_SCRIPT_BUDGET_BYTES = 180 * 1024;

const html = readFileSync(TARGET, 'utf8');
const rawBytes = Buffer.byteLength(html, 'utf8');
const gzipBytes = gzipSync(html).length;

const inlineScripts = Array.from(html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi));
const inlineScriptBytes = inlineScripts.reduce((sum, match) => sum + Buffer.byteLength(match[1] || '', 'utf8'), 0);

const failures = [];
if (rawBytes > RAW_BUDGET_BYTES) failures.push(`HTML raw size ${rawBytes} > ${RAW_BUDGET_BYTES} bytes`);
if (gzipBytes > GZIP_BUDGET_BYTES) failures.push(`HTML gzip size ${gzipBytes} > ${GZIP_BUDGET_BYTES} bytes`);
if (inlineScriptBytes > INLINE_SCRIPT_BUDGET_BYTES) failures.push(`Inline script size ${inlineScriptBytes} > ${INLINE_SCRIPT_BUDGET_BYTES} bytes`);

console.log('[perf-budget] target:', TARGET);
console.log('[perf-budget] raw bytes:', rawBytes);
console.log('[perf-budget] gzip bytes:', gzipBytes);
console.log('[perf-budget] inline script bytes:', inlineScriptBytes);

if (failures.length > 0) {
  console.error('[perf-budget] FAILED');
  failures.forEach(item => console.error(' -', item));
  process.exit(1);
}

console.log('[perf-budget] OK');
