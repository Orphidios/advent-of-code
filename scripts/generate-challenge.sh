#!/bin/bash

# Check if a day number is provided
if [ -z "$1" ]; then
  echo "Please provide a day number."
  exit 1
fi

DAY_NUMBER=$1
FILE_NAME="day${DAY_NUMBER}.challenge.ts"
FILE_PATH="./src/challenges/${FILE_NAME}"

# Create the file with the template content
cat <<EOL > $FILE_PATH
import { Challenge } from '../common/challenge.class.js';

type Day${DAY_NUMBER}Input = unknown; // TODO - Define the input type

export class Day${DAY_NUMBER}Challenge extends Challenge<Day${DAY_NUMBER}Input> {
  DAY = ${DAY_NUMBER};

  protected runWithInput(input: Day${DAY_NUMBER}Input): void {
    console.log({ input });
    // TODO - Implement the logic here
  }

  protected parseInput(input: string): Day${DAY_NUMBER}Input {
    console.log('Raw input file for day ${DAY_NUMBER}', input);
    // TODO - Parse the input string and return the input object
    return {} as Day${DAY_NUMBER}Input;
  }
}

new Day${DAY_NUMBER}Challenge().run({ logging: true });
EOL

echo "Challenge file for Day ${DAY_NUMBER} created successfully at ${FILE_PATH}"