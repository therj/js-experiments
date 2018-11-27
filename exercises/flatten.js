// Flatten the array of array and elements to a unique array!

testArr = [1, 2, 3, [4, 3, 2, 6], 7];

function flattenArray(arr) {
  op = arr.reduce(function (acc, val) {
    if (Array.isArray(val)) {
      val.forEach(function (item) {
        if (acc.indexOf(item) == -1) {
          acc.push(item);
        }
      });
    } else if (acc.indexOf(val) == -1) {
      acc.push(val);
    }
    return acc;
  }, []);
  return op
}

test = flattenArray(testArr)
console.log('Flat Array: ', test);
