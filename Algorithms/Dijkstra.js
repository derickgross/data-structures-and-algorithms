// Dijkstra's algorithm

// this is the graph we're going to map.  There is a key for each node in the graph.  The value for each key is a list of nodes that can be reached from the key node, and the cost to reach that node.  While alphabetical keys might be more readable (allowing dot notation to access object values), numeric keys allow us to work with non-trivial quantities of nodes without mapping the keys
// const graph = {
//   1: {2: 5, 3: 2},
//   2: {4: 4, 5: 2},
//   3: {2: 8, 5: 7},
//   4: {5: 6, 6: 3},
//   5: {6: 1},
//   6: {}
// };

class dijkstra {
	constructor(graph, start) {
		this.graph = graph;
		this.start = start;
		this.unvisitedNodes = Object.keys(this.graph);
		this.currentNode = start;
		this.nodeData = this.initializeNodeData(); // key = node, value = {shortest distance/least weight from starting node, previous node}

		// this.createNodeData(); // calling this method in the constructor makes testing more difficult
	}

	initializeNodeData() {
		const nodeData = {};

		const nodes = Object.keys(this.graph);

		for (let node of nodes) {
			if (node == this.start) {
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
		let currentWeight;
		let newWeight;
		const keys = Object.keys(nodes);

		for (let key of keys) {
			newWeight = this.nodeData[this.currentNode]["weightFromFirst"] + this.graph[this.currentNode][key];
			currentWeight = this.nodeData[key]["weightFromFirst"];

			if (newWeight < currentWeight) {
				this.nodeData[key] = {
					"weightFromFirst": newWeight,
					"previousNode": this.currentNode
				}
			}
		}
	}

	selectNode() {
		const childNodes = this.getChildNodes(this.currentNode);
		const childNodeKeys = Object.keys(childNodes);
		let lowest = parseInt(childNodeKeys[0]);

		if (childNodeKeys.length === 0) {
			this.currentNode = null;
			return;
		} else {
			for (let key of childNodeKeys) {
				if (childNodes[key] < childNodes[lowest] && this.unvisitedNodes.includes(key)) {
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

	removeFromUnvisitedNodes(node) {
		this.unvisitedNodes = this.unvisitedNodes.filter(x => x != node);
	}

	visitNode() {
		const node = this.currentNode;
		const currentChildNodes = this.getChildNodes(node);
		this.examineNodes(currentChildNodes);
		this.removeFromUnvisitedNodes(node);
		this.selectNode();
	}

	createNodeData() {
		let processed = 0;

		while (this.unvisitedNodes.length > 0 && this.currentNode) {
			this.visitNode();
			processed++;
		}
	}

	// TODO: add method to return shortest path from starting node to any destination node
}

module.exports = {
	dijkstra
}