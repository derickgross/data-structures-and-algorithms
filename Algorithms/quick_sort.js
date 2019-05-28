function quickSort(arr){
  if (arr.length <= 1) {
    return arr;
  }
  
  const left = [];
  const right = [];
  const pivot = arr[arr.length - 1];
  
  for (let i = 0; i < arr.length - 1; i++) {
    let element = arr[i];
    element <= pivot ? left.push(element) : right.push(element);
  }
  
  return (quickSort(left).concat([pivot].concat(quickSort(right))));
  
}