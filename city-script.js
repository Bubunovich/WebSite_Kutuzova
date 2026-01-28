// Функция для переключения режима дневного/ночного света
function toggleDayNightMode(button) {
    // Получаем ID изображения, связанного с этой кнопкой
    const imageId = button.getAttribute('data-image');

    // Ищем картинку внутри той же карточки (collection-card или collection-card-2).
    // Если не найдено — fallback к документу (на всякий случай).
    const card = button.closest('.collection-card, .collection-card-2, .collection-img-2');
    let imageElement = null;
    if (card) {
        imageElement = card.querySelector(`.${imageId}`);
    }
    if (!imageElement) {
        imageElement = document.querySelector(`.${imageId}`);
    }
    if (!imageElement) {
        // ничего не нашли — выходим
        console.warn('Image element not found for', imageId);
        return;
    }

    // Получаем текущий текст кнопки
    const buttonText = button.querySelector('p');
    const isDayMode = buttonText && buttonText.textContent.trim() === 'Дневной свет';

    // Получаем иконку
    const icon = button.querySelector('img');

    // Получаем пути к изображениям из data-атрибутов
    const dayImage = imageElement.getAttribute('data-day');
    const nightImage = imageElement.getAttribute('data-night');

    // Получаем пути к иконкам из data-атрибутов (если есть)
    const dayIcon = icon ? icon.getAttribute('data-day') : null;
    const nightIcon = icon ? icon.getAttribute('data-night') : null;

    // Меняем изображение
    if (isDayMode) {
        // Переключаем на ночной режим (UV/ночь)
        if (nightImage) imageElement.src = nightImage;
        if (buttonText) buttonText.textContent = 'Уф освещение';

        button.style.border = '1px solid rgb(196,77,255)';
        button.style.boxShadow = '0 0 10px 10px rgba(196,77,255,0.1)';

        // Меняем иконку на лунную
        if (icon && nightIcon) {
            icon.src = nightIcon;
            icon.style.width = '18px';
            icon.style.height = '25px';
            icon.alt = 'Лунный свет';
        }
    } else {
        // Переключаем на дневной режим
        if (dayImage) imageElement.src = dayImage;
        if (buttonText) buttonText.textContent = 'Дневной свет';

        button.style.border = 'none';
        button.style.boxShadow = 'none';

        // Меняем иконку на солнечную
        if (icon && dayIcon) {
            icon.src = dayIcon;
            icon.style.width = '24px';
            icon.style.height = '24px';
            icon.alt = 'Солнечный свет';
        }
    }
}

// Добавляем обработчики событий для всех кнопок
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.collection-light, .collection-light-2').forEach(button => {
        button.addEventListener('click', function() {
            toggleDayNightMode(this);
        });
    });
});
