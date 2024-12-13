import * as fs from 'fs';
import * as path from 'path';

export class InputFileHelper {
    public static readDayInputFile(day: number): string {
        const __dirname = import.meta.dirname;
        const filePath = path.join(__dirname, '..', 'challenges', `day${day}`, `day${day}.input.txt`);
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