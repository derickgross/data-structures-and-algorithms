// Given a list of method names to serve as a spec for functionality, an implementation of a linked list was created
// Linked list codepen: https://codepen.io/derickgross/pen/EJRrKE

class Node {
  constructor(data) {
      // each new node has a data property...
    this.data = data;
      //  and a .next property with the value null
    this.next = null;
  }
}

class LinkedList {
  constructor() {
      // start with a "head" property with a value of null
    this.head = null;
  }

  appendNode(data) {
      // a new node is created, and added to the end of the list
    const newNode = new Node(data);
    this.head === null ? this.head = newNode : this.lastNode().next = newNode; 
  }

  prependNode(data) {
      // a new node is created, and added to the front of the list
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  pop() {
      // return the last node, permanently deleting it from the list
    let current = this.head;
    let previous = this.head;

    if (this.head.next === null) {
      this.head = null;
    } else {
      while (current.next) {
        previous = current;
        current = current.next;
      }
      previous.next = null;
    }

    return current;
  }

  removeFromFront() {
      // return the head node, permanently deleting it from the list
      // set the next node as the new head
    const removed = this.head;
    this.head = removed.next;
    return removed;
  }

  insertAt(X, data) {
      // create a new node with the given data, and insert it into the list after the Xth node,
      // or in the last position if X is greater than the length of the list
    const newNode = new Node(data);
    
    let previousNode = this.head;
    let nextNode = this.head.next;

    if (X === 0) {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    for (let i = 1; i <= X; i++) {
      if (i === X) {
        newNode.next = nextNode;
        previousNode.next = newNode;
      } else {
        previousNode = previousNode.next;
        nextNode = previousNode.next;
      }
    }
  }

  removeAt(X) {
      // starting with 0 (the head node), count to the Xth node
      // remove it from the list and return it
    
    let previousNode = this.head;
    let nextNode = this.head.next;
    
    if (X === 0) {
      return this.removeFromFront();
    } else {
      for (let i = 0; i <= X; i++) {
        if (i === X - 1) {
          previousNode.next = nextNode.next;
          break;
        } else {
          previousNode = previousNode.next;
          nextNode = nextNode.next;
        }
      }

      return nextNode;
    }
  }

  search(data) {
      // find the node with the given data
      // if there is no node with matching data, return false
      // if there is a match, return the node's "index", counting from 0 (head node)
    
    let result = false;
    let currentNode = this.head;
    let i = 0;

    while (currentNode) {
    	if (currentNode.data === data) {
        result = i;
        break;
      } else {
        currentNode = currentNode.next;
        i++;
      }
    }
    
    return result;
  }

  sort() {
      // sort the Linked List by each node's data, in ascending order
      // sorting functionality in progress

    let currentNode = this.head;
    let moves = 0;

    if (currentNode) {
    	bubbleSort(currentNode, moves)
    	currentNode = currentNode.next;
    } else {

    }
  }

  lastNode() {
    let walker = this.head;
    while(walker.next){
        walker = walker.next;
    }
    return walker;
  }

  bubbleSortLowToHigh(node, moves) {
    let placeholder;
    let previousNode;
      
    while (!!node && !!node.next && moves < 100) {
      if (node === this.head && (node.data > node.next.data)) {
        placeholder = node;
        this.head = node.next;
        this.head.next = placeholder;

        moves++;

        node = node.next;
      } else {
      	node = node.next;
      	moves++;
      }
    }
  }
}


// MergeSort(headRef)
// 1) If the head is NULL or there is only one element in the Linked List 
//     then return.
// 2) Else divide the linked list into two halves.  
//       FrontBackSplit(head, &a, &b);  a and b are two halves 
// 3) Sort the two halves a and b.
//       MergeSort(a);
//       MergeSort(b);
// 4) Merge the sorted a and b (using SortedMerge() discussed here) 
//    and update the head pointer using headRef.
//      *headRef = SortedMerge(a, b);

