/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

/** LinkedList: chained together nodes. */

class DoublyLinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        for (let val of vals) this.push(val);
    }

    /** push(val): add new value to end of list. */

    push(val) {
        if (!this.head) {
            this.head = new Node(val);
            this.tail = this.head;
        } else {
            this.tail.next = new Node(val);
            this.tail.next.prev = this.tail;
            this.tail = this.tail.next;
        }
        this.length++;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        if (!this.head) {
            this.head = new Node(val);
            this.tail = this.head;
        } else {
            const newHead = new Node(val);
            newHead.next = this.head;
            this.head.prev = newHead;
            this.head = newHead;
        }
        this.length++;
    }

    /** pop(): return & remove last item. */

    pop() {
        if (!this.head) {
            throw new Error("empty list");
        }
        const val = this.tail.val;
        if (this.length === 1) { //if the pop would empty the list, null the head and tail
            this.head = null;
            this.tail = null;
        } else {
            const prev = this.tail.prev;
            prev.next = null;
            this.tail = prev;
        }
        this.length--;
        return val;
    }

    /** shift(): return & remove first item. */

    shift() {
        if (!this.head) {
            throw new Error("empty list");
        }
        const val = this.head.val;
        if (this.length === 1) { //if the shift would empty the list, null the head and tail
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.length--;
        return val;
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {
        if (idx >= this.length || idx < 0) {
            throw new Error("invalid index");
        }
        let currentNode = this.head;
        for (let i = 0; i < idx; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.val;
    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {
        if (idx >= this.length || idx < 0) {
            throw new Error("invalid index");
        }
        let currentNode = this.head;
        for (let i = 0; i < idx; i++) {
            currentNode = currentNode.next;
        }
        currentNode.val = val;
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        if (idx === this.length) { //short circuit for empty list and inserting at tail
            this.push(val);
        } else {
            if (idx > this.length || idx < 0) {
                throw new Error("invalid index");
            }
            let currentNode = this.head;
            for (let i = 0; i < idx - 1; i++) {
                currentNode = currentNode.next;
            }
            const nextNode = currentNode.next;
            const newNode = new Node(val);
            currentNode.next = newNode;
            newNode.prev = currentNode;
            newNode.next = nextNode;
            this.length++;
        }
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        if (idx >= this.length || idx < 0) {
            throw new Error("invalid index");
        }
        if (idx === 0) { //short circuit for first and last node removal
            return this.shift();
        } else if (idx === this.length - 1) {
            return this.pop();
        } else {
            let currentNode = this.head;
            for (let i = 0; i < idx; i++) {
                currentNode = currentNode.next;
            }
            const nextNode = currentNode.next;
            const prevNode = currentNode.prev;
            const val = currentNode.val;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            this.length--;
            return val;
        }
    }

    /** average(): return an average of all values in the list */

    average() {
        if (this.length === 0) { //short circuit for empty list
            return 0;
        }
        let sum = 0;
        let currentNode = this.head;
        while (currentNode) {
            sum += currentNode.val;
            currentNode = currentNode.next;
        }
        return sum / this.length;
    }
}

module.exports = DoublyLinkedList;
