#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_DIR="$ROOT_DIR/tests/visual/baseline"
CUR_DIR="$ROOT_DIR/tests/visual/current"
DIFF_DIR="$ROOT_DIR/tests/visual/diff"

mkdir -p "$CUR_DIR" "$DIFF_DIR"

cleanup() {
  if [[ -n "${PREVIEW_PID:-}" ]]; then
    kill "$PREVIEW_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

npx -y playwright@1.50.1 install chromium
npm run docs:preview -- --host 127.0.0.1 --port 4173 >/tmp/docs-preview.log 2>&1 &
PREVIEW_PID=$!
sleep 4

npx -y playwright@1.50.1 screenshot --device="Desktop Chrome" "http://127.0.0.1:4173/" "$CUR_DIR/home.png"
npx -y playwright@1.50.1 screenshot --device="Desktop Chrome" "http://127.0.0.1:4173/apps/index" "$CUR_DIR/apps-index.png"

if [[ ! -f "$BASE_DIR/home.png" || ! -f "$BASE_DIR/apps-index.png" ]]; then
  echo "Visual baseline missing. Add baseline screenshots to:"
  echo "  $BASE_DIR/home.png"
  echo "  $BASE_DIR/apps-index.png"
  exit 0
fi

threshold=5000
failed=0

for name in home apps-index; do
  ae="$(magick compare -metric AE "$BASE_DIR/$name.png" "$CUR_DIR/$name.png" "$DIFF_DIR/$name.png" 2>&1 || true)"
  ae="${ae//$'\n'/}"
  if [[ -z "$ae" ]]; then
    echo "Unable to compute visual diff for $name"
    failed=1
    continue
  fi
  if [[ "$ae" =~ ^[0-9]+$ ]] && (( ae > threshold )); then
    echo "Visual regression detected for $name: AE=$ae > $threshold"
    failed=1
  else
    echo "Visual check ok for $name: AE=$ae"
  fi
done

if (( failed > 0 )); then
  exit 1
fi
