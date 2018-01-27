
Array.prototype.swapIndices = function (x, y) {
  let temp = this[x]
  this[x] = this[y]
  this[y] = temp
}

Array.prototype.shuffle = function () {
  for(let i = 0; i < this.length; i++){
    let j = parseInt(Math.random() * this.length)
    this.swapIndices(i, j)
  }
}