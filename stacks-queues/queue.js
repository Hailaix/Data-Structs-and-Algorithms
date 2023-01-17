/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    if(!this.first){ //initialize queue if empty
      this.first = new Node(val);
      this.last = this.first;
    } else { //otherwise add it to the end
      this.last.next = new Node(val);
      this.last = this.last.next;
    }
    this.size++;
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    if(!this.size){
      throw new Error("cannot remove from empty queue");
    } else {
      const val = this.first.val;
      this.first = this.first.next;
      this.size--;
      if(!this.size) { //if we empty the queue with the removal, empty last
        this.last = null;
      }
      return val;
    }
  }

  /** peek(): return the value of the first node in the queue. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;
