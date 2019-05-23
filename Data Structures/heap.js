// Heap class can create a max or min heap from an array of elements

class Heap {
  static minHeapify(elements) {
    Heap.heapify(elements, "min");
  }

  static maxHeapify(elements) {
    Heap.heapify(elements, "max");
  }

  static heapify(elements, direction) {
    if (!["min", "max"].includes(direction)) {
      console.log('You must specify "min" or "max as third argument to Heap.compare');
    }

    if ((elements[0] !== null) && (elements[0] !== undefined)) {
      elements.unshift(null);
    }

    let i = elements.length - 1;
    while (i > 0) {
      Heap.heapifyNode(i, elements, direction);
      i--;
    }
  }

  static heapifyNode(i, elements, direction) {
    let node = elements[i];
    let leftChild = elements[i * 2];
    let rightChild = elements[i * 2 + 1];

    while (Heap.compare(leftChild, node, direction) || Heap.compare(rightChild, node, direction)) {
      if (Heap.compare(leftChild, node, direction)) {
        [node, leftChild] = [leftChild, node];
        elements[i] = node;
        if (!!elements[i * 2]) { elements[i * 2] = leftChild; }
        Heap.heapifyNode(i * 2, elements, direction);
      }
      if (Heap.compare(rightChild, node, direction)) {
        [node, rightChild] = [rightChild, node];
        elements[i] = node;
        if (!!elements[i * 2 + 1]) { elements[i * 2 + 1] = rightChild; }
        Heap.heapifyNode(i * 2 + 1, elements, direction);
      }
    }
  }

  static setNodes(elements, i, node, leftChild, rightChild) {
    elements[i] = node;
    if (!!elements[i * 2]) { elements[i * 2] = leftChild; }
    if (!!elements[i* 2 + 1]) { elements[i * 2 + 1] = rightChild; }
  }

  static calculateRelativeDistance(element) {
    if (!!element) {
      return element[0] * element[1];
    } else {
      return undefined;
    }
  }

  static compare(first, second, direction) {
    if (direction === 'min') {
      return Heap.calculateRelativeDistance(first) < Heap.calculateRelativeDistance(second);
    } else if ( direction === 'max') {
      return Heap.calculateRelativeDistance(first) > Heap.calculateRelativeDistance(second);
    }
  }

  static maxAdd(elements, newElement) {
    elements.push(newElement);
    Heap.maxHeapify(elements);
  }

  static minAdd(elements, newElement) {
    elements.push(newElement);
    Heap.minHeapify(elements);
  }

  static maxSort(elements) {
    let sorted = [];
    Heap.maxHeapify(elements);

    while (elements.length > 1) {
      Heap.removeNext(elements, sorted);
      Heap.maxHeapify(elements);
    }

    return sorted;
  }

  static minSort(elements) {
    let sorted = [];
    Heap.minHeapify(elements);

    while (elements.length > 1) {
      Heap.removeNext(elements, sorted);
      Heap.minHeapify(elements);
    }

    return sorted;
  }

  static removeNext(elements, sorted) {
    sorted.push(elements[1]);
    elements[1] = elements[elements.length - 1];
    elements.splice(elements.length - 1);
  }
}