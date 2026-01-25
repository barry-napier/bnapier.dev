#!/usr/bin/env bash
set -e

echo "Setting up bnapier.dev development environment..."

# Check Node version
required_node="20"
current_node=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$current_node" -lt "$required_node" ]; then
  echo "Error: Node.js $required_node+ required (found v$current_node)"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Setup git hooks
echo "Setting up git hooks..."
npm run prepare

# Verify setup
echo "Verifying setup..."
npm run check
npm test

echo "Setup complete! Run 'npm run dev' to start."
