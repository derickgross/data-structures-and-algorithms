const { mergeSort } = require('./merge_sort.js');

test('without comparison function, sorts an array of numbers low to high', () => {
	const input = [5,2,4,3,1];
	const output = mergeSort(input);

	expect(output[0]).toBe(1);
	expect(output[1]).toBe(2);
	expect(output[2]).toBe(3);
	expect(output[3]).toBe(4);
	expect(output[4]).toBe(5);
});
test('without comparison function, sorts an array of words in alphabetical order', () => {
	const input = ["eggplant", "banana", "dirt", "chocolate", "apple"];
	const output = mergeSort(input);

	expect(output[0]).toBe("apple");
	expect(output[1]).toBe("banana");
	expect(output[2]).toBe("chocolate");
	expect(output[3]).toBe("dirt");
	expect(output[4]).toBe("eggplant");
});
test('with proper comparison function, sorts numbers low to high', () => {
	const comparer = (first, second) => {
		return first < second;
	};

	const input = [5,2,4,3,1];
	const output = mergeSort(input, comparer);

	expect(output[0]).toBe(1);
	expect(output[1]).toBe(2);
	expect(output[2]).toBe(3);
	expect(output[3]).toBe(4);
	expect(output[4]).toBe(5);
});
test('with proper comparison function, sorts numbers high to low', () => {
	const comparer = (first, second) => {
		return first > second;
	};

	const input = [5,2,4,3,1];
	const output = mergeSort(input, comparer);

	expect(output[0]).toBe(5);
	expect(output[1]).toBe(4);
	expect(output[2]).toBe(3);
	expect(output[3]).toBe(2);
	expect(output[4]).toBe(1);
});