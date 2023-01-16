/**
 * Write a function called findRotatedIndex 
 * which accepts a rotated array of sorted numbers and an integer. 
 * The function should return the index of num in the array.
 * If the value is not found, return -1.
 * Constraints: Time Complexity: O(log N)
 */

//finds the first, and only value whose predecessor is larger than it,
//so we can split the arr into two sorted sections
const findLowest = (arr) => {
    let left = 0; //lower bound
    let right = arr.length - 1; //upper bound
    if (arr[left] < arr[right] || arr.length === 1) {
        return 0; //short circuit if the array is not rotated
    }
    while (left <= right) {
        const mid = Math.floor((left + right) / 2); //midpoint
        if (arr[mid] < arr[mid - 1]) {
            return mid; //if the midpoint is lower than its predecessor, we found it
        } else if (arr[mid] > arr[right]) {
            left = mid + 1; //if the midpoint is higher than the right bound, we need to look more right
        } else {
            right = mid - 1; //otherwise we need to look more left
        }
    }
}

//binary search with variable left and right bounds so we can search just a section of the array
const binarySearch = (arr, val, left = 0, right = arr.length - 1) => {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === val) {
            return mid;
        } else if (arr[mid] < val) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

const findRotatedIndex = (arr, val) => {
    const lowest = findLowest(arr); //find the index of the lowest value
    if (arr[lowest] === val) {
        return lowest; //if the value is the lowest number, we already found it
    } else if (lowest > 0 && val >= arr[0] && val <= arr[lowest - 1]) {
        //if the value is in the first section, check the first section
        return binarySearch(arr, val, 0, lowest - 1);
    } else {
        //otherwise check the second section
        return binarySearch(arr, val, lowest, arr.length - 1);
    }
}