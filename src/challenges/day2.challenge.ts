import { Challenge } from "../common/challenge.class.js";

type Day2Input = {
    // Define the input structure here
}

class Day2Challenge extends Challenge<Day2Input> {
    DAY = 2;

    protected runWithInput(input: Day2Input): void {
        // Implement the logic here
    }

    protected parseInput(input: string): Day2Input {
        // Parse the input string and return the input object
        return {} as Day2Input;
    }
}

export { Day2Challenge };
