/**
 * reverses a linked-list in place.
 * linkedList is assumed to be a singly linked list from the exercise
 */
const reverseInPlace = linkedList => {
    let current = linkedList.head;
    let prev = null;
    let next = null;
    linkedList.tail = current; //premtively set the tail
    while (current) { //while we are not on the last node
        next = current.next; //store the current node's next value
        current.next = prev; //set the current node's next to be the previous node
        prev = current; //set the previous node to be the current node
        current = next; //and set the current node to be what was the next node
    }
    linkedList.head = prev; //finally set the head to be the previous node, as current will be null at the end of the loop
}

module.exports = reverseInPlace;
