function insertionSort(arr) {
    //start with the second element in the array
    for (let i = 1; i < arr.length; i++) {
        //we store the current element
        const current = arr[i];
        //while the element at index j is greater than the value we stored, we shift that element over 1
        let j = i - 1;
        while (j >= 0 && current < arr[j]) {
            arr[j + 1] = arr[j];
            j--;
        }
        //finally we insert the stored element at the location that the loop ended.
        arr[j + 1] = current;
    }
    return arr;
}

module.exports = insertionSort;