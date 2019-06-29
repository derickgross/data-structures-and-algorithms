// Dijkstra's algorithm

// this is the graph we're going to map.  There is a key for each node in the graph.  The value for each key is a list of nodes that can be reached from the key node, and the cost to reach that node.  While alphabetical keys might be more readable, numeric keys allow us to work with non-trivial quantities of nodes
const graph = {
  1: {2: 5, 3: 2},
  2: {4: 4, 5: 2},
  3: {2: 8, 5: 7},
  4: {5: 6, 6: 3},
  5: {6: 1},
  6: {}
};

// key = node, value = {shortest distance from starting node, previous node}
const nodeData = {};
const visitedNodes = [];
const unvisitedNodes = [];

for (let node in graph) {
	unvisitedNodes.push(node);

	if (node === 1) {
		nodeData[node] = {
			"weightFromFirst": -1, // represents distance between first node and itself
			"previousNode": null
		};
	} else {
		nodeData[node] = {
			"weightFromFirst": null,
			"previousNode": null
		};
	}
}

const visitNode = (node) => {

}

const selectNode = (previousNode) => {
	let lowest;
	const childNodes = graph[previousNode];

	for (let node in childNodes) {
		if (!lowest || childNodes[node] < lowest) {
			lowest = childNodes[node];
		}
	}

	return lowest;
}