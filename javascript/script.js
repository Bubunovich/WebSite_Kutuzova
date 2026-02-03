function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    const firstCard = document.querySelector('.project-card');
    
    // Устанавливаем статус "Активен" для первой карточки навсегда
    if (firstCard) {
        const firstStatus = firstCard.querySelector('.status');
        if (firstStatus) {
            firstStatus.textContent = 'Активен';
            firstStatus.classList.add('active');
            firstStatus.classList.remove('completed');
            
            // Делаем статус первой карточки неизменяемым
            firstStatus.setAttribute('data-fixed', 'true');
        }
    }
    
    // Для остальных карточек устанавливаем статус "Завершено"
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
            
            // Снимаем активное состояние со всех карточек (кроме фиксированного статуса первой)
            projectCards.forEach(card => {
                card.classList.remove('active');
                
                // Меняем статус только у тех карточек, которые не являются первой
                const status = card.querySelector('.status');
                if (status && !status.hasAttribute('data-fixed')) {
                    status.textContent = 'Завершено';
                    status.classList.remove('active');
                    status.classList.add('completed');
                }
            });
            
            // Устанавливаем активное состояние для выбранной карточки
            this.classList.add('active');
            
            // Скрываем все контенты и оверлеи
            document.querySelectorAll('.project-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelectorAll('.image-overlay').forEach(overlay => {
                overlay.classList.remove('active');
            });
            
            // Показываем соответствующий контент и оверлей
            const content = document.getElementById(`${projectId}-content`);
            const overlay = document.getElementById(`${projectId}-overlay`);
            if (content) content.classList.add('active');
            if (overlay) overlay.classList.add('active');
            
            // Обновляем изображение
            const imageContainer = document.querySelector('.project-image img');
            const projectImages = {
                'energy': '/resources/energy-image.png',
                'luminis': '/resources/luminis-image.png',
                'luminescence': '/resources/luminescence-image.png',
                'skolkovo': '/resources/skolkovo-image.png',
                'neon': '/resources/neon-image.png',
                'neformat': '/resources/neformat-image.png'
            };
            
            if (projectImages[projectId]) {
                imageContainer.src = projectImages[projectId];
                imageContainer.alt = this.querySelector('h3').textContent;
            }
        });
    });
    
    // Активируем первую карточку по умолчанию
    if (firstCard) {
        const firstProjectId = firstCard.dataset.project;
        
        // Устанавливаем активный класс для первой карточки
        firstCard.classList.add('active');
        
        // Показываем контент первой карточки
        document.getElementById(`${firstProjectId}-content`).classList.add('active');
        document.getElementById(`${firstProjectId}-overlay`).classList.add('active');
    }
}




document.addEventListener('DOMContentLoaded', () => {
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

    // Инициализация начального состояния
    header.style.position = 'fixed';
    header.style.top = '0';

    setTimeout(() => {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        
        document.body.style.transition = 'background-image 0.5s ease';
        document.body.style.backgroundImage = 'url(' + imageUrlDark + ')';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';
        
        setTimeout(() => {
            center_container.remove();
            
            setTimeout(() => {
                // Первый этап анимации (светлый фон)
                document.body.style.transition = 'background-image 1.5s ease';
                header.style.transition = 'all 1.5s ease';
                nameBlock.style.transition = 'all 1.5s ease';
                container_h1.style.transition = 'all 1.5s ease';
                lang.style.transition = 'all 1.5s ease';
                langImg.style.transition = 'all 1.5s ease';
                
                navLinks.forEach(link => {
                    link.style.transition = 'color 1.5s ease';
                });
                
                document.body.style.backgroundImage = 'url(' + imageUrlLight + ')';
                header.style.backgroundColor = 'rgba(10, 8, 20, 0.2)';
                header.style.color = '#000';
                container_h1.style.color = '#000';
                lang.style.color = '#000';
                langImg.src = imageLangDark;
                nameBlock.style.backgroundColor = 'rgba(164,135,88,0.77)';

                navLinks.forEach(link => {
                    link.style.color = '#000';
                });

                setTimeout(() => {
                    // Второй этап анимации (темный фон)
                    document.body.style.transition = 'background-image 1.5s ease';
                    header.style.transition = 'all 1.5s ease, top 0s ease 1.5s'; // Добавлено управление позицией
                    nameBlock.style.transition = 'opacity 0.5s ease';
                    container_h1.style.transition = 'all 1.5s ease';
                    lang.style.transition = 'all 1.5s ease';
                    langImg.style.transition = 'all 1.5s ease';
                    
                    navLinks.forEach(link => {
                        link.style.transition = 'color 1.5s ease';
                    });

                    document.body.style.backgroundImage = "none";
                    document.body.style.background = "repeating-linear-gradient(to bottom,rgba(15, 12, 41, 0.3) 0vh,rgba(48, 43, 99, 0.3) 50vh,rgba(15, 12, 41, 0.3) 100vh),rgb(19, 15, 39)";
                    header.style.backgroundColor = 'rgba(0, 0, 0)';
                    container_h1.style.color = '#fff';
                    lang.style.color = '#fff';
                    langImg.src = imageLangLight;

                    navLinks.forEach(link => {
                        link.style.color = '#fff';
                    });
                    
                    nameBlock.style.opacity = '0';
                    nameBlock.remove();
                    
                    setTimeout(() => {
                        header.style.position = 'relative';
                        mainContent.style.transition = 'opacity 1s ease';
                        mainContent.style.opacity = '1';
                        footer.style.transition = 'opacity 1s ease';
                        footer.style.opacity = '1';

                    }, 500);

                }, 3000);

            }, 1000);

        }, 500);
        
    }, 3000);
    
    setTimeout(initProjectCards, 3500);
});

    // ——— Мобильное бургер-меню ———
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerIcon = document.querySelector('.burger-icon');
    const nav = document.querySelector('.nav');

    if (burgerMenu && burgerIcon && nav) {
        burgerMenu.addEventListener('click', () => {
            burgerIcon.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // При клике по ссылке меню закрывается
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burgerIcon.classList.remove('active');
            });
        });
    }
