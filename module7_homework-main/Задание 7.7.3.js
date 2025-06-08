const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 17 },
  { id: 3, name: "Charlie", age: 30 },
  { id: 4, name: "David", age: 16 },
  { id: 5, name: "Eve", age: 22 }
];

const adults = users.filter(user => user.age >= 18);

const adultNames = adults.map(adult => adult.name);

console.log("Взрослые пользователи:", adults);
console.log("Имена взрослых пользователей:", adultNames);