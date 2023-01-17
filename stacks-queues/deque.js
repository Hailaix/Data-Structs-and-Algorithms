/** Node: a doubly linked node for a deque. */
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class Deque {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    //add to the beginning of the deque
    addFirst(val) {
        const newNode = new Node(val);
        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.next = this.first;
            this.first.prev = newNode;
            this.first = newNode;
        }
        this.size++;
    }

    //add to the end of the deque
    addLast(val) {
        const newNode = new Node(val);
        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            newNode.prev = this.last;
            this.last = newNode;
        }
        this.size++;
    }

    //remove and return from the beginning of the deque
    popFirst() {
        if (!this.size) {
            throw new Error("cannot remove from an empty deque")
        } else {
            const val = this.first.val;
            this.first = this.first.next;
            this.size--;
            if (!this.size) { //if the removal empties the deque, remove last
                this.last = null;
            } else { //otherwise clear the prev value of first
                this.first.prev = null;
            }
            return val;
        }
    }

    //remove and return from the end of the deque
    popLast() {
        if (!this.size) {
            throw new Error("cannot remove from an empty deque")
        } else {
            const val = this.last.val;
            this.last = this.last.prev;
            this.size--;
            if (!this.size) { //if the removal empties the deque, remove first
                this.first = null
            } else { //otherwise clear the next value of last
                this.last.next = null;
            }
            return val;
        }
    }

    //return from the beginning of the deque
    peekFirst() {
        return this.first.val;
    }

    //return from the end of the deque
    peekLast() {
        return this.last.val;
    }

    //true if empty, false otherwise
    isEmpty() {
        return this.size === 0;
    }
}

module.exports = Deque;