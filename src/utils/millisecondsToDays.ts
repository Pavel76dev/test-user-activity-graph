const millisecondsToDays = (milliseconds: number) => {
    return Math.ceil(milliseconds / (1000 * 3600 * 24));
}

export default millisecondsToDays;