function printInfo() {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

const person = {
  name: "Alice",
  age: 30
};

printInfo.call(person);