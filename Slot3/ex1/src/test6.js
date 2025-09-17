// Danh sách công ty mẫu
const companies = [
  { name: "Company A", category: "Finance", start: 1990, end: 2005 },
  { name: "Company B", category: "Retail", start: 1985, end: 2010 },
];

//  Spread: tạo object mới từ companies[0] + sửa start
const company0New = { ...companies[0], start: companies[0].start + 1 };

// In ra để so sánh
console.log("Original company[0]:", companies[0]);
console.log("New company0New:", company0New);

// Rest: gom nhiều mảng thành một tham số
function concatAll(...arrays) {
  return arrays.flat(); // gộp tất cả mảng
}

// Test concatAll
console.log(concatAll([1, 2], [3], [4, 5]));
