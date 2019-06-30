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

	const d = new dijkstra(graph);

	console.log(d.nodeData);
	console.log(Object.keys(d.nodeData[6]));

	expect(d.nodeData[1].weightFromFirst).toBe(0);
	expect(d.nodeData[5].weightFromFirst).toBe(null);
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

	const d = new dijkstra(graph);

	expect(Object.keys(graph).length).toBe(d.unvisitedNodes.length);
})

test('initializes no visited nodes', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph);

	expect(d.visitedNodes.length).toBe(0);
})

test('getChildNodes returns child nodes for first node in graph if currentNode is null', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph);

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

	const d = new dijkstra(graph);

	d.currentNode = 2;
	console.log(d.currentNode);
	childNodes = d.getChildNodes(d.currentNode);
	console.log(childNodes);

	expect(childNodes[4]).toBe(4);
	expect(childNodes[5]).toBe(2);
	expect(childNodes[3]).toBe(undefined);

	d.currentNode = 5;
	childNodes = d.getChildNodes(d.currentNode);
	expect(childNodes[6]).toBe(1);
	expect(childNodes[2]).toBe(undefined);
})

test('selectNode sets currentNode to first node when called on newly initialized dijkstra', () => {
	const graph = {
	  1: {2: 5, 3: 2},
	  2: {4: 4, 5: 2},
	  3: {2: 8, 5: 7},
	  4: {5: 6, 6: 3},
	  5: {6: 1},
	  6: {}
	};

	const d = new dijkstra(graph);
	
	d.selectNode();
	expect(d.currentNode).toBe(1);

	d.selectNode();
	expect(d.currentNode).toBe(3);

	d.selectNode();
	expect(d.currentNode).toBe(5);

	d.selectNode();
	expect(d.currentNode).toBe(6);
})