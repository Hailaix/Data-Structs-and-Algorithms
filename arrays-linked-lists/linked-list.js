/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
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
    let penultimate = this.head;
    if (penultimate.next === null) { //short circuit for last node in list
      this.head = null;
      this.tail = null;
      this.length--;
    } else {
      while (penultimate.next !== this.tail) {
        penultimate = penultimate.next;
      }
      this.tail = penultimate;
      penultimate.next = null;
      this.length--;
    }
    return val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) {
      throw new Error("empty list");
    }
    const val = this.head.val;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) { //empty tail if list is emptied
      this.tail = null;
    }
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
    if (idx === 0 && this.length === 0) { //short circuit for empty list
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
      newNode.next = nextNode;
      if (!newNode.next) { //handle insert at tail
        this.tail = newNode;
      }
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
      for (let i = 0; i < idx - 1; i++) {
        currentNode = currentNode.next;
      }
      const afterNext = currentNode.next.next;
      const val = currentNode.next.val;
      currentNode.next = afterNext;
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

  /** pivot(val): pivots the linked list so that everything less than the pivot val 
   * is placed before everything equal to or greater than the pivot val in the list */
  pivot(pivot) {
    let lesserHead;
    let lesserTail;
    let greaterHead;
    let greaterTail;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.val < pivot) {
        if (!lesserHead) { //initial insert into lesser list sets both head and tail
          lesserHead = currentNode;
          lesserTail = currentNode;
        } else { //otherwise place the node at the tail
          lesserTail.next = currentNode;
          lesserTail = currentNode;
        }
      } else { //do the same if it is greater than the pivot but for the other list
        if (!greaterHead) {
          greaterHead = currentNode;
          greaterTail = currentNode;
        } else {
          greaterTail.next = currentNode;
          greaterTail = currentNode;
        }
      }
      currentNode = currentNode.next;
    }
    //finally link the lesserTail and greaterHead, if they exist
    if (lesserHead) {
      lesserTail.next = greaterHead;
    } else {
      lesserHead = greaterHead;
    }
    //put lesserHead as the new head
    this.head = lesserHead;
    //and greaterTail as the new tail (or lesserTail if there is no greaterTail)
    if (greaterTail) {
      this.tail = greaterTail;
    } else {
      this.tail = lesserTail;
    }
  }
}


module.exports = LinkedList;
