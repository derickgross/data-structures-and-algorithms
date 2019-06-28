// Dijkstra's algorithm

// this is the graph we're going to map.  There is a key for each node in the graph.  The value for each key is a list of nodes that can be reached from the key node, and the cost to reach that node
const graph = {
  start: {A: 5, B: 2},
  A: {C: 4, D: 2},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  finish: {}
};

