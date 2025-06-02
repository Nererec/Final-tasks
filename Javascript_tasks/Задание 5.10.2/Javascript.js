const promoCode = prompt("Введите промокод:");

if (promoCode !== null) { // Проверяем, что пользователь не нажал "Отмена"
    const normalizedPromoCode = promoCode.toLowerCase(); // Приводим к нижнему регистру

    if (normalizedPromoCode === "скидка") {
        alert("Промокод применён");
    } else {
        alert("Промокод не работает");
    }
}