/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

function pivot(arr, start = 0, end = arr.length - 1) {
    //swaps the positions of two elements
    const swap = (i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    const piv = arr[start];
    let i = start;
    for (let j = i + 1; j <= end; j++) {
        if (arr[j] < piv) {
            //if the current value is less than the pivot, put it at the front portion of the array, after pivot
            i++;
            swap(i, j);
        }
    }
    //swap the pivot and the last item that was swapped, so that it is at the end of the elements that were swapped
    swap(start, i);
    return i;
}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        //pivot the recieved array into a left and right half
        //this puts the pivot into its sorted location
        const split = (pivot(arr, left, right));
        //then sort to the left and right of the pivot
        quickSort(arr, left, split - 1);
        quickSort(arr, split + 1, right);
    }
    return arr;
}

module.exports = { pivot, quickSort };