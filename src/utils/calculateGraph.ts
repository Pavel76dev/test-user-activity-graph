const calculateGraph = (data: number[]) => {
    let values: number[] = [];
    data.forEach(element => {
        if (!values.includes(element)) values.push(element);
    });
    const k = Math.ceil(1 + Math.log2(values.length));
    const w = Math.ceil((Math.max.apply(null, data) - Math.min.apply(null, data)) / k);

    let dataGraph: object[] = [];
    let i = Math.min.apply(null, data);
    let first = i;
    while (i < (Math.max.apply(null, data))) {
        const filtered = data.filter(n => n >= i && n < i + w);
        dataGraph.push({ column: filtered.length, bottom: `${first} - ${i + w}` });
        first = i + w + 1;
        i = i + w;
    }
    return dataGraph;
}

export default calculateGraph;