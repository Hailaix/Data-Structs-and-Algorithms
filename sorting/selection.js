function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minidx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minidx]) {
                minidx = j;
            }
        }
        if (minidx !== i) {
            const temp = arr[minidx];
            arr[minidx] = arr[i];
            arr[i] = temp;
        }
    }
    return arr;
}

module.exports = selectionSort;