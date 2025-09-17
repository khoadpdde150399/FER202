const companies = [
  { name: "Company A", category: "Finance", start: 1990, end: 2005 },
  { name: "Company B", category: "Retail", start: 1985, end: 2010 },
  { name: "Company C", category: "Tech", start: 2000, end: 2008 },
  { name: "Company D", category: "Auto", start: 1970, end: 2000 }
];

// Sao chép + sắp xếp theo end tăng dần
const sorted = [...companies].sort((a, b) => a.end - b.end);

// Lấy 3 công ty đầu
sorted.slice(0, 3).forEach(c => {
  console.log(`${c.name} - ${c.end}`);
});
