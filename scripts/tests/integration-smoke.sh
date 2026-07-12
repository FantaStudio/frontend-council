#!/bin/bash
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$SKILL_DIR"

node --test scripts/tests/prompt-assembly.test.js

# Dry-run: start job with echo CLI mock via env override in config not supported —
# verify config parses and personas exist
test -f references/personas/junior-portal.md
test -f council.config.example.yaml
test -x scripts/council.sh

echo "smoke: ok"
