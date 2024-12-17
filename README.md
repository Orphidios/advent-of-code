# Advent of Code 2024

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)

## Description

[Advent of Code](https://adventofcode.com/) is an annual coding event that takes place in December. Each day, a new programming challenge is released, and participants work to solve these puzzles using the programming language of their choice. This repository contains solutions to the 2024 edition of Advent of Code, implemented in TypeScript.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Orphidios/advent-of-code.git
    cd advent-of-code
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Add your input when needed**:

Add your input file for each day in the `/inputs` folders in the form `day#.input.txt`.
You can retrieve the file content with the `InputFileHelper.readDayInputFile` function

Now you are ready to run and watch the solutions for the Advent of Code 2024 challenges.

## Project Structure

- `src/challenges/day#/index.ts`: Contains the TypeScript source code for each day.
- `scripts/`: Contains useful scripts to run and watch the challenges.
- `inputs`: Contains the input data for each day's challenge.

## Usage

To run the solution for a specific day, use the following command:

```bash
npm run start -- --day=1
```

To watch the solution for a specific day and automatically re-run it when changes are detected, use the following command:

```bash
npm run watch -- --day=1
```