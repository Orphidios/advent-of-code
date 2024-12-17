import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export class InputFileHelper {
    public static readDayInputFile(day: number): string {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, `../../inputs/day${day}.input.txt`);
        return fs.readFileSync(filePath, 'utf-8');
    }

    public static getDay1InputData(): { leftList: number[], rightList: number[] } {
        const inputData = InputFileHelper.readDayInputFile(1);
        return inputData.split('\n').filter((line) => line != '').reduce((acc: { leftList: number[], rightList: number[] }, line) => {
            const [left, right] = line.split('  ').map(Number);
            acc.leftList.push(left);
            acc.rightList.push(right);
            return acc;
        }, { leftList: [], rightList: [] });
    }
}