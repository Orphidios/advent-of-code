#!/bin/bash

# Check if a day number is provided
if [ -z "$1" ]; then
  echo "Please provide a day number."
  exit 1
fi

DAY=$(printf "%02d" $1)
CHALLENGE_FILE="src/challenges/day$DAY.challenge.ts"
COMPILED_FILE="dist/challenges/day$DAY.challenge.js"

# Generate the challenge file if it does not exist
if [[ ! -f "$CHALLENGE_FILE" ]]; then
  echo "The file $CHALLENGE_FILE does not exist. Generating it..."
  ./scripts/generate-challenge.sh $1
fi

# Compile the TypeScript files
echo "Compiling TypeScript files..."
npm run build

# Check if the compiled JavaScript file exists
if [[ ! -f "$COMPILED_FILE" ]]; then
  echo "Error: The file $COMPILED_FILE does not exist. Make sure the compilation was successful."
  exit 1
fi
