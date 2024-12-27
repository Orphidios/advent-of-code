#!/bin/bash

# Compile the TypeScript files
source "$(dirname "$0")/compile-challenge.sh" "$@"

# Launch tsc in watch mode and nodemon to monitor changes
echo "Launching tsc in watch mode and nodemon..."
npx tsc --watch &
npx nodemon "$COMPILED_FILE"