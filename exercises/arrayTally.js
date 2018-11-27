myArr = ['x', 2, 'y', 'z', 2]

function arrayTally(arr) {
  res = arr.reduce(function (acc, val) {
    if (!acc[val]) acc[val] = 1; //Initialize
    else acc[val]++; //Increment
    return acc;
  }, {})
  return res;
}

test = arrayTally(myArr)
console.log('Object count: ', test);
