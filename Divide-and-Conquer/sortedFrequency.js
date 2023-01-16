/**
 * Given a sorted array and a number, 
 * write a function called sortedFrequency that counts the occurrences of the number in the array
 *
 *  Constraints:
 *  Time Complexity: O(log N)
 */

//similar to how countZeroes works, we find the first time val comes up in the array
const findFirst = (arr, val) => {
    let left = 0; //lower bound
    let right = arr.length - 1; //upper bound
    while (left <= right) {
        const mid = Math.floor((left + right) / 2); //midpoint
        if (arr[mid] < val) { //if val is greater than the midpoint, raise the lower bound
            left = mid + 1;
        } else if (arr[mid] > val) { //if val is lower than the midpoint, lower the upper bound
            right = mid - 1;
        } else { //otherwise, we have found a val index
            if (arr[mid - 1] === val) { //if it is not the first index of val in the array, lower the upper bound and keep going
                right = mid - 1;
            } else {
                return mid; //otherwise we have the first index of val
            }
        }
    }
    return -1; //if we don't find it, return -1
}
//and similar to findFirst, we find the last time that val comes up in the array
const findLast = (arr, val) => {
    let left = 0; //lower bound
    let right = arr.length - 1; //upper bound
    while (left <= right) {
        const mid = Math.floor((left + right) / 2); //midpoint
        if (arr[mid] < val) { //if val is greater than the midpoint, raise the lower bound
            left = mid + 1;
        } else if (arr[mid] > val) { //if val is lower than the midpoint, lower the upper bound
            right = mid - 1;
        } else { //otherwise, we have found a val index
            if (arr[mid + 1] === val) { //if it is not the last index of val in the array, raise the lower bound and keep going
                left = mid + 1;
            } else {
                return mid; //otherwise we have the last index of val
            }
        }
    }
    return -1; //if we don't find it, return -1
}
const sortedFrequency = (arr, val) => {
    const first = findFirst(arr, val);
    const last = findLast(arr, val);
    if (first === -1) { //if it wasn't found, return 0
        return 0;
    } else {
        return (last - first) + 1; //otherwise it is the difference between the first and last + 1
    }
}