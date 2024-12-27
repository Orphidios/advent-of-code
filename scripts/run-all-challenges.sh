#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/.."

# Compile TypeScript files
tsc

# Execute all challenge files
for challenge in dist/challenges/*.challenge.js; do
  node "$challenge"
done
