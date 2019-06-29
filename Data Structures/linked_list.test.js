const { LinkedList, Node } = require('./linked_list.js');

// Node class
test('Node: should start with the data property provided', () => {
	let node = new Node(2);

	expect(node.data).toBe(2);
});
test('Node: next property should initialize to null', () => {
	let node = new Node(2);

	expect(node.next).toBe(null);
	expect(node.next).not.toBe(undefined);
});


// LinkedList class
test('LinkedList: head should initialize to null', () => {
	let list = new LinkedList();

	expect(list.head).toBe(null);
	expect(list.head).not.toBe(undefined);
});
test('LinkedList: new nodes should append to the end of the list', () => {
	let list = new LinkedList();

	list.appendNode(1);
	expect(list.head.data).toBe(1);

	list.appendNode(2);
	expect(list.head.next.data).toBe(2);
	expect(list.head.data).toBe(1);
	expect(list.head.next.next).toBe(null);
});
test('LinkedList: new nodes should prepend to the front of the list', () => {
	let list = new LinkedList();

	list.appendNode(2);
	expect(list.head.data).toBe(2);

	list.prependNode(1);
	expect(list.head.data).toBe(1);
	expect(list.head.next.data).toBe(2);
});
// test('LinkedList: ', () => {

// });
// test('LinkedList: ', () => {

// });
// test('LinkedList: ', () => {

// });
// test('LinkedList: ', () => {

// });
// test('LinkedList: ', () => {

// });
test('LinkedList: can sort itself', () => {
	let list = new LinkedList();
	list.appendNode(2);
	list.appendNode(3);
	list.appendNode(1);
	list.appendNode(5);
	list.appendNode(4);

	list.sort();

	expect(list.head.data).toBe(1);
	expect(list.head.next.data).toBe(2);
	expect(list.head.next.next.data).toBe(3);
	expect(list.head.next.next.next.data).toBe(4);
	expect(list.head.next.next.next.next.data).toBe(5);
});
// test('', () => {

// });