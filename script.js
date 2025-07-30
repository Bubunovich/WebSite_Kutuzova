document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const center_container = document.querySelector('.center-container');
    const header = document.querySelector('.header');
    const container_h1 = document.querySelector('.container h1');
    const nameBlock = document.querySelector('.name-block');
    const navLinks = document.querySelectorAll('.nav a');
    const lang = document.querySelector('.lang');
    const langImg = document.querySelector('.lang img');
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');
    const mainContent = document.querySelector('.main-content');
    
    const imageUrlDark = 'resources/dark-art-image.png';
    const imageUrlLight = 'resources/light-art-image.png';
    const imageLangDark = 'resources/dark-language-image.png';
    const imageLangLight = 'resources/light-language-image.png';

    // Инициализация начального состояния
    header.style.position = 'fixed';
    header.style.top = '0';
    mainContent.style.marginTop = header.offsetHeight + 'px';

    setTimeout(() => {
        loader.style.transition = 'opacity 0.5s ease';
        loader.style.opacity = '0';
        
        document.body.style.transition = 'background-image 0.5s ease';
        document.body.style.backgroundImage = "url('" + imageUrlDark + "')";
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
                
                document.body.style.backgroundImage = "url('" + imageUrlLight + "')";
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

                    document.body.style.backgroundImage = 'none';
                    document.body.style.backgroundColor = 'rgb(19, 15, 39)';
                    header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    container_h1.style.color = '#fff';
                    lang.style.color = '#fff';
                    langImg.src = imageLangLight;

                    navLinks.forEach(link => {
                        link.style.color = '#fff';
                    });
                    
                    nameBlock.style.opacity = '0';
                    nameBlock.remove();
                    
                    setTimeout(() => {
                        
                        header.style.position = 'absolute';
                        header.style.top = window.scrollY + 'px';
                        
                        setTimeout(() => {
                            header.style.position = 'static';
                            mainContent.style.marginTop = '0';
                            header.style.transition = 'all 1.5s ease';
                            
                            // Анимация боковых панелей
                            leftPanel.style.transition = 'all 1.2s ease';
                            rightPanel.style.transition = 'all 1.2s ease 0.2s';

                            leftPanel.style.opacity = '1';
                            leftPanel.style.transform = 'translateX(0)';

                            rightPanel.style.opacity = '1';
                            rightPanel.style.transform = 'translateX(0)';
                            
                        }, 100);
                        
                    }, 500);

                }, 3000);

            }, 1000);

        }, 500);
        
    }, 3000);
});