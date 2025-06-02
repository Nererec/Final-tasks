const name = prompt("Введите ваше имя:");
const birthYear = prompt("Введите год рождения:");

if (name !== null && birthYear !== null) {
  const currentYear = new Date().getFullYear(); // Получаем текущий год
  const age = currentYear - +birthYear; // Вычисляем возраст (преобразуем год рождения в число)

  if (!isNaN(age)) { // Проверяем, что год рождения был введен корректно и возраст можно вычислить
    alert(`${name}: ${age}`); // Выводим сообщение с именем и возрастом
  } else {
    alert("Год должен быть числом!");
  }
}