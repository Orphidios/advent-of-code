#!/bin/bash

# Compile the TypeScript files
source "$(dirname "$0")/compile-challenge.sh" "$@"

# Run the compiled script
echo "Running the script for day $DAY..."
node "$COMPILED_FILE"