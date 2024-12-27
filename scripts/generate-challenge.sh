#!/bin/bash

# Check if a day number is provided
if [ -z "$1" ]; then
  echo "Please provide a day number."
  exit 1
fi

DAY=$1
FILE_NAME="day$(printf "%02d" $1).challenge.ts"
FILE_PATH="./src/challenges/${FILE_NAME}"

# Create the file with the template content
cat <<EOL > $FILE_PATH
import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day${DAY}Input = unknown; // TODO - Define the input type

export class Day${DAY}Challenge extends Challenge<Day${DAY}Input> {
  DAY = ${DAY};

  protected runWithInput(input: Day${DAY}Input): ChallengeSolution {
    console.log({ input });
    // TODO - Implement the logic here
    return { part1: ['TODO', 0], part2: ['TODO', 0] };
  }

  protected parseInput(input: string): Day${DAY}Input {
    console.log('Raw input file for day ${DAY}', input);
    // TODO - Parse the input string and return the input object
    return {} as Day${DAY}Input;
  }
}

new Day${DAY}Challenge().run({ logging: true });
EOL

echo "Challenge file for Day ${DAY} created successfully at ${FILE_PATH}"