// Плавная смена изображения через fade (для одного элемента)
function switchImageSmoothSingle(imageElement, newSrc) {
    if (!imageElement || !newSrc) return;

    // Убедимся, что у элемента есть transition в CSS: transition: opacity .2s;
    imageElement.style.opacity = '0';

    setTimeout(() => {
        imageElement.src = newSrc;
        imageElement.onload = () => {
            imageElement.style.opacity = '1';
        };
    }, 200);
}

// Переключение для списка изображений
function switchImageSmooth(images, newSrcAttrName) {
    images.forEach(img => {
        const newSrc = img.getAttribute(newSrcAttrName);
        if (newSrc) {
            switchImageSmoothSingle(img, newSrc);
        }
    });
}

// Функция переключения дневного / ночного режима
function toggleDayNightMode(button) {
    const imageId = button.getAttribute('data-image');
    if (!imageId) return;

    // Ищем карточку (если кнопка вложена в карточку)
    const card = button.closest('.collection-card, .collection-card-2, .collection-img-2, .collection');

    // Получаем все изображения с нужным классом внутри карточки или в документе
    let images = [];
    if (card) {
        images = Array.from(card.querySelectorAll(`.${imageId}`));
    }
    if (images.length === 0) {
        images = Array.from(document.querySelectorAll(`.${imageId}`));
    }
    if (images.length === 0) {
        console.warn('Image element(s) not found for', imageId);
        return;
    }

    // Текст кнопки и иконка
    const buttonText = button.querySelector('p');
    const isDayMode = buttonText && buttonText.textContent.trim() === 'Дневной свет';
    const icon = button.querySelector('img');

    // Для первого изображения берём пути (если у каждого изображения путь может быть разный — можно брать у каждого отдельно)
    // Здесь используем атрибуты data-day / data-night у самих <img>
    if (isDayMode) {
        // Переключаем все изображения на ночной (data-night)
        switchImageSmooth(images, 'data-night');

        if (buttonText) buttonText.textContent = 'Уф освещение';
        button.style.border = '1px solid rgb(196,77,255)';
        button.style.boxShadow = '0 0 10px 10px rgba(196,77,255,0.1)';

        // Иконку (берём data-night у иконки, если есть)
        if (icon) {
            const nightIcon = icon.getAttribute('data-night');
            if (nightIcon) icon.src = nightIcon;
            icon.style.width = icon.getAttribute('data-night-width') || '18px';
            icon.style.height = icon.getAttribute('data-night-height') || '25px';
            icon.alt = 'Лунный свет';
        }
    } else {
        // На дневной (data-day)
        switchImageSmooth(images, 'data-day');

        if (buttonText) buttonText.textContent = 'Дневной свет';
        button.style.border = 'none';
        button.style.boxShadow = 'none';

        if (icon) {
            const dayIcon = icon.getAttribute('data-day');
            if (dayIcon) icon.src = dayIcon;
            icon.style.width = icon.getAttribute('data-day-width') || '24px';
            icon.style.height = icon.getAttribute('data-day-height') || '24px';
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