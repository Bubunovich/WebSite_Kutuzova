function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            
            // Снимаем активное состояние со всех карточек
            projectCards.forEach(card => {
                card.classList.remove('active');
                const status = card.querySelector('.status');
                if (status) {
                    status.textContent = 'Завершено';
                    status.classList.remove('active');
                    status.classList.add('completed');
                }
            });
            
            // Устанавливаем активное состояние для выбранной карточки
            this.classList.add('active');
            const currentStatus = this.querySelector('.status');
            if (currentStatus) {
                currentStatus.textContent = 'Активен';
                currentStatus.classList.remove('completed');
                currentStatus.classList.add('active');
            }
            
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
                'energy': 'resources/energy-image.png',
                'luminis': 'resources/luminis-image.png',
                'luminescence': 'resources/luminescence-image.png',
                'skolkovo': 'resources/skolkovo-image.png',
                'neon': 'resources/neon-image.png',
                'neformat': 'resources/neformat-image.png'
            };
            
            if (projectImages[projectId]) {
                imageContainer.src = projectImages[projectId];
                imageContainer.alt = this.querySelector('h3').textContent;
            }
        });
    });
    
    // Активируем первую карточку по умолчанию
    const firstCard = document.querySelector('.project-card.active');
    if (firstCard) {
        const firstProjectId = firstCard.dataset.project;
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
    
    const imageUrlDark = 'resources/dark-art-image.png';
    const imageUrlLight = 'resources/light-art-image.png';
    const imageLangDark = 'resources/dark-language-image.png';
    const imageLangLight = 'resources/light-language-image.png';

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
                    document.body.style.backgroundColor = "rgb(10, 8, 20);";
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
                        
                    }, 500);

                }, 3000);

            }, 1000);

        }, 500);
        
    }, 3000);
    
    setTimeout(initProjectCards, 3500);
});