/**
 * Write a function that is passed two linked lists, a and b, both of which are already sorted.
 * It should return a new linked list, in sorted order
 */
const LinkedList = require("./linked-list");
const mergeSortedLists = (a, b) => {
    const c = new LinkedList(); //the linked list we are merging into
    let currentA = a.head;
    let currentB = b.head;
    while (currentA || currentB) { //run until both lists are exhausted
        if (!currentA) { //if list a is exhausted, keep adding from b
            c.push(currentB.val);
            currentB = currentB.next;
        } else if (!currentB) { //same for if list b is exhausted
            c.push(currentA.val);
            currentA = currentA.next;
        } else if (currentA.val <= currentB.val) { //otherwise, add the lesser value of either a or b
            c.push(currentA.val);
            currentA = currentA.next;
        } else {
            c.push(currentB.val);
            currentB = currentB.next;
        }
    }
    return c;
}

module.exports = mergeSortedLists;
