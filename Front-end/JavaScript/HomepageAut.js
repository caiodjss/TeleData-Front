document.addEventListener("DOMContentLoaded", function () {
    // Configuração do carrossel de depoimentos
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".testimonial-item");
    const indicators = document.querySelectorAll(".indicator");
    const testimonialArrows = document.querySelectorAll(".testimonial-arrow");
    const itemWidth = items[0].offsetWidth + 30; // Largura do item + gap
    let currentIndex = 0;
    let autoSlideInterval;

    // Função para mover o carrossel para um índice específico
    function moveToIndex(index) {
        // Garante que o índice esteja dentro dos limites
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;

        // Atualiza o índice atual
        currentIndex = index;

        // Move o track para mostrar o item atual
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Atualiza os indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === currentIndex);
        });
    }

    // Inicia o slideshow automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            moveToIndex(currentIndex + 1);
        }, 8000); // Muda a cada 8 segundos
    }

    // Para o slideshow automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Adiciona eventos de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            stopAutoSlide();
            moveToIndex(index);
            startAutoSlide();
        });
    });

    // Adiciona eventos de clique às setas
    testimonialArrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            stopAutoSlide();
            if (arrow.classList.contains("testimonial-arrow-left")) {
                moveToIndex(currentIndex - 1);
            } else {
                moveToIndex(currentIndex + 1);
            }
            startAutoSlide();
        });
    });

    // Pausa o slideshow quando o mouse está sobre o carrossel
    const carousel = document.querySelector(".testimonial-carousel");
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Inicia o carrossel automático
    startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".categories-carousel");
    const arrows = document.querySelectorAll(".carousel-arrow");
    const cards = document.querySelectorAll(".category-card");
    const cardWidth =
        cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);

    let currentPosition = 0;
    let maxVisibleCards = Math.floor(carousel.offsetWidth / cardWidth);
    let maxPosition = (cards.length - maxVisibleCards) * cardWidth;

    // Função para atualizar a posição do carrossel
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Função para navegar para a esquerda
    function moveLeft() {
        currentPosition = Math.max(0, currentPosition - cardWidth);
        updateCarouselPosition();
    }

    // Função para navegar para a direita
    function moveRight() {
        currentPosition = Math.min(maxPosition, currentPosition + cardWidth);
        updateCarouselPosition();
    }

    // Eventos para as setas
    arrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            if (arrow.classList.contains("carousel-arrow-left")) {
                moveLeft();
            } else {
                moveRight();
            }
        });
    });

    // Atualizar maxPosition quando a janela for redimensionada
    window.addEventListener("resize", function () {
        maxVisibleCards = Math.floor(carousel.offsetWidth / cardWidth);
        maxPosition = Math.max(0, (cards.length - maxVisibleCards) * cardWidth);
        currentPosition = Math.min(currentPosition, maxPosition);
        updateCarouselPosition();
    });

    // Inicializar a posição do carrossel
    updateCarouselPosition();
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".courses-carousel");
    const cards = document.querySelectorAll(".course-card");
    const courseArrows = document.querySelectorAll(".course-arrow");
    let cardWidth =
        cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);

    let currentPosition = 0;
    let autoSlideInterval;
    const slideDuration = 16000; // 16 segundos

    // Função para mover o carrossel
    function moveCarousel() {
        const containerWidth = carousel.parentElement.offsetWidth;
        const totalWidth = carousel.scrollWidth;

        // Verifica se chegou ao final
        if (currentPosition + containerWidth >= totalWidth) {
            currentPosition = 0; // Volta para o início
        } else {
            currentPosition += cardWidth; // Move para o próximo card
        }

        carousel.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Função para navegar manualmente
    function moveCarouselManual(direction) {
        const containerWidth = carousel.parentElement.offsetWidth;
        const totalWidth = carousel.scrollWidth;

        if (direction === "left") {
            currentPosition = Math.max(0, currentPosition - cardWidth);
        } else {
            if (currentPosition + containerWidth >= totalWidth) {
                currentPosition = 0; // Volta para o início se estiver no final
            } else {
                currentPosition = Math.min(
                    totalWidth - containerWidth,
                    currentPosition + cardWidth
                );
            }
        }

        carousel.style.transform = `translateX(-${currentPosition}px)`;
    }

    // Iniciar o carrossel automático
    function startAutoSlide() {
        autoSlideInterval = setInterval(moveCarousel, slideDuration);
    }

    // Parar o carrossel automático
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Eventos para as setas dos cursos
    courseArrows.forEach((arrow) => {
        arrow.addEventListener("click", () => {
            stopAutoSlide();
            if (arrow.classList.contains("course-arrow-left")) {
                moveCarouselManual("left");
            } else {
                moveCarouselManual("right");
            }
            // Reinicia o auto slide após um tempo
            setTimeout(startAutoSlide, 15000);
        });
    });

    // Pausar quando o mouse estiver sobre o carrossel
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    // Iniciar o carrossel
    startAutoSlide();

    // Atualizar quando a janela for redimensionada
    window.addEventListener("resize", function () {
        // Recálculo para ajustar às novas dimensões
        const newCardWidth =
            cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);
        currentPosition =
            Math.round(currentPosition / cardWidth) * newCardWidth;
        cardWidth = newCardWidth;
        carousel.style.transform = `translateX(-${currentPosition}px)`;
    });
});

// Interações opcionais para os cards de curso
document.addEventListener("DOMContentLoaded", function () {
    // Efeito de hover mais suave
    const courseCards = document.querySelectorAll(".course-card");

    courseCards.forEach((card) => {
        // Adicionar evento de clique para o botão de carrinho
        const addToCartBtn = card.querySelector(".add-to-cart");
        if (addToCartBtn) {
            addToCartBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                this.classList.add("added");

                // Feedback visual
                const originalContent = this.innerHTML;
                this.innerHTML = "<span>✓</span>";

                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.classList.remove("added");
                }, 1500);
            });
        }

        // Clique no card (opcional - pode ser usado para redirecionar para página do curso)
        card.addEventListener("click", function (e) {
            // Evitar redirecionamento se o clique foi no botão de carrinho
            if (!e.target.closest(".add-to-cart")) {
                console.log("Navegar para página do curso");
                // window.location.href = 'url-do-curso';
            }
        });
    });
});
// Carregar dados do usuário ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    // Simular carregamento de dados (substituir por chamada API real)
    const userData = {
        firstName: "João",
        fullName: "João Silva Santos Oliveira",
        coursesInProgress: 3,
        completedCourses: 7,
    };

    // Atualizar nome no header
    const welcomeName = document.getElementById("welcome-name");
    if (welcomeName) {
        welcomeName.textContent = userData.fullName;
    }

    // Atualizar nome no hero banner
    const userFirstName = document.getElementById("user-first-name");
    if (userFirstName) {
        userFirstName.textContent = userData.firstName;
    }

    // Atualizar número de cursos
    const coursesInProgress = document.getElementById("courses-in-progress");
    if (coursesInProgress) {
        coursesInProgress.textContent = `${userData.coursesInProgress} cursos`;
    }
});
