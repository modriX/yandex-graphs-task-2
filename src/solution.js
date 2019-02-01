const solution = (graph, start, finish) => {
    const work = Object.assign(graph);
    const findMin = (work) => {
        const firstElArr = [];
        for(let key in work) {
            firstElArr.push(work[key].passed ? 1 : 0);
        }
        const firstEl = firstElArr.indexOf(0);
        if (firstEl === -1) {
            return null;
        } else {
            let result = Object.keys(work)[firstEl];
            for(let key in work) {
                if (work[key].length < work[result].length && !work[key].passed) {
                    result = key;
                }
            }
            work[result].passed = true;
            return result;
        }
    };
    for(let key in work) {
        work[key].length = 1000;
        work[key].passed = false;
    }
    work[start].length = 0;
    while (true) {
        let min = findMin(work);
        if (min === null) break;
        for (let key in work[min]) {
            if (!['length', 'passed', 'prew'].includes(key)) {
                if (work[key].length > work[min].length + work[min][key]) {
                    work[key].length = work[min].length + work[min][key];
                    work[key].prew = min;
                }
            }
        }
    }
    const result = {
        distance: work[finish].length,
        path: [finish]
    };
    let actual = finish;
    while (actual !== start) {
        actual = work[actual].prew;
        result.path.push(actual);
    }
    result.path = result.path.reverse();
    return result;
}
