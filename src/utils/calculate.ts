import { IUser } from '../interfaces';
import millisecondsToDays from './millisecondsToDays';

const calculate = (users: IUser[], days: number) => {
    let usersNumerator: number = 0;
    let usersdenominator: number = 0;
    users.forEach(element => {
        let timeDiff = element.dateLastActivity.getTime() - element.dateRegistration.getTime();
        let diffDays = millisecondsToDays(timeDiff);
        if (diffDays >= days - 1) {
            usersNumerator++;
        }
        let timeDiffReal = new Date().getTime() - element.dateRegistration.getTime();
        let diffDaysReal = millisecondsToDays(timeDiffReal);
        if (diffDaysReal >= days - 1) {
            usersdenominator++;
        }
    });
    return Math.trunc(usersNumerator / usersdenominator * 10000)/100;
}

export default calculate;