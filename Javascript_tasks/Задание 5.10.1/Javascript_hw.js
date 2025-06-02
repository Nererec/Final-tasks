const userInput= prompt ("Введите любое число")
if (userInput !== null) {
  const number = +userInput; // Преобразуем строку в число

  if (!isNaN(number)) { // Проверяем, что преобразование прошло успешно

    const square = number * number;
    const cube = number * number * number;

    const output = `${number}\n${square}\n${cube}`; // Создаем строку для вывода

    alert(output);

  } else {
    alert("Вы ввели некорректное число!");
  }
}