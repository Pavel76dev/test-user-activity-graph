import { IUser, IResult } from '../interfaces';
import millisecondsToDays from './millisecondsToDays';
import calculateGraph from './calculateGraph';

const calculate = (users: IUser[], days: number) => {
    let usersNumerator: number = 0;
    let usersdenominator: number = 0;
    let result: IResult = {
        rollingRetention: 0,
        barGraphData: []
    };
    let usersActivity: number[] = [];
    users.forEach(element => {
        let timeDiff = element.dateLastActivity.getTime() - element.dateRegistration.getTime();
        let diffDays = millisecondsToDays(timeDiff);
        usersActivity.push(diffDays);
        if (diffDays >= days - 1) {
            usersNumerator++;
        }
        let timeDiffReal = new Date().getTime() - element.dateRegistration.getTime();
        let diffDaysReal = millisecondsToDays(timeDiffReal);
        if (diffDaysReal >= days - 1) {
            usersdenominator++;
        }
    });
    result.barGraphData = calculateGraph(usersActivity);
    result.rollingRetention = (usersNumerator !== 0 && usersdenominator !== 0)
        ?
        Math.trunc(usersNumerator / usersdenominator * 10000) / 100
        : 0;

    return result;
}

export default calculate;