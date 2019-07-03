const { dijkstra } = require('./dijkstra.js');

test('initializes node data for each node in graph', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph, 1);

	expect(d.nodeData[1]["weightFromFirst"]).toBe(0);
	expect(d.nodeData[5]["weightFromFirst"]).toBe(Number.MAX_SAFE_INTEGER);
})

test('initializes an unvisited node for each node in graph', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph, 1);

	expect(Object.keys(graph).length).toBe(d.unvisitedNodes.length);
})

// test('initializes no visited nodes', () => {
// 	const graph = {
// 	  1: {2: 5, 3: 2},
// 	  2: {4: 4, 5: 2},
// 	  3: {2: 8, 5: 7},
// 	  4: {5: 6, 6: 3},
// 	  5: {6: 1},
// 	  6: {}
// 	};

// 	const d = new dijkstra(graph, 1);

// 	expect(d.visitedNodes.length).toBe(0);
// })

test('getChildNodes returns child nodes for first node in graph if currentNode is null', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph, 1);

	const childNodes = d.getChildNodes(d.currentNode);

	expect(childNodes[2]).toBe(5);
	expect(childNodes[3]).toBe(2);
	expect(childNodes[1]).toBe(undefined);
})

test('getChildNodes returns proper child nodes for current node', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};
	let childNodes;

	const d = new dijkstra(graph, 1);

	d.currentNode = 2;
	childNodes = d.getChildNodes(d.currentNode);

	expect(childNodes[4]).toBe(4);
	expect(childNodes[5]).toBe(2);
	expect(childNodes[3]).toBe(undefined);

	d.currentNode = 5;
	childNodes = d.getChildNodes(d.currentNode);
	expect(childNodes[6]).toBe(1);
	expect(childNodes[2]).toBe(undefined);
})

// test('selectNode sets currentNode to first node when called on newly initialized dijkstra', () => {
// 	const graph = {
// 	  1: {2: 5, 3: 2},
// 	  2: {4: 4, 5: 2},
// 	  3: {2: 8, 5: 7},
// 	  4: {5: 6, 6: 3},
// 	  5: {6: 1},
// 	  6: {}
// 	};

// 	const d = new dijkstra(graph, 1);
	
// 	d.selectNode();
// 	expect(d.currentNode).toBe(1);

// 	d.selectNode();
// 	expect(d.currentNode).toBe(3);

// 	d.selectNode();
// 	expect(d.currentNode).toBe(5);

// 	d.selectNode();
// 	expect(d.currentNode).toBe(6);
// })

test('examineNodes properly sets nodeData for children of first node', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph, 1);

	const currentChildNodes = d.getChildNodes(d.currentNode);

	d.examineNodes(currentChildNodes);

	expect(d.nodeData[2]["weightFromFirst"]).toBe(5);
	expect(d.nodeData[2]["previousNode"]).toBe(1);
	expect(d.nodeData[3]["weightFromFirst"]).toBe(2);
	expect(d.nodeData[3]["previousNode"]).toBe(1);
})

test('examineNodes properly sets nodeData for first selected node after first node', () => {
	const graph = {
	  1: {2: 7, 3: 3},
	  2: {1: 7, 3: 1, 4: 2, 5: 6},
	  3: {1: 3, 2: 1, 4: 2},
	  4: {2: 2, 3: 2, 5: 4},
	  5: {2: 6, 4: 4},
	};
	let currentChildNodes;

	const d = new dijkstra(graph, 1);

	currentChildNodes = d.getChildNodes(d.currentNode);
	d.examineNodes(currentChildNodes);

	expect(d.nodeData[2]["weightFromFirst"]).toBe(7);
	expect(d.nodeData[2]["previousNode"]).toBe(1);
	expect(d.nodeData[3]["weightFromFirst"]).toBe(3);
	expect(d.nodeData[3]["previousNode"]).toBe(1);

	d.selectNode()
	currentChildNodes = d.getChildNodes(d.currentNode);
	d.examineNodes(currentChildNodes);

	expect(d.nodeData[2]["weightFromFirst"]).toBe(4);
	expect(d.nodeData[2]["previousNode"]).toBe(3);
	expect(d.nodeData[4]["weightFromFirst"]).toBe(5);
	expect(d.nodeData[4]["previousNode"]).toBe(3);
})

test('createNodeData creates proper node data', () => {
	const graph = {
	  1: {2: 7, 3: 3},
	  2: {1: 7, 3: 1, 4: 2, 5: 6},
	  3: {1: 3, 2: 1, 4: 2},
	  4: {2: 2, 3: 2, 5: 4},
	  5: {2: 6, 4: 4},
	};

	const d = new dijkstra(graph, 1);

	d.createNodeData();

	expect(d.nodeData[1]["weightFromFirst"]).toBe(0);
	expect(d.nodeData[1]["previousNode"]).toBe(null);
	expect(d.nodeData[2]["weightFromFirst"]).toBe(4);
	expect(d.nodeData[2]["previousNode"]).toBe(3);
	expect(d.nodeData[3]["weightFromFirst"]).toBe(3);
	expect(d.nodeData[3]["previousNode"]).toBe(1);
	expect(d.nodeData[4]["weightFromFirst"]).toBe(5);
	expect(d.nodeData[4]["previousNode"]).toBe(3);
	expect(d.nodeData[5]["weightFromFirst"]).toBe(9);
	expect(d.nodeData[5]["previousNode"]).toBe(4);
})

// TODO: test that the algorithm can accept non-numeric node names