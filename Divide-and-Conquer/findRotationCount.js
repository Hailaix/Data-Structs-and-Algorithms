/**
 * Write a function called findRotationCount
 * which accepts an array of distinct numbers sorted in increasing order.
 * The array has been rotated counter-clockwise n number of times.
 * Given such an array, find the value of n.
 * Constraints: Time Complexity: O(log N)
 */
//in essence, we want the index of the lowest value in the array
const findRotationCount = (arr) => {
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