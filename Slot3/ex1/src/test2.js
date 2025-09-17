const person = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St"
    // city có thể không tồn tại
  }
};

// Destructuring lồng nhau + giá trị mặc định
const {
  address: { street, city = "Unknown City" }
} = person;

console.log(street); // 123 Main St
console.log(city);   // Unknown City
