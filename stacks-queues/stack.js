/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null; //there is no need to keep track of the last item in a stack
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const newNode = new Node(val);
    newNode.next = this.first;
    if(!this.size) { //again, there is no need for this other than to pass a test
      this.last = newNode;
    }
    this.first = newNode;
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if(!this.size){
      throw new Error("cannot remove from an empty stack")
    } else {
      const val = this.first.val;
      this.first = this.first.next;
      this.size--;
      if(!this.size) { //remove the useless last if the stack is empty
        this.last = null;
      }
      return val;
    }
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    return this.first.val;
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
