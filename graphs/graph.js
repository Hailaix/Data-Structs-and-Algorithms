class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for(let connected of vertex.adjacent) {
      this.removeEdge(vertex, connected);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visitStack = [start];
    const visited = new Set(visitStack);
    const arr = [];
    while(visitStack.length) {
      const current = visitStack.pop();
      arr.push(current.value);
      for(let connection of current.adjacent) {
        if(!visited.has(connection)) {
          visitStack.push(connection);
          visited.add(connection);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visitQueue = [start];
    const visited = new Set(visitQueue);
    const arr = [];
    while(visitQueue.length) {
      const current = visitQueue.shift();
      arr.push(current.value);
      for(let connection of current.adjacent) {
        if(!visited.has(connection)) {
          visitQueue.push(connection);
          visited.add(connection);
        }
      }
    }
    return arr;
  }
  
  /** Returns an array of node values in order of the shortest path between the start and the target */
  shortestPath(start, target) {
    //if we're looking for the start, we know the path already
    if(target === start) {
      return [start.value];
    }
    /** I'm using an object here to keep track of distances, on the (perhaps bad) assumption that 
     *  no two nodes in a graph have the same value.
    */
    const distances = {
      [target.value]: 0
    }
    /** First we do a bfs of the tree to assign distances of each vertex from the target */
    const visitQueue = [target];
    const visited = new Set(visitQueue);
    while(visitQueue.length) {
      const current = visitQueue.shift();
      for(let connection of current.adjacent) {
        if(!visited.has(connection)) { //if we find a new node
          visitQueue.push(connection); //add it to the queue
          visited.add(connection); //add it to the visited set so this is kept as the shortest path to it
          //the distance to the connection node will be the distance to the current node + 1
          distances[connection.value] = distances[current.value] + 1;
        }
      }
    }
    //if the distance to start is undefined, we cannot get to the target
    if(distances[start.value]) {
      const path = [start.value];
      let current = start;
      while(current !== target) {
        //we check the adjacent nodes for a node with a shorter distance to the target until we get to the target
        for(let connection of current.adjacent) {
          if(distances[connection.value] < distances[current.value]) {
            current = connection;
            path.push(current.value);
          }
        }
      }
      //path should now be an array of the nodes between start and target
      return path;
    }
  }
}

module.exports = { Graph, Node }