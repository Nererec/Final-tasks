const userInput = prompt("Пожалуйста, введите число:");

if (userInput !== null) { 
    const number = Number(userInput);

    if (!isNaN(number)) { 
        const arr = [];
        for (let i = 0; i <= number; i++) {
            arr.push(i);
        }
        console.log(arr);
    } else {
        console.log("Вы ввели некорректное число.");
    }
} else {
    console.log("Вы отменили ввод.");
}