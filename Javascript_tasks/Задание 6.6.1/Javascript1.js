function isPalindrome(word) {
  const processedWord = word.toLowerCase().replace(/\s/g, "");
  const reversedWord = processedWord.split("").reverse().join("");
  if (processedWord === reversedWord) {
    console.log(`Слово ${word} является палиндромом`);
  } else {
    console.log(`Слово ${word} не является палиндромом`);
  }
}
isPalindrome("Довод");
isPalindrome("Сантимент");
isPalindrome("А роза упала на лапу Азора"); 