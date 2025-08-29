#!/bin/bash

# Script to test React Native integration

set -e

echo "🧪 Testing React Native Integration..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Please run this script from the project root"
  exit 1
fi

# Build the library first
echo "📦 Building library..."
npm run build

# Check if React Native example exists
if [ ! -d "react-native-example" ]; then
  echo "❌ Error: React Native example not found"
  exit 1
fi

# Navigate to React Native example
cd react-native-example

# Install dependencies
echo "📥 Installing React Native dependencies..."
npm install

# Run tests
echo "🧪 Running React Native tests..."
npm test

echo "✅ React Native integration tests completed successfully!"
echo ""
echo "To run the React Native app:"
echo "1. cd react-native-example"
echo "2. npm run ios     # for iOS"
echo "3. npm run android # for Android"
