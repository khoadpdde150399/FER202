const ages = [33, 12, 20, 16];

// Bỏ qua phần tử thứ 2, third mặc định 0
const [first, , third = 0, ...restAges] = ages;

console.log(first);     // 33
console.log(third);     // 20
console.log(restAges);  // [16]

const total = ages.reduce((sum, a) => sum + a, 0);
console.log(total); // 81

// Lấy phần tử số lần xuất hiện

const evenTotal = ages
  .filter(n => typeof n === 'number' && Number.isFinite(n) && n % 2 === 0)
  .reduce((sum, n) => sum + n, 0);

console.log(evenTotal); // 48