/**
 * Given an array of 1s and 0s which has all 1s first followed by all 0s, 
 * write a function called countZeroes, which returns the number of zeroes in the array.
 *   Constraints:
 *   Time Complexity: O(log N)
 */
const countZeroes = arr => {
    let left = 0; // lower bound
    let right = arr.length - 1; //upper bound
    while (left <= right) {
        const mid = Math.floor((left + right) / 2); //mid point between current upper/lower bounds
        if (arr[mid] === 0) { //if the mid point is 0, we check if it is the first 0
            if (arr[mid - 1] === 1 || mid === 0) {
                //if it is the first 0, we calculate how many 0s there are
                return arr.length - mid;
            }
            else { //otherwise we lower the upper bound
                right = mid - 1;
            }
        }
        else { //if the midpoint is a 1, we raise the lower bound
            left = mid + 1;
        }
    }
    return 0;
}
