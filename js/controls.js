// Управление дверью
document.addEventListener('DOMContentLoaded', function() {
    const door = document.getElementById('mainDoor');
    if (door) {
        door.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
            // Можно добавить звук открытия
            // const audio = new Audio('door.wav');
            // audio.play();
        });
    }

    // Анимация пламени
    function animateFlame() {
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
            const delay = index * 0.3;
            const duration = 1.2 + Math.random() * 0.8;
            flame.style.animation = `burn ${duration}s ${delay}s infinite alternate`;
        });
    }

    // Снег за окном
    function createSnow() {
        const view = document.querySelector('.window-view');
        if (!view) return;
        // Проверяем, есть ли уже снег
        if (view.querySelector('.snowflake')) return;
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.top = Math.random() * 100 + '%';
            snowflake.style.width = (2 + Math.random() * 6) + 'px';
            snowflake.style.height = snowflake.style.width;
            snowflake.style.background = 'white';
            snowflake.style.borderRadius = '50%';
            snowflake.style.position = 'absolute';
            snowflake.style.opacity = 0.2 + Math.random() * 0.5;
            snowflake.style.animation = `snowFall ${15 + Math.random() * 20}s linear infinite`;
            snowflake.style.animationDelay = Math.random() * 20 + 's';
            view.appendChild(snowflake);
        }
    }

    // Добавляем снежинки в DOM
    const style = document.createElement('style');
    style.textContent = `
        .snowflake {
            position: absolute;
            background: white;
            border-radius: 50%;
            pointer-events: none;
        }
        @keyframes snowFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 0.8; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0.2; }
        }
        .window-view {
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(style);

    // Запуск
    createSnow();
    animateFlame();

    // Дополнительная интерактивность: клик по камину
    const fireplace = document.querySelector('.fireplace');
    if (fireplace) {
        fireplace.addEventListener('click', function() {
            const flames = this.querySelectorAll('.flame');
            flames.forEach(flame => {
                if (flame.style.opacity === '0') {
                    flame.style.opacity = '0.8';
                } else {
                    flame.style.opacity = '0';
                }
            });
        });
    }

    console.log('🏠 Комната Алисии загружена. Добро пожаловать в Nexus!');
});
