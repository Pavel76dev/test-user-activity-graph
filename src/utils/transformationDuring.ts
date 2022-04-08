import { IUser } from '../interfaces';
const transformationDuring = (id: number, user: IUser) => {
    return { id: (id), dateRegistration: user.dateRegistration.getTime(), dateLastActivity: user.dateLastActivity.getTime() };
}

export default transformationDuring;