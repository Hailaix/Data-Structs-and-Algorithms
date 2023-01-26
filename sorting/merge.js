function merge(arr1, arr2) {
    const retarr = [];
    let i = 0;
    let j = 0;
    //compare the elements of the arrays and add the lesser to the return array
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            retarr.push(arr1[i]);
            i++;
        } else {
            retarr.push(arr2[j]);
            j++;
        }
    }
    //add the rest of arr1 if there is any left
    while (i < arr1.length) {
        retarr.push(arr1[i]);
        i++;
    }
    //add the rest of arr2 if there is any left
    while (j < arr2.length) {
        retarr.push(arr2[j]);
        j++;
    }
    return retarr;
}

function mergeSort(arr) {
    //if the array is only 1 element (or empty), it is sorted
    if (arr.length <= 1) return arr;
    //we split the array into two
    const mid = Math.floor(arr.length / 2);
    //we sort the left half of the array
    const leftarr = mergeSort(arr.slice(0, mid));
    //and the right half
    const rightarr = mergeSort(arr.slice(mid));
    //and finally we merge the two sorted halves
    return merge(leftarr, rightarr);
}

module.exports = { merge, mergeSort };