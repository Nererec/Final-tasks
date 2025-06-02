const ageInput = prompt("Введите ваш возраст:");
const requestedAmountInput = prompt("Введите желаемую сумму кредита:");

if (ageInput !== null && requestedAmountInput !== null) {
  const age = +ageInput;
  const requestedAmount = +requestedAmountInput;

  if (isNaN(age) || isNaN(requestedAmount)) {
    alert("Некорректный ввод. Пожалуйста, введите числа.");
  } else if (age < 0) {
      alert("Возраст не может быть отрицательным");
  } else if (requestedAmount < 0){
      alert("Сумма кредита не может быть отрицательной");
  }
  else if (age < 18) {
    alert("Кредит не может быть выдан лицам младше 18 лет.");
  } else {
    let maxLoanAmount = 0;

    if (age >= 18 && age <= 21) {
      maxLoanAmount = 50000;
    } else if (age >= 22 && age <= 35) {
      maxLoanAmount = 400000;
    } else if (age >= 36 && age <= 65) {
      maxLoanAmount = 1000000;
    } else {
      maxLoanAmount = 0; //Для тех, кто старше 65
       alert("Кредит не выдается.")
    }

    if (maxLoanAmount > 0) {
      const approvedAmount = Math.min(requestedAmount, maxLoanAmount); //выбираем минимальную сумму из запрошенной и максимально возможной
      const roundedAmount = Math.floor(approvedAmount / 1000) * 1000;   //округляем до кратного 1000
      alert(`Мы можем вам выдать ${roundedAmount}.`);

    }
  }
}