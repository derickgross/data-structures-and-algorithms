function mergeSort(array, compare = null) {
  if (array.length > 1) {
    const arrayRight = array.splice(array.length/2);

    return mergeArrays(mergeSort(array, compare), mergeSort(arrayRight, compare), compare);
  }
  else {
    return array;
  }
}

function mergeArrays(first, second, compare) {
  const result = [];

  if (!compare) {
    while (!!first.length && !!second.length) {
      first[0] <= second[0] ? result.push(first.shift()) : result.push(second.shift())
    }
  } else if (typeof compare(first, second) === "boolean") {
    while (!!first.length && !!second.length) {
      compare(first, second) ? result.push(first.shift()) : result.push(second.shift())
    }
  } else {
    console.log("Invalid compare strategy provided- does not return a boolean.")
  }

  return result.concat(first, second);
}

module.exports = {
  mergeSort
}