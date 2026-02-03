// light-switcher.js — автономный модуль управления "Дневной / Уф" кнопками

// ---------- Плавная смена изображения (fade) ----------
function switchImageSmoothSingle(imageElement, newSrc) {
    if (!imageElement || !newSrc) return;
    imageElement.style.transition = imageElement.style.transition || 'opacity .22s ease';
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = newSrc;
        imageElement.onload = () => {
            imageElement.style.opacity = '1';
        };
    }, 180);
}

function switchImageSmooth(images, newSrcAttrName) {
    images.forEach(img => {
        const newSrc = img.getAttribute(newSrcAttrName);
        if (newSrc) switchImageSmoothSingle(img, newSrc);
    });
}

// ---------- Вспомогательные функции ----------
function getRelatedImages(button) {
    const imageId = button.getAttribute('data-image');
    if (!imageId) return [];
    const card = button.closest('.collection-card, .collection-card-2, .collection, .collections-content, main');
    let images = [];
    if (card) images = Array.from(card.querySelectorAll(`.${imageId}`));
    if (!images.length) images = Array.from(document.querySelectorAll(`.${imageId}`));
    return images;
}

function hexToRgba(hex, alpha = 1) {
    const h = (hex || '#000').replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
}

function clearTextColor(button) {
    const p = button.querySelector('p');
    if (p) p.style.color = '';
}

// ---------- Визуальные эффекты кнопки ----------
function applyButtonVisual(button, mode) {
    const p = button.querySelector('p');
    const icon = button.querySelector('img');

    if (mode === 'day') {
        if (p) { p.textContent = 'Дневной свет'; p.style.transition = p.style.transition || 'color .18s ease'; p.style.color = ''; }
        if (icon && icon.getAttribute('data-day')) icon.src = icon.getAttribute('data-day');
        button.style.boxShadow = 'none';
        button.style.border = 'none';
        if (icon) {
            icon.style.width = icon.getAttribute('data-day-width') || '24px';
            icon.style.height = icon.getAttribute('data-day-height') || '24px';
            icon.alt = 'Солнечный свет';
        }
    } else {
        if (p) { p.textContent = 'Уф освещение'; p.style.transition = p.style.transition || 'color .18s ease'; p.style.color = ''; }
        if (icon && icon.getAttribute('data-night')) icon.src = icon.getAttribute('data-night');
        button.style.boxShadow = '0 0 10px 10px rgba(196,77,255,0.1)';
        button.style.border = '1px solid rgb(196,77,255)';
        if (icon) {
            icon.style.width = icon.getAttribute('data-night-width') || '18px';
            icon.style.height = icon.getAttribute('data-night-height') || '25px';
            icon.alt = 'Лунный свет';
        }
    }
}

// подсветка рамки и тени, опционально — цвет текста и иконка
function applyButtonHighlight(button, colorHex, setTextColor = false, iconOverrideSrc = null) {
    button.style.boxShadow = `0 0 12px 6px ${hexToRgba(colorHex, 0.12)}`;
    button.style.border = `1px solid ${colorHex}`;
    if (setTextColor) {
        const p = button.querySelector('p');
        if (p) p.style.color = colorHex;
    }
    if (iconOverrideSrc) {
        const icon = button.querySelector('img');
        if (icon) icon.src = iconOverrideSrc;
    }
}

// ---------- Логика переключения / hover ----------
function applyModeToImages(images, mode) {
    if (!images || !images.length) return;
    const attr = mode === 'day' ? 'data-day' : 'data-night';
    switchImageSmooth(images, attr);
}

function toggleModeOnClick(button) {
    const current = button.getAttribute('data-mode') || 'day';
    const next = current === 'day' ? 'night' : 'day';
    button.setAttribute('data-mode', next);
    applyButtonVisual(button, next);
    const images = getRelatedImages(button);
    applyModeToImages(images, next);
}

function attachHoverAndClickBehavior(button) {
    if (!button) return;

    if (!button.hasAttribute('data-mode')) {
        const p = button.querySelector('p');
        const text = p ? p.textContent.trim() : '';
        const startMode = (text === 'Уф освещение') ? 'night' : 'day';
        button.setAttribute('data-mode', startMode);
    }

    const initialMode = button.getAttribute('data-mode') || 'day';
    applyButtonVisual(button, initialMode);
    applyModeToImages(getRelatedImages(button), initialMode);

    let hoverActive = false;

    button.addEventListener('mouseenter', () => {
        hoverActive = true;
        const pinned = button.getAttribute('data-mode') || 'day';
        const temp = (pinned === 'day') ? 'night' : 'day';

        // Если закреплён night и hover показывает day — подсветка золотом + смена иконки на yellow-sun
        if (pinned === 'night' && temp === 'day') {
            applyButtonVisual(button, 'day'); // дневной вид (иконка станет data-day, затем мы перезапишем на yellow)
            // путь к вашей иконке (замените, если в другом месте)
            const yellowIconPath = '/icons/yellow-sun.png';
            applyButtonHighlight(button, '#FFCC33', true, yellowIconPath);
        } else {
            // иначе — показываем ночной preview (фиолет)
            applyButtonVisual(button, 'night');
        }

        applyModeToImages(getRelatedImages(button), temp);
    });

    button.addEventListener('mouseleave', () => {
        if (!hoverActive) return;
        hoverActive = false;
        const pinned = button.getAttribute('data-mode') || 'day';
        applyButtonVisual(button, pinned);
        clearTextColor(button);
        applyModeToImages(getRelatedImages(button), pinned);
    });

    button.addEventListener('click', (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        toggleModeOnClick(button);
    });
}

// ---------- Инициализация модуля ----------
function initCollectionLightControls() {
    const buttons = Array.from(document.querySelectorAll('.collection-light, .collection-light-2'));
    buttons.forEach(btn => attachHoverAndClickBehavior(btn));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCollectionLightControls);
} else {
    initCollectionLightControls();
}
