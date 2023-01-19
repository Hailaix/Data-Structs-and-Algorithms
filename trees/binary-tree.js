/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
    let depth = 0;
    const visitQueue = [this.root]; // a linked list would be better, but this works fine for simplicity sake
    while (visitQueue.length) {
      const current = visitQueue.shift();
      depth++;
      if (current.left) visitQueue.push(current.left);
      if (current.right) visitQueue.push(current.right);
      if (!current.left && !current.right) break;
    }
    return depth;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (!this.root) return 0;
    let maxDepth = 0;
    const maxDepthRecurse = (node, depth = 0) => {
      if (node) {
        depth++;
        if (depth > maxDepth) maxDepth = depth; //reached a new max depth
        maxDepthRecurse(node.left, depth);
        maxDepthRecurse(node.right, depth);
      }
    }
    maxDepthRecurse(this.root);
    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let trueMax = 0;
    const maxSumRecurse = node => {
      if (!node) return 0; //base case node is null (children of leaf nodes)
      const leftSum = maxSumRecurse(node.left);
      const rightSum = maxSumRecurse(node.right);
      const localMax = node.val + leftSum + rightSum; //the maximum value if this would be the pivot node
      //if using this node as the pivot is the best sum, store it
      if (localMax > trueMax) {
        trueMax = localMax;
      }
      //pass on the max without pivoting at this node to the previous recursion
      if (leftSum > rightSum) {
        return node.val + leftSum;
      } else {
        return node.val + rightSum;
      }
    }
    maxSumRecurse(this.root);
    return trueMax;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let nextVal = null;
    const nextLargerRecurse = node => {
      if (!node) return;
      if (node.val > lowerBound) {
        if (nextVal === null || node.val < nextVal) {
          nextVal = node.val;
        }
      }
      nextLargerRecurse(node.left);
      nextLargerRecurse(node.right);
    }
    nextLargerRecurse(this.root);
    return nextVal;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */


  areCousins(node1, node2) {
    const depth1 = this.findDepth(node1);
    const depth2 = this.findDepth(node2);
    if (depth1 !== depth2 || depth1 === -1) {
      //if they aren't on the same level, or aren't in the tree, then they are not cousins
      return false;
    }
    const parent1 = this.findParent(node1);
    const parent2 = this.findParent(node2);
    return parent1 !== parent2;
  }

  //helper functions for areCousins that technically could be used elsewhere, so I'm making it a class method

  //finds the level of a node in this tree, -1 if it isn't in the tree
  findDepth(node) {
    const findDepthRecurse = (current, depth = 0) => {
      if (current === node) return depth; //if we found our node, this is the right depth
      if (current.left) { //if there is a left, search it for the node
        const leftSearch = findDepthRecurse(current.left, depth + 1);
        if (leftSearch !== -1) return leftSearch;
      }
      if (current.right) { //if its not on the left, search the right
        const rightSearch = findDepthRecurse(current.right, depth + 1);
        if (rightSearch !== -1) return rightSearch;
      }
      return -1; //if we have no children and this isn't our node, return -1
    }
    return findDepthRecurse(this.root);
  }

  //finds the parent of a node (would be easier to just keep track of it in the node itself)
  //returns the parent node if found, or null if the node is not in the tree, is the root, or if the tree is empty
  findParent(node) {
    if (this.root) {
      let visitStack = [this.root];
      while (visitStack.length) {
        const current = visitStack.pop();
        if (current.left === node || current.right === node) {
          return current;
        } else {
          if (current.left) visitStack.push(current.left);
          if (current.right) visitStack.push(current.right);
        }
      }
    }
    return null;
  }


  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const arr = [];
    //pushs the tree from left to right onto an array
    const serializeRecurse = node => {
      if (node === null) arr.push(null);
      else {
        serializeRecurse(node.left);
        serializeRecurse(node.right);
        arr.push(node.val);
      }
    }
    serializeRecurse(tree.root);
    return JSON.stringify(arr);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const arr = JSON.parse(stringTree);
    //builds the tree back up from the right to the left since we pushed from left to right
    const deserializeRecurse = () => {
      if (arr.length) {
        const val = arr.pop();
        if (val === null) return null;
        else {
          const node = new BinaryTreeNode(val);
          node.right = deserializeRecurse();
          node.left = deserializeRecurse();
          return node;
        }
      }
      return null; //end of the array base case
    }
    const root = deserializeRecurse();
    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const path1 = this.findPath(node1);
    if (path1) {
      const path2 = this.findPath(node2);
      if (path2) {
        let i = 0;
        while (path1[i] === path2[i]) {
          i++;
        }
        return path1[i - 1];
      }
    }
    return null; //if either node is not on the tree, there is no common ancestor
  }

  //helper for lowest Common Ancestor, finds the path from the root to a node in the tree
  //returns the array of ancestors of node, including node, or null if it isn't in the tree
  findPath(node) {
    const path = [];
    const findPathRecurse = current => {
      if (current === null) return false; //base case we hit null and return false
      path.push(current);
      if (current === node) return true; //if we find it at this node or any of its children, return true
      if (findPathRecurse(current.left)) return true;
      if (findPathRecurse(current.right)) return true;
      //base case 2 this node is not on the path
      //remove this node and return false
      path.pop();
      return false;
    }
    findPathRecurse(this.root);
    if (path.length) {
      return path;
    } else {
      return null;
    }
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
