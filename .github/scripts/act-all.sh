#!/usr/bin/env bash
set -euo pipefail


echo "==> Fast Checks (pull_request)"
act pull_request -W .github/workflows/fast-checks.yml

echo "==> PR CI (pull_request)"
act pull_request -W .github/workflows/pr-ci.yml

echo "==> Pre-release QA (pull_request)"
act pull_request -W .github/workflows/pre-release-qa.yml

echo "==> Pre-release QA (RC tag push simulation)"
act push -W .github/workflows/pre-release-qa.yml \
  -e .github/workflows/_fixtures/rc-tag.json

echo "All workflows completed."
