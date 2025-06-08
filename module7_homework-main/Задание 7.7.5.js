function getUniqueSortedNumbers(numbers) {
  const uniqueNumbers = new Set(numbers);
  const uniqueArray = Array.from(uniqueNumbers);
  uniqueArray.sort((a, b) => a - b);
  return uniqueArray;
}

//пример:
const numbers = [5, 2, 8, 5, 1, 8, 2, 9, 1, 4];
const uniqueSorted = getUniqueSortedNumbers(numbers);
console.log(uniqueSorted); 