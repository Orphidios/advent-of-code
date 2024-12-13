import { InputFileHelper } from "../../helpers/input-file-helper.js";

class Day1Challenges {
    public static run(): void {
        const { leftList, rightList } = InputFileHelper.getDay1InputData();
        console.log('PART 1 : distanceBetweenList', Day1Challenges.distanceBetweenList(leftList, rightList));
        console.log('PART 2 : similarityBetweenList', Day1Challenges.similarityBetweenList(leftList, rightList));
    }

    public static distanceBetweenList(ListA: number[], ListB: number[]): number {
        const sortedLeftList = ListA.sort();
        const sortedRightList = ListB.sort();        
        return sortedLeftList.reduce((acc, current, index) => acc + Math.abs(sortedLeftList[index] - sortedRightList[index]), 0);
    }
    
    public static similarityBetweenList(leftList: number[], rightList: number[]): number {
        const referenceList = Day1Challenges.countUnique(rightList);
        return leftList.reduce((acc, value) => acc + (referenceList[value] ? value * referenceList[value] : 0), 0);
    }


    public static countUnique(arrayToCount: number[]): { [key: number]: number } {
        return arrayToCount.reduce((acc: { [key: number]: number }, element: number): { [key: number]: number } => {
            const previousValue = acc[element] ? acc[element] : 0;
            return {
                ...acc,
                [element]: previousValue + 1,
            }
            }, {});
    }
}

Day1Challenges.run();