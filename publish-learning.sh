#!/bin/bash
# ================================================
# publish-learning.sh
# One command: rebuild Learning Hub JSON, commit, push.
#
# Daily workflow:
#   1. Edit or add .md files in content/learning/
#   2. Run ./publish-learning.sh
#   3. Live on GitHub Pages in ~1-2 minutes
# ================================================

set -e

cd "$(dirname "$0")"

# 1. Rebuild content/learning-data.json from markdown sources
node scripts/build-learning.js

# 2. Stage only the learning-related paths (avoid accidental unrelated commits)
git add content/learning/ content/learning-data.json

# 3. Bail out early if nothing actually changed
if git diff --cached --quiet; then
    echo "No Learning Hub changes to publish."
    exit 0
fi

# 4. Commit with a default message; override via ./publish-learning.sh "your message"
MSG="${1:-learning: update content}"
git commit -m "$MSG"

# 5. Push to the current branch's upstream
git push

echo ""
echo "Published. Live on GitHub Pages in ~1-2 minutes."
