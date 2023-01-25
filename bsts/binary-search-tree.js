class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    } else {
      let current = this.root;
      while (current) {
        if (current.val > val) { //less than, goes to the left
          if (current.left) { //if there is a left node, descend down to it
            current = current.left;
          } else { //otherwise put val as the left node
            current.left = new Node(val);
            return this;
          }
        } else { //greater than or equal to, goes to the right
          if (current.right) { //if there is a right node, descend down to it
            current = current.right;
          } else { //otherwise put val as the right node
            current.right = new Node(val);
            return this;
          }
        }
      }
    }
    //there should be no circumstance in which we get here
    throw new Error("Something has gone horribly wrong");
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    const insertRecurse = (node, val) => {
      if (node.val > val) {
        if (node.left) {
          insertRecurse(node.left, val);
        } else {
          node.left = new Node(val);
        }
      } else {
        if (node.right) {
          insertRecurse(node.right.val);
        } else {
          node.right = new Node(val);
        }
      }
    }
    if (this.root) {
      insertRecurse(this.root, val);
    } else {
      this.root = new Node(val);
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (this.root) {
      let current = this.root;
      while (current) {
        if (current.val === val) return current;
        if (current.val > val) {
          current = current.left;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findRecurse = (node, val) => {
      if (node) {
        if (node.val === val) return node;
        if (node.val > val) {
          return findRecurse(node.left, val);
        } else {
          return findRecurse(node.right, val);
        }
      }
    }
    return findRecurse(this.root, val);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const dfsRecurse = (node, arr) => {
      if (node) {
        arr.push(node.val);
        if (node.left) {
          dfsRecurse(node.left, arr)
        }
        if (node.right) {
          dfsRecurse(node.right, arr)
        }
      }
    }
    const retArr = [];
    dfsRecurse(this.root, retArr);
    return retArr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const dfsRecurse = (node, arr) => {
      if (node) {
        if (node.left) {
          dfsRecurse(node.left, arr)
        }
        arr.push(node.val);
        if (node.right) {
          dfsRecurse(node.right, arr)
        }
      }
    }
    const retArr = [];
    dfsRecurse(this.root, retArr);
    return retArr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const dfsRecurse = (node, arr) => {
      if (node) {
        if (node.left) {
          dfsRecurse(node.left, arr)
        }
        if (node.right) {
          dfsRecurse(node.right, arr)
        }
        arr.push(node.val);
      }
    }
    const retArr = [];
    dfsRecurse(this.root, retArr);
    return retArr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const retArr = [];
    if (this.root) {
      const queue = [this.root]; //this is sub optimal, faster to code as an array, would be better as a linked list
      let current;
      while (queue.length) {
        current = queue.shift();
        retArr.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return retArr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node.*/

  remove(val) {
    if (this.root) {
      /** helper function, returns the min val of the subtree */
      const findMin = node => {
        while (node.left) {
          node = node.left;
        }
        return node.val;
      }
      const removeRecurse = (node, val) => {
        if (node) {
          if (node.val > val) { //search left for right node
            node.left = removeRecurse(node.left, val);
          } else if (node.val < val) { //search right for right node
            node.right = removeRecurse(node.right, val);
          } else { //if we find the correct node
            if (!node.left) { //if there is only one child, simply replace with the child.
              return node.right;
            } else if (!node.right) {
              return node.left;
            }
            /** If there are two children, replace the node's value with the value of the min larger child
             *  using min on node.right, then remove that node from the right child bst.
             */
            node.val = findMin(node.right);
            node.right = removeRecurse(node.right, node.val);
          }
        }
        return node; //base case, will be null on leaves, and will also be the subtree with node removed on success
      }
      return removeRecurse(this.root, val);
    }
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    /** helper function, finds the deepest depth of a subtree */
    const findDepth = (node, depth) => {
      if(!node){ //base case, node is null
        return depth;
      }
      const leftDepth = findDepth(node.left, depth + 1);;
      const rightDepth = findDepth(node.right, depth + 1);;
      if (leftDepth > rightDepth) { //return the deeper depth found
        return leftDepth;
      } else {
        return rightDepth;
      }
    }
    if (this.root) {
      //if there is only one child of root, then it is not balanced.
      if (!this.root.left && !this.root.right) return true;
      else { 
        /** if there is a difference in the depths of the left and right side of more than 2,
         *  then it is possible to make a more balanced tree, so, this returns false. 
         */
        return Math.abs(findDepth(this.root.left, 1) - findDepth(this.root.right, 1)) < 2;
      }
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    const findMax = node => {
      while (node.right) {
        node = node.right;
      }
      return node.val;
    }
    if (this.root) {
      //if there is only a left child of root, the second highest is the largest val in the left subtree
      if (!this.root.right && this.root.left) {
        return findMax(this.root.left);
      }
      //otherwise we go as far right as we can, keeping track of the value before the node we're on
      let prev = this.root.val;
      let current = this.root.right;
      while (current.right) {
        prev = current.val;
        current = current.right;
      }
      return prev;
    }
  }
}

module.exports = BinarySearchTree;
