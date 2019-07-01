// Dijkstra's algorithm

// this is the graph we're going to map.  There is a key for each node in the graph.  The value for each key is a list of nodes that can be reached from the key node, and the cost to reach that node.  While alphabetical keys might be more readable (allowing dot notation to access object values), numeric keys allow us to work with non-trivial quantities of nodes without mapping
const graph = {
  1: {2: 5, 3: 2},
  2: {4: 4, 5: 2},
  3: {2: 8, 5: 7},
  4: {5: 6, 6: 3},
  5: {6: 1},
  6: {}
};

class dijkstra {
	constructor(graph) {
		this.graph = graph;
		this.unvisitedNodes = Object.keys(graph);
		this.visitedNodes = [];
		this.currentNode = null;
		this.nodeData = this.initializeNodeData(graph); // key = node, value = {shortest distance/least weight from starting node, previous node}
	}

	initializeNodeData(graph) {
		const nodeData = {};

		const nodes = Object.keys(graph);

		for (let node of nodes) {
			if (node == 1) {
				nodeData[node] = {
					"weightFromFirst": 0, // represents distance between first node and itself
					"previousNode": null
				};
			} else {
				nodeData[node] = {
					"weightFromFirst": Number.MAX_SAFE_INTEGER, // approximates infinity
					"previousNode": null
				};
			}
		}

		return nodeData;
	}

	// takes an object with keys representing child nodes of the current node and values representing the weight of the unidirectional edge from current node to child node
	examineNodes(nodes) {
		for (let node in nodes) {
			if (!nodeData[node]["previousNode"]) {
				nodeData[node] = {
					"weightFromFirst": nodeData[this.currentNode]["weightFromFirst"] + graph[this.currentNode][node],
					"previousNode": this.currentNode
				}
			}
		}
	}

	selectNode() {
		const childNodes = this.getChildNodes(this.currentNode);
		const childNodeKeys = Object.keys(childNodes);
		let lowest = parseInt(childNodeKeys[0]);

		console.log("childNodeKeys: ", childNodeKeys);
		console.log("childNodes: ", childNodes);

		// if currentNode is still null, set it to the first node.  Otherwise, set it to the child node with the lowest weight associated with its connecting edge
		if (!this.currentNode) {
			lowest = 1;
		} else {
			for (let key of childNodeKeys) {
				console.log(`current key: ${key}, current value: ${childNodes[key]}, lowest: ${lowest}`)
				if (childNodes[key] < childNodes[lowest]) {
					lowest = parseInt(key);
				}
			}
		}

		this.currentNode = lowest;
	}

	getChildNodes(node) {
		const childNodes = !!node ? this.graph[node] : this.graph[1];

		return childNodes;
	}
}

module.exports = {
	dijkstra
}