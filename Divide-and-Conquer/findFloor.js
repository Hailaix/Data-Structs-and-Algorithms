/**
 * Write a function called findFloor which accepts a sorted array and a value x,
 * and returns the floor of x in the array.
 * The floor of x in an array is the largest element in the array which is smaller than or equal to x.
 * If the floor does not exist, return -1.
 * Constraints: Time Complexity: O(log N)
 */

const findFloor = (arr, x) => {
    if (x < arr[0]) {
        //if x is less than the smallest element in the array, the floor does not exist
        return -1;
    }
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === x || (arr[mid] < x && arr[mid + 1] > x)) {
            //if the midpoint is equal to x,
            //or less than x and the next index is greater than x, we have found the floor
            return arr[mid];
        } else if (arr[mid] < x) { //otherwise move the bounds in the correct direction
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    //should we get here, that means x is larger than every element in the array
    //so the floor will be the largest element.
    return arr[arr.length - 1];
}