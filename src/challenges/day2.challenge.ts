import { Challenge } from "../common/challenge.class.js";

type Day2Input = number[][];
enum ReportLevel {
    INCREASING = 'increasing',
    DECREASING = 'decreasing'
}

export class Day2Challenge extends Challenge<Day2Input> {
    DAY = 2;

    protected runWithInput(reports: Day2Input): void {
        console.log('PART 1 : validReports', this.countValidReports(reports));
        console.log('PART 2 : validReportsWithDampener', this.countValidReports(reports, true));
    }

    protected parseInput(input: string): Day2Input {
        return input.split('\n').filter((line) => line != '').map((line) => {
            return line.split(' ').map(Number);
        });
    }

    protected countValidReports(reports: Day2Input, withDampener: boolean = false): number {
        if (withDampener) {
            return reports.filter((report) => this.isReportValidWithDampener(report)).length;
        }
        return reports.filter((report) => this.analyseReport(report).isValid).length;
    }

    protected getDirection(first: number, second: number): ReportLevel {
        return first - second > 0 ? ReportLevel.DECREASING : ReportLevel.INCREASING;
    }

    protected isReportValidWithDampener(report: number[]): boolean {
        const { isValid, indexToRemove } = this.analyseReport(report);
        if (isValid) {
            return true;
        }

        for (let i = 0; i < indexToRemove.length; i++) {
            const dampenedReport = report.toSpliced(indexToRemove[i], 1);
            if (this.analyseReport(dampenedReport).isValid) {
                return true;
            }
        }

        return false;
    }

    protected analyseReport(report: number[]): { isValid: boolean, indexToRemove: number[] } {
        if (report.length < 2) {
            return { isValid: true, indexToRemove: [] };
        }
        const baseDirection: ReportLevel = this.getDirection(report[0], report[1]);
        for(let i = 0; i < report.length - 1; i++) {
            const isSameDirection = this.getDirection(report[i], report[i + 1]) === baseDirection;
            const isCloseEnough = this.levelsAreCloseEnough(report[i], report[i + 1]);


            if (!isSameDirection) {
                return { isValid: false, indexToRemove: [i-1, i, i + 1] };
            }

            if (!isCloseEnough) {
                return { isValid: false, indexToRemove: [i, i + 1] };
            }
        }
        return { isValid: true, indexToRemove: [] };
    }

    protected levelsAreCloseEnough(first: number, second: number): boolean {
        const difference = Math.abs(first - second);
        return difference >= 1 && difference <= 3;
    }
}

new Day2Challenge().run();
