#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

TARGET="both"
for arg in "$@"; do
  case "$arg" in
    --target=*) TARGET="${arg#*=}" ;;
    --target) shift; TARGET="${1:-both}" ;;
  esac
done

install_to() {
  local dest="$1"
  mkdir -p "$(dirname "$dest")"
  rm -rf "$dest"
  cp -R "$SKILL_DIR" "$dest"
  echo "installed: $dest"
}

generate_config() {
  local dest_skill_dir="$1"
  node "$dest_skill_dir/scripts/generate-config.js" "$dest_skill_dir"
}

case "$TARGET" in
  project)
    generate_config "$SKILL_DIR"
    ;;
  personal)
    DEST="$HOME/.cursor/skills/frontend-council"
    install_to "$DEST"
    generate_config "$DEST"
    ;;
  both)
    generate_config "$SKILL_DIR"
    install_to "$HOME/.cursor/skills/frontend-council"
    generate_config "$HOME/.cursor/skills/frontend-council"
    ;;
  *)
    echo "unknown --target: $TARGET (use project|personal|both)" >&2
    exit 1
    ;;
esac
