const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Chris", age: 15 },
  { name: "Diana", age: 20 }
];

// Lọc teen 13–19, map thành "Name (Age)"
const teens = people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`);

teens.forEach(t => console.log(t));
// Ann (19)
// Chris (15)
