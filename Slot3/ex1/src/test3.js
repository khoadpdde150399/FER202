const ages = [33, 12, 20, 16];

// Bỏ qua phần tử thứ 2, third mặc định 0
const [first, , third = 0, ...restAges] = ages;

console.log(first);     // 33
console.log(third);     // 20
console.log(restAges);  // [16]
