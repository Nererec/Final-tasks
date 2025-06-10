 // Переменные
        const loadImagesButton = document.getElementById('loadImagesButton');
        const galleryContainer = document.getElementById('galleryContainer');
        const loader = document.getElementById('loader');
        const apiUrl = 'https://dog.ceo/api/breeds/image/random/20'; // Используем API с собаками

        // Функция для отображения лоадера
        function showLoader() {
            loader.style.display = 'block';
            loadImagesButton.disabled = true; // Делаем кнопку неактивной во время загрузки
        }

        // Функция для скрытия лоадера
        function hideLoader() {
            loader.style.display = 'none';
            loadImagesButton.disabled = false; // Делаем кнопку активной после загрузки
        }


        // Функция для получения изображений с API
        async function fetchImages() {
            showLoader();

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }

                const data = await response.json();
                let imageUrls = [];

                if (Array.isArray(data.message)) { // Проверяем, что ответ содержит массив изображений (собаки)
                    imageUrls = data.message;
                } else {  // Если другой API
                  imageUrls = [data.url]; //  Предполагаем, что это один объект с свойством 'url'
                }


                // Отрисовка изображений
                imageUrls.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = 'Изображение из галереи';
                    img.classList.add('gallery__image');
                    galleryContainer.appendChild(img);
                });
            } catch (error) {
                console.error('Ошибка при загрузке изображений:', error);
                alert('Произошла ошибка при загрузке изображений. Пожалуйста, попробуйте позже.'); // Показываем сообщение об ошибке пользователю
            } finally {
                hideLoader();
            }
        }

        // Добавляем обработчик события для кнопки
        loadImagesButton.addEventListener('click', fetchImages);