myFruitArray = [{
  id: 1,
  name: 'apple'
}, {
  'name': 'banana'
}, {
  k: 22
}]

// Search by name
nameSearch = searchByName(myFruitArray, 'apple')
console.log('Search by name: ', nameSearch);

function searchByName(fruitArray, fruitName) {
  op = fruitArray.filter(function (val, index) {
    return val.name == fruitName;
  })
  return op;
}


// Search by key
keySearch = searchByKey(myFruitArray, 'k', 22)
console.log('Search by key: ', keySearch);

function searchByKey(fruitArray, name, key) {
  res = fruitArray.filter(function (val, index) {
    return val[name] == key
  })
  return res
}
