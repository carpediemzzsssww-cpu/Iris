#!/bin/bash
# ================================================
# publish-content.sh
# One command: rebuild all content JSON (learning + showcase), commit, push.
#
# Covers:
#   - content/learning/*.md      -> content/learning-data.json
#   - content/projects/*.md      -> content/projects-data.json
#   - content/ai-lab/*.md        -> content/ai-lab-data.json
#
# Daily workflow:
#   1. Edit or add .md files in content/{learning,projects,ai-lab}/
#   2. Run ./publish-content.sh            (or pass a commit message:
#      ./publish-content.sh "projects: add offerpath teardown")
#   3. Live on GitHub Pages in ~1-2 minutes
# ================================================

set -e

cd "$(dirname "$0")"

# 1. Rebuild all content JSON from markdown sources
node scripts/build-learning.js
node scripts/build-showcase.js

# 2. Stage only content-related paths (avoid unrelated commits)
git add \
    content/learning/        content/learning-data.json \
    content/projects/        content/projects-data.json \
    content/ai-lab/          content/ai-lab-data.json

# 3. Bail out early if nothing actually changed
if git diff --cached --quiet; then
    echo "No content changes to publish."
    exit 0
fi

# 4. Commit with a default message; override via ./publish-content.sh "your message"
MSG="${1:-content: update}"
git commit -m "$MSG"

# 5. Push to the current branch's upstream
git push

echo ""
echo "Published. Live on GitHub Pages in ~1-2 minutes."
