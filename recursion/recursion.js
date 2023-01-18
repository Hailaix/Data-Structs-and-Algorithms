/** product: calculate the product of an array of numbers. */

function product(nums) {
  const productRecurse = (nums, i = 0) => {
    if (i === nums.length - 1) {
      return nums[i];
    } else {
      return nums[i] * productRecurse(nums, i + 1);
    }
  }
  return productRecurse(nums);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  const longestRecurse = (words, i = 0, length = 0) => {
    if (i === words.length) {
      return length;
    } else {
      if (words[i].length > length) {
        length = words[i].length;
      }
      return longestRecurse(words, i + 1, length)
    }
  }
  return longestRecurse(words);
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let retstr = "";
  const everyOtherRecuse = (str, i = 0) => {
    if (i === str.length) return;
    if (i % 2 === 0) {
      retstr += str[i];
    }
    everyOtherRecuse(str, i + 1);
  }
  everyOtherRecuse(str);
  return retstr;
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  const isPalindromeRecurse = (str, i = 0) => {
    if (i === Math.floor(str.length / 2)) { //we only need to recurse through half of the string
      return str[i] === str[str.length - 1 - i];
    } else {
      return str[i] === str[str.length - 1 - i] && isPalindromeRecurse(str, i + 1);
    }
  }
  return isPalindromeRecurse(str);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  const findIndexRecurse = (arr, val, i = 0) => {
    //two base cases needed
    if (arr[i] === val) return i;
    if (i === arr.length) return -1;
    return findIndexRecurse(arr, val, i + 1);
  }
  return findIndexRecurse(arr, val);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  const revStringRecurse = (str, i = 0) => {
    if (i === str.length - 1) return str[i];
    return revStringRecurse(str, i + 1) + str[i];
  }
  return revStringRecurse(str);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  const out = [];
  const gatherStringsRecurse = (arr, i = 0) => {
    if (i === arr.length) return;
    if (typeof arr[i] === 'string') { //if it is a string, we want it
      out.push(arr[i])
    } else if (typeof arr[i] === 'object') { //if it is an object, we might want what is in it
      gatherStringsRecurse(Object.values(arr[i]));
    }
    gatherStringsRecurse(arr, i + 1);
  }
  gatherStringsRecurse(Object.values(obj));
  return out;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {
  const binarySearchRecurse = (arr, val, left = 0, right = arr.length - 1) => {
    if(left > right) return -1;
    const mid = Math.floor((left + right) / 2);
    if( val === arr[mid]) return mid;
    if( val > arr[mid]) {
      return binarySearchRecurse(arr, val, mid + 1, right);
    } else {
      return binarySearchRecurse(arr, val, left, mid -1);
    }
  }
  return binarySearchRecurse(arr, val);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
