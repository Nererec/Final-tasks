const name = prompt("Введите ваше имя:");
const birthYear = prompt("Введите год рождения:");
if (name !== null && birthYear !== null) {
  const currentYear = new Date().getFullYear(); // Получаем текущий год
  const age = currentYear - +birthYear; // Вычисляем возраст (преобразуем год рождения в число)
  if (!isNaN(age)) { // Проверяем, что год рождения был введен корректно и возраст можно вычислить
  const remainder = age % 10; // Остаток от деления на 10
    let ageSuffix;
    if (remainder === 1 && age % 100 !== 11) {
      ageSuffix = "год";
    } else if (remainder >= 2 && remainder <= 4 && (age % 100 < 10 || age % 100 >= 20)) {
      ageSuffix = "года";
    } else {
      ageSuffix = "лет";
    }
    alert(`${name}: ${age} ${ageSuffix}`);
  } else {
    alert("Год не число или пустое имя");
  }
}