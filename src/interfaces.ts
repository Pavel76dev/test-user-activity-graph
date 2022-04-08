export interface IUser {
  id: number;
  dateRegistration: Date;
  dateLastActivity: Date;
}

export interface IResult {
  rollingRetention: number;
  barGraphData: object[];
}
