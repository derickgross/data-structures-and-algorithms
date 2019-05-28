function mergeSort(array) {
  if (array.length > 1) {
    const arrayRight = array.splice(array.length/2);

    return mergeArrays(mergeSort(array), mergeSort(arrayRight));
  }
  else {
    return array;
  }
}

function mergeArrays(first, second) {
  const result = [];

  while (!!first.length && !!second.length) {
    first[0] <= second[0] ? result.push(first.shift()) : result.push(second.shift())
  }

  return result.concat(first, second);
}

module.exports { mergeSort, mergeArrays } 