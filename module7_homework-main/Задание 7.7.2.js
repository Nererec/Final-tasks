function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        return "Error: Division by zero!";
      }
      return a / b;
    default:
      return "Error: Invalid operator";
  }
}
const numbers = {
  a: 0, 
  b: 0,
  operator: ""
};

const args = [2, 3, "+"];

const result = calculate.apply(numbers, args);

console.log(result);