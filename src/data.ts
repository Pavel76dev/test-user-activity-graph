import { IUser } from './interfaces';

const data: IUser[] =[
    {
        id: 1,
        dateRegistration: new Date("2022-03-01T15:42:05.000Z"),
        dateLastActivity: new Date("2022-03-07T15:42:05.000Z")
    },
    {
        id: 2,
        dateRegistration: new Date("2022-03-01T15:42:46.000Z"),
        dateLastActivity: new Date("2022-03-04T15:42:46.000Z")
    },
    {
        id: 3,
        dateRegistration: new Date("2022-03-01T15:43:30.000Z"),
        dateLastActivity: new Date("2022-03-08T15:43:30.000Z")
    },
    {
        id: 4,
        dateRegistration: new Date("2022-03-01T21:00:00.000Z"),
        dateLastActivity: new Date("2022-03-02T21:00:00.000Z")
    }
]

export default data;