// ------------------ Инициализация карточек проектов ------------------
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const firstCard = document.querySelector('.project-card');
    
    if (firstCard) {
        const firstStatus = firstCard.querySelector('.status');
        if (firstStatus) {
            firstStatus.textContent = 'Активен';
            firstStatus.classList.add('active');
            firstStatus.classList.remove('completed');
            firstStatus.setAttribute('data-fixed', 'true');
        }
    }
    
    projectCards.forEach((card, index) => {
        if (index !== 0) {
            const status = card.querySelector('.status');
            if (status) {
                status.textContent = 'Завершено';
                status.classList.remove('active');
                status.classList.add('completed');
            }
        }
    });
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            projectCards.forEach(c => {
                c.classList.remove('active');
                const s = c.querySelector('.status');
                if (s && !s.hasAttribute('data-fixed')) {
                    s.textContent = 'Завершено';
                    s.classList.remove('active');
                    s.classList.add('completed');
                }
            });
            this.classList.add('active');

            document.querySelectorAll('.project-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.image-overlay').forEach(overlay => overlay.classList.remove('active'));

            const content = document.getElementById(`${projectId}-content`);
            const overlay = document.getElementById(`${projectId}-overlay`);
            if (content) content.classList.add('active');
            if (overlay) overlay.classList.add('active');

            const imageContainer = document.querySelector('.project-image img');
            const projectImages = {
                'energy': '/resources/energy-image.png',
                'luminis': '/resources/luminis-image.png',
                'luminescence': '/resources/luminescence-image.png',
                'skolkovo': '/resources/skolkovo-image.png',
                'neon': '/resources/neon-image.png',
                'neformat': '/resources/neformat-image.png'
            };
            if (projectImages[projectId] && imageContainer) {
                imageContainer.src = projectImages[projectId];
                const title = this.querySelector('h3');
                imageContainer.alt = title ? title.textContent : '';
            }
        });
    });
    
    if (firstCard) {
        const firstProjectId = firstCard.dataset.project;
        firstCard.classList.add('active');
        const firstContent = document.getElementById(`${firstProjectId}-content`);
        const firstOverlay = document.getElementById(`${firstProjectId}-overlay`);
        if (firstContent) firstContent.classList.add('active');
        if (firstOverlay) firstOverlay.classList.add('active');
    }
}

// ------------------ Intro control (single-run + pageshow-safe) ------------------
(function() {
    const loader = document.querySelector('.loader');
    const center_container = document.querySelector('.center-container');
    const header = document.querySelector('.header');
    const container_h1 = document.querySelector('.container h1');
    const nameBlock = document.querySelector('.name-block');
    const navLinks = document.querySelectorAll('.nav a');
    const lang = document.querySelector('.lang');
    const langImg = document.querySelector('.lang img');
    const mainContent = document.getElementById('main-content');
    const footer = document.querySelector('.footer');

    const imageUrlDark = '/resources/dark-art-image.png';
    const imageUrlLight = '/resources/light-art-image.png';
    const imageLangDark = '/resources/dark-language-image.png';
    const imageLangLight = '/resources/light-language-image.png';

    // Состояние: чтобы не запускать runIntro параллельно дважды
    let introRunning = false;

    // Отключаем CSS-анимации и ставим финальное отображение страницы (без интро)
    function setFinalStateWithoutIntro() {
        // Отключаем анимации у ключевых элементов чтобы ничего не мерцало
        if (loader) {
            loader.style.animation = 'none';
            loader.style.transition = 'none';
            loader.style.opacity = '0';
            loader.style.display = 'none';
        }

        if (center_container && center_container.parentNode) {
            center_container.parentNode.removeChild(center_container);
        }

        if (nameBlock) {
            nameBlock.style.animation = 'none';
            nameBlock.style.transition = 'none';
            // Скрываем и удаляем
            nameBlock.style.opacity = '0';
            if (nameBlock.parentNode) nameBlock.parentNode.removeChild(nameBlock);
        }

        // Тело и header — финальный стиль
        document.body.style.transition = 'none';
        document.body.style.backgroundImage = 'none';
        document.body.style.background = "repeating-linear-gradient(to bottom,rgba(15, 12, 41, 0.3) 0vh,rgba(48, 43, 99, 0.3) 50vh,rgba(15, 12, 41, 0.3) 100vh),rgb(19, 15, 39)";

        if (header) {
            header.style.animation = 'none';
            header.style.transition = 'none';
            header.style.opacity = '1';
            header.style.position = 'relative';
            header.style.backgroundColor = 'rgba(0,0,0)';
            header.style.top = '';
        }

        if (container_h1) container_h1.style.color = '#fff';
        if (lang) lang.style.color = '#fff';
        if (langImg) langImg.src = imageLangLight;

        if (mainContent) {
            mainContent.style.transition = 'none';
            mainContent.style.opacity = '1';
        }
        if (footer) {
            footer.style.transition = 'none';
            footer.style.opacity = '1';
        }

        navLinks.forEach(link => {
            link.style.transition = 'none';
            link.style.color = '#fff';
        });

        // Инициализация карточек
        try { initProjectCards(); } catch (e) { console.warn('initProjectCards failed:', e); }
    }

    // Основная последовательность интро
    function runIntro() {
        if (introRunning) return;
        introRunning = true;

        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
        }

        // Начальная задержка (loader виден)
        setTimeout(() => {
            if (loader) {
                loader.style.transition = 'opacity 0.5s ease';
                loader.style.opacity = '0';
            }

            // Ставим временный фон (dark)
            document.body.style.transition = 'background-image 0.5s ease';
            document.body.style.backgroundImage = 'url(' + imageUrlDark + ')';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';

            setTimeout(() => {
                if (center_container && center_container.parentNode) center_container.parentNode.removeChild(center_container);

                // Небольшая пауза, затем первый этап (светлый фон)
                setTimeout(() => {
                    document.body.style.transition = 'background-image 1.5s ease';
                    if (header) header.style.transition = 'all 1.5s ease';
                    if (nameBlock) nameBlock.style.transition = 'all 1.5s ease';
                    if (container_h1) container_h1.style.transition = 'all 1.5s ease';
                    if (lang) lang.style.transition = 'all 1.5s ease';
                    if (langImg) langImg.style.transition = 'all 1.5s ease';
                    navLinks.forEach(link => link.style.transition = 'color 1.5s ease');

                    document.body.style.backgroundImage = 'url(' + imageUrlLight + ')';
                    if (header) header.style.backgroundColor = 'rgba(10, 8, 20, 0.2)';
                    if (header) header.style.color = '#000';
                    if (container_h1) container_h1.style.color = '#000';
                    if (lang) lang.style.color = '#000';
                    if (langImg) langImg.src = imageLangDark;
                    if (nameBlock) nameBlock.style.backgroundColor = 'rgba(164,135,88,0.77)';
                    navLinks.forEach(link => link.style.color = '#000');

                    // Второй этап — затемнение и удаление nameBlock
                    setTimeout(() => {
                        document.body.style.transition = 'background-image 1.5s ease';
                        if (header) header.style.transition = 'all 1.5s ease, top 0s ease 1.5s';
                        if (nameBlock) nameBlock.style.transition = 'opacity 0.5s ease';
                        if (container_h1) container_h1.style.transition = 'all 1.5s ease';
                        if (lang) lang.style.transition = 'all 1.5s ease';
                        if (langImg) langImg.style.transition = 'all 1.5s ease';
                        navLinks.forEach(link => link.style.transition = 'color 1.5s ease');

                        document.body.style.backgroundImage = "none";
                        document.body.style.background = "repeating-linear-gradient(to bottom,rgba(15, 12, 41, 0.3) 0vh,rgba(48, 43, 99, 0.3) 50vh,rgba(15, 12, 41, 0.3) 100vh),rgb(19, 15, 39)";
                        if (header) header.style.backgroundColor = 'rgba(0, 0, 0)';
                        if (container_h1) container_h1.style.color = '#fff';
                        if (lang) lang.style.color = '#fff';
                        if (langImg) langImg.src = imageLangLight;
                        navLinks.forEach(link => link.style.color = '#fff');

                        // Плавно скрываем nameBlock и затем удаляем
                        if (nameBlock) {
                            nameBlock.style.opacity = '0';
                            setTimeout(() => {
                                if (nameBlock.parentNode) nameBlock.parentNode.removeChild(nameBlock);
                            }, 450);
                        }

                        setTimeout(() => {
                            if (header) header.style.position = 'relative';
                            if (mainContent) { mainContent.style.transition = 'opacity 1s ease'; mainContent.style.opacity = '1'; }
                            if (footer) { footer.style.transition = 'opacity 1s ease'; footer.style.opacity = '1'; }

                            // Записываем флаг в sessionStorage (одна сессия)
                            try {
                                sessionStorage.setItem('introPlayed', 'true');
                                // Если хотите навсегда: localStorage.setItem('introPlayed','true');
                            } catch (e) {
                                console.warn('storage set error', e);
                            }

                            try { initProjectCards(); } catch (e) { console.warn('initProjectCards failed:', e); }

                            introRunning = false;
                        }, 500);

                    }, 3000);

                }, 1000);

            }, 500);

        }, 3000);
    }

    // boot — проверяет флаг и запускает либо интро, либо сразу финальное состояние
    function boot() {
        let played = false;
        try {
            played = sessionStorage.getItem('introPlayed') === 'true';
            // Для постоянного хранения между сессиями используйте localStorage:
            // played = localStorage.getItem('introPlayed') === 'true';
        } catch (e) {
            console.warn('Storage check failed:', e);
            played = false;
        }

        if (played) {
            // отключаем CSS-анимации и ставим финальное состояние
            // (это предотвращает мерцание/появление nameBlock)
            if (loader) loader.style.animation = 'none';
            if (header) header.style.animation = 'none';
            if (nameBlock) nameBlock.style.animation = 'none';
            setFinalStateWithoutIntro();
        } else {
            runIntro();
        }
    }

    // pageshow для bfcache: если страница восстановлена из кэша или интро уже пройдено — ставим финальное состояние
    window.addEventListener('pageshow', function (e) {
        let played = false;
        try { played = sessionStorage.getItem('introPlayed') === 'true'; } catch (err) { played = false; }

        if (e.persisted || played) {
            // Если пришли из bfcache или интро уже отмечено — сразу финальное состояние
            if (loader) loader.style.animation = 'none';
            if (header) header.style.animation = 'none';
            if (nameBlock) nameBlock.style.animation = 'none';
            setFinalStateWithoutIntro();
        } else {
            // иначе — запускаем проверку/интро
            boot();
        }
    });

    // Поскольку скрипт подключён внизу body, можно запускать boot прямо сейчас
    // (вариант с DOMContentLoaded не нужен, но можно оставить, если скрипт может загружаться в head)
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        boot();
    } else {
        document.addEventListener('DOMContentLoaded', boot);
    }

})(); // IIFE end

// ------------------ Остальной код (например, переключение света, бургер-меню) ------------------
// Переключение дневного/ночного света для коллекций (если у вас есть)
function switchImageSmoothSingle(imageElement, newSrc) {
    if (!imageElement || !newSrc) return;
    imageElement.style.transition = 'opacity .22s ease';
    imageElement.style.opacity = '0';
    setTimeout(() => {
        imageElement.src = newSrc;
        imageElement.onload = () => {
            imageElement.style.opacity = '1';
        };
    }, 180);
}

function toggleDayNightMode(button) {
    if (!button) return;
    const dataImage = button.getAttribute('data-image');
    if (!dataImage) return;
    const section = button.closest('.row, .collection, .collections-content, main') || document;
    let images = Array.from(section.querySelectorAll(`.${dataImage}`));
    if (!images.length) images = Array.from(document.querySelectorAll(`.${dataImage}`));
    if (!images.length) return;

    const textP = button.querySelector('p');
    const isDay = textP && textP.textContent.trim() === 'Дневной свет';
    const icon = button.querySelector('img');

    images.forEach(img => {
        const daySrc = img.getAttribute('data-day');
        const nightSrc = img.getAttribute('data-night');
        if (isDay && nightSrc) switchImageSmoothSingle(img, nightSrc);
        if (!isDay && daySrc) switchImageSmoothSingle(img, daySrc);
    });

    if (isDay) {
        if (textP) textP.textContent = 'Уф освещение';
        if (icon && icon.getAttribute('data-night')) icon.src = icon.getAttribute('data-night');
        button.style.boxShadow = '0 0 10px 6px rgba(196,77,255,0.06)';
        button.style.border = '1px solid rgba(196,77,255,0.25)';
    } else {
        if (textP) textP.textContent = 'Дневной свет';
        if (icon && icon.getAttribute('data-day')) icon.src = icon.getAttribute('data-day');
        button.style.boxShadow = 'none';
        button.style.border = 'none';
    }
}

// Делегируем клики для .collection-light
document.addEventListener('click', function (e) {
    const btn = e.target.closest('.collection-light, .collection-light-2');
    if (btn) toggleDayNightMode(btn);
});

// Бургер-меню (как было)
(function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger-icon');
    const nav = document.querySelector('.nav');

    if (burgerMenu && burgerIcon && nav) {
        burgerMenu.addEventListener('click', () => {
            burgerIcon.classList.toggle('active');
            nav.classList.toggle('active');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burgerIcon.classList.remove('active');
            });
        });
    }
})();
