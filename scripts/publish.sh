#!/bin/bash

# Publishing script for react-dependency-injection

set -e

echo "🚀 Starting publishing process..."

# Check if we're on main branch
if [[ $(git branch --show-current) != "main" ]]; then
  echo "❌ Error: You must be on the main branch to publish"
  exit 1
fi

# Check if there are uncommitted changes
if [[ -n $(git status --porcelain) ]]; then
  echo "❌ Error: You have uncommitted changes. Please commit or stash them first."
  exit 1
fi

# Check if user is logged in to npm
if ! npm whoami; then
  echo "❌ Error: You must be logged in to npm. Run 'npm login' first."
  exit 1
fi

# Clean and build
echo "📦 Cleaning and building..."
npm run clean
npm run build

# Run tests
echo "🧪 Running tests..."
npm test

# Check if build was successful
if [ ! -d "dist" ]; then
  echo "❌ Error: Build failed. dist directory not found."
  exit 1
fi

# Check package size
echo "📊 Checking package size..."
npm pack --dry-run

# Ask for confirmation
read -p "🤔 Are you sure you want to publish? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Publishing cancelled."
  exit 1
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish

# Get the published version
VERSION=$(node -p "require('./package.json').version")

echo "✅ Successfully published version $VERSION to npm!"
echo "🔗 Package: https://www.npmjs.com/package/react-dependency-injection"

# Create git tag
echo "🏷️  Creating git tag..."
git tag "v$VERSION"
git push origin "v$VERSION"

echo "🎉 Publishing complete!"
