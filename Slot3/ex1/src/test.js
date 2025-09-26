function double(x) {
  return x * 2;
}

function isEven(x) {
  return x % 2 === 0;
}
console.log(double(7));   // Expect 14
console.log(isEven(7));   // Expect false


function isOdd(x) {
  return x % 2 !== 0;
}
console.log(isOdd(7)); // Expect true
console.log(isOdd(8)); // Expect false
