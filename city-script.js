// Плавная смена изображения через fade
function switchImageSmooth(imageElement, newSrc) {
    if (!imageElement || !newSrc) return;

    imageElement.style.opacity = '0';

    setTimeout(() => {
        imageElement.src = newSrc;

        imageElement.onload = () => {
            imageElement.style.opacity = '1';
        };
    }, 200);
}

// Функция переключения дневного / ночного режима
function toggleDayNightMode(button) {
    // Получаем ID изображения
    const imageId = button.getAttribute('data-image');

    // Ищем карточку
    const card = button.closest('.collection-card, .collection-card-2, .collection-img-2');
    let imageElement = null;

    if (card) {
        imageElement = card.querySelector(`.${imageId}`);
    }

    if (!imageElement) {
        imageElement = document.querySelector(`.${imageId}`);
    }

    if (!imageElement) {
        console.warn('Image element not found for', imageId);
        return;
    }

    // Текст кнопки
    const buttonText = button.querySelector('p');
    const isDayMode = buttonText && buttonText.textContent.trim() === 'Дневной свет';

    // Иконка
    const icon = button.querySelector('img');

    // Пути к изображениям
    const dayImage = imageElement.getAttribute('data-day');
    const nightImage = imageElement.getAttribute('data-night');

    // Пути к иконкам
    const dayIcon = icon ? icon.getAttribute('data-day') : null;
    const nightIcon = icon ? icon.getAttribute('data-night') : null;

    // Переключение режимов
    if (isDayMode) {
        // Ночной режим
        if (nightImage) switchImageSmooth(imageElement, nightImage);
        if (buttonText) buttonText.textContent = 'Уф освещение';

        button.style.border = '1px solid rgb(196,77,255)';
        button.style.boxShadow = '0 0 10px 10px rgba(196,77,255,0.1)';

        if (icon && nightIcon) {
            icon.src = nightIcon;
            icon.style.width = '18px';
            icon.style.height = '25px';
            icon.alt = 'Лунный свет';
        }
    } else {
        // Дневной режим
        if (dayImage) switchImageSmooth(imageElement, dayImage);
        if (buttonText) buttonText.textContent = 'Дневной свет';

        button.style.border = 'none';
        button.style.boxShadow = 'none';

        if (icon && dayIcon) {
            icon.src = dayIcon;
            icon.style.width = '24px';
            icon.style.height = '24px';
            icon.alt = 'Солнечный свет';
        }
    }
}

// Назначаем обработчики кнопкам
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.collection-light, .collection-light-2').forEach(button => {
        button.addEventListener('click', function () {
            toggleDayNightMode(this);
        });
    });
});