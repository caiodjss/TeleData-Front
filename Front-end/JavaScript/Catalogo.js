// ===================================
// Catalogo.js
// ===================================

// ===================================
// CONFIGURAÇÕES E DADOS
// ===================================

const COURSES_PER_PAGE = 6;
let currentPage = 1;
let filteredCourses = [];
let currentSearchTerm = '';

const courses = [
    {
        id: 1,
        title: "Curso Elementor Wordpress: Criando Sites com Elementor",
        description: "Aprenda a construir sites e páginas de vendas utilizando um dos mais populares plugins de WordPress no mundo!",
        instructor: "Rafael Santos",
        rating: 4.4,
        reviews: 3942,
        students: "9 horas de vídeo",
        duration: 540,
        price: "R$ 26,90",
        oldPrice: "R$ 89,90",
        imageClass: "purple",
        imageType: "elementor",
        bestseller: true,
        mostSold: false,
        topics: ["WordPress", "Elementor"],
        isFree: false
    },
    {
        id: 2,
        title: "Crie Apps Incríveis sem digitar código c/ FlutterFlow - 2023",
        description: "Desenvolva aplicativos profissionais sem precisar ser um expert em programação com o curso de Low-Code FlutterFlow",
        instructor: "Premium Label",
        rating: 4.7,
        reviews: 1837,
        students: "9.5 horas de vídeo",
        duration: 570,
        price: "R$ 27,90",
        oldPrice: "R$ 79,90",
        imageClass: "blue",
        imageType: "flutter",
        bestseller: false,
        mostSold: false,
        topics: ["Programação visual", "FlutterFlow"],
        isFree: false
    },
    {
        id: 3,
        title: "Curso WordPress - Do Básico ao Avançado",
        description: "Tudo sobre WordPress ✓ Hospedagem ✓ Elementor ✓ 6 Projetos Reais",
        instructor: "André Neves",
        rating: 4.7,
        reviews: 888,
        students: "20 horas de vídeo",
        duration: 1200,
        price: "R$ 27,90",
        oldPrice: "R$ 89,90",
        imageClass: "dark",
        imageType: "wordpress",
        bestseller: true,
        mostSold: true,
        topics: ["WordPress"],
        isFree: false
    },
    {
        id: 4,
        title: "Desenvolvimento Web Completo 2024",
        description: "Do zero ao avançado: HTML, CSS, JavaScript, React, Node.js e muito mais!",
        instructor: "Carlos Silva",
        rating: 4.8,
        reviews: 5421,
        students: "45 horas de vídeo",
        duration: 2700,
        price: "R$ 39,90",
        oldPrice: "R$ 149,90",
        imageClass: "blue",
        imageType: "flutter",
        bestseller: true,
        mostSold: false,
        topics: ["Programação visual"],
        isFree: false
    },
    {
        id: 5,
        title: "Python para Data Science e Machine Learning",
        description: "Aprenda Python, análise de dados, visualização e algoritmos de Machine Learning",
        instructor: "Dra. Maria Costa",
        rating: 4.6,
        reviews: 2156,
        students: "32 horas de vídeo",
        duration: 1920,
        price: "R$ 34,90",
        oldPrice: "R$ 129,90",
        imageClass: "purple",
        imageType: "elementor",
        bestseller: false,
        mostSold: true,
        topics: ["WordPress"],
        isFree: false
    },
    {
        id: 6,
        title: "Design Gráfico Profissional com Adobe Suite",
        description: "Photoshop, Illustrator e InDesign do básico ao avançado",
        instructor: "João Designer",
        rating: 4.5,
        reviews: 1543,
        students: "28 horas de vídeo",
        duration: 1680,
        price: "R$ 29,90",
        oldPrice: "R$ 99,90",
        imageClass: "dark",
        imageType: "wordpress",
        bestseller: false,
        mostSold: false,
        topics: ["Wix"],
        isFree: false
    },
    {
        id: 7,
        title: "Marketing Digital e Vendas Online",
        description: "Estratégias completas de marketing digital, SEO, tráfego pago e funis de vendas",
        instructor: "Ana Marketing",
        rating: 4.7,
        reviews: 3214,
        students: "25 horas de vídeo",
        duration: 1500,
        price: "R$ 32,90",
        oldPrice: "R$ 119,90",
        imageClass: "blue",
        imageType: "flutter",
        bestseller: true,
        mostSold: false,
        topics: ["FlutterFlow"],
        isFree: false
    },
    {
        id: 8,
        title: "Excel Avançado para Negócios",
        description: "Dashboards, macros, Power Query e análise de dados profissional",
        instructor: "Pedro Planilhas",
        rating: 4.6,
        reviews: 2876,
        students: "18 horas de vídeo",
        duration: 1080,
        price: "R$ 24,90",
        oldPrice: "R$ 79,90",
        imageClass: "purple",
        imageType: "elementor",
        bestseller: false,
        mostSold: true,
        topics: ["Elementor"],
        isFree: false
    }
];

// ===================================
// FUNÇÕES DE RENDERIZAÇÃO
// ===================================

function getImageContent(imageType) {
    if (imageType === 'elementor') {
        return `
            <div class="course-image-content">
                <div class="image-icon">E</div>
                <div class="image-icon circle">
                    <div class="image-icon-inner"></div>
                </div>
            </div>
        `;
    } else if (imageType === 'flutter') {
        return `
            <div class="course-image-content">
                <div style="font-size: 48px;">📱</div>
                <div class="image-icon circle">
                    <div class="image-icon-inner"></div>
                </div>
                <div style="font-size: 48px;">🎨</div>
            </div>
        `;
    } else {
        return `
            <div class="image-icon circle">
                <div class="image-icon-inner"></div>
            </div>
        `;
    }
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star${i <= Math.floor(rating) ? '' : ' empty'}">★</span>`;
    }
    return stars;
}

function renderCourses(coursesToRender) {
    const coursesList = document.getElementById('coursesList');
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;
    const coursesForPage = coursesToRender.slice(startIndex, endIndex);

    coursesList.innerHTML = '';

    if (coursesForPage.length === 0) {
        coursesList.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h2 style="color: #666; margin-bottom: 10px;">Nenhum curso encontrado</h2>
                <p style="color: #999;">Tente ajustar seus filtros ou buscar por outro termo</p>
                <button onclick="clearAllFiltersAndSearch()" style="margin-top: 20px; padding: 12px 24px; background: #5624d0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;">
                    Limpar busca e filtros
                </button>
            </div>
        `;
        updateResultsCount(0);
        document.getElementById('pagination').innerHTML = '';
        return;
    }

    coursesForPage.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        const isInCart = checkIfInCart(course.id);

        courseCard.innerHTML = `
            <div class="course-image ${course.imageClass}" onclick="viewCourse(${course.id})">
                ${getImageContent(course.imageType)}
            </div>
            <div class="course-info">
                <h3 class="course-title" onclick="viewCourse(${course.id})">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <p class="course-instructor">${course.instructor}</p>
                <div class="course-rating">
                    <span class="rating-number">${course.rating}</span>
                    <span class="stars">${renderStars(course.rating)}</span>
                    <span class="rating-count">(${course.reviews.toLocaleString()})</span>
                </div>
                <div class="course-meta">
                    <span>${course.students}</span>
                    <span>•</span>
                    <span>Todas as aulas</span>
                </div>
                <div class="course-badges">
                    ${course.bestseller ? '<span class="badge bestseller">⚡ Bestseller</span>' : ''}
                    ${course.mostSold ? '<span class="badge most-sold">Mais vendido</span>' : ''}
                </div>
            </div>
            <div class="course-actions">
                <div class="course-price">
                    <div class="price-current">${course.price}</div>
                    <div class="price-old">${course.oldPrice}</div>
                </div>
                <div class="course-buttons">
                    <button class="btn-buy" onclick="buyCourse(${course.id})">Comprar agora</button>
                    <button class="btn-cart ${isInCart ? 'added' : ''}" onclick="toggleCart(${course.id}, this)">
                        ${isInCart ? '✓ No carrinho' : '🛒 Adicionar'}
                    </button>
                </div>
            </div>
        `;
        coursesList.appendChild(courseCard);
    });

    updateResultsCount(coursesToRender.length);
    renderPagination(coursesToRender.length);
}

function updateResultsCount(totalResults) {
    const countElement = document.getElementById('resultsCount');
    if (countElement) {
        countElement.textContent = totalResults.toLocaleString();
    }
    
    // Atualiza o título se houver busca ativa
    const contentHeader = document.querySelector('.content-header h1');
    if (contentHeader && currentSearchTerm) {
        contentHeader.textContent = `Resultados para "${currentSearchTerm}"`;
    } else if (contentHeader) {
        contentHeader.textContent = 'Todos os cursos';
    }
}

function renderPagination(totalResults) {
    const totalPages = Math.ceil(totalResults / COURSES_PER_PAGE);
    const paginationDiv = document.getElementById('pagination');

    if (totalPages <= 1) {
        paginationDiv.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Botão anterior
    paginationHTML += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>←</button>`;

    // Páginas
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
    } else {
        paginationHTML += `<button class="${currentPage === 1 ? 'active' : ''}" onclick="changePage(1)">1</button>`;

        if (currentPage > 3) {
            paginationHTML += `<button class="dots">...</button>`;
        }

        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }

        if (currentPage < totalPages - 2) {
            paginationHTML += `<button class="dots">...</button>`;
        }

        paginationHTML += `<button class="${currentPage === totalPages ? 'active' : ''}" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    // Botão próximo
    paginationHTML += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>→</button>`;

    paginationDiv.innerHTML = paginationHTML;
}

// ===================================
// FUNÇÕES DE NAVEGAÇÃO E AÇÕES
// ===================================

function changePage(page) {
    const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderCourses(filteredCourses);

    // Scroll suave para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function viewCourse(courseId) {
    console.log('Visualizando curso:', courseId);
    // Redirecionar para página de detalhes do curso
    // window.location.href = `./DetalheCurso.html?id=${courseId}`;
    alert(`Redirecionando para detalhes do curso ID: ${courseId}`);
}

function buyCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    console.log('Comprando curso:', courseId);

    // Adicionar ao carrinho antes de ir para checkout
    addToCart(courseId);

    // Redirecionar para página de checkout
    // window.location.href = `./Checkout.html?id=${courseId}`;
    alert(`Redirecionando para checkout do curso: ${course.title}`);
}

function toggleCart(courseId, button) {
    const isInCart = checkIfInCart(courseId);
    const course = courses.find(c => c.id === courseId);

    if (isInCart) {
        removeFromCart(courseId);
        button.classList.remove('added');
        button.textContent = '🛒 Adicionar';
        showNotification(`${course.title} removido do carrinho`, 'info');
    } else {
        addToCart(courseId);
        button.classList.add('added');
        button.textContent = '✓ No carrinho';
        showNotification(`${course.title} adicionado ao carrinho!`, 'success');
    }
}

// ===================================
// GERENCIAMENTO DO CARRINHO
// ===================================

function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function addToCart(courseId) {
    let cart = getCart();
    if (!cart.includes(courseId)) {
        cart.push(courseId);
        saveCart(cart);
    }
}

function removeFromCart(courseId) {
    let cart = getCart();
    cart = cart.filter(id => id !== courseId);
    saveCart(cart);
}

function checkIfInCart(courseId) {
    const cart = getCart();
    return cart.includes(courseId);
}

// ===================================
// SISTEMA DE NOTIFICAÇÕES
// ===================================

function showNotification(message, type = 'success') {
    // Remove notificações existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Adiciona estilos inline
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adiciona animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// FUNÇÕES DE FILTROS
// ===================================

function applyFilters() {
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const selectedDuration = document.querySelector('input[name="duration"]:checked');
    const selectedTopics = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const selectedPrice = document.querySelector('input[name="price"]:checked');

    // Começa com todos os cursos
    let coursesToFilter = [...courses];

    // Aplica filtro de busca se houver termo de busca ativo
    if (currentSearchTerm) {
        coursesToFilter = searchInCourses(coursesToFilter, currentSearchTerm);
    }

    // Aplica outros filtros
    filteredCourses = coursesToFilter.filter(course => {
        if (selectedRating && course.rating < parseFloat(selectedRating.value)) return false;
        if (selectedDuration && course.duration < parseInt(selectedDuration.value)) return false;
        if (selectedTopics.length > 0 && !selectedTopics.some(topic => course.topics.includes(topic))) return false;
        if (selectedPrice) {
            if (selectedPrice.value === 'free' && !course.isFree) return false;
            if (selectedPrice.value === 'paid' && course.isFree) return false;
        }
        return true;
    });

    currentPage = 1;
    renderCourses(filteredCourses);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function clearFilters() {
    // Limpa todos os filtros
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
    
    // Limpa também a busca
    currentSearchTerm = '';
    filteredCourses = [...courses];
    currentPage = 1;
    renderCourses(filteredCourses);
    
    // Limpa campo de busca do header se existir
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Remove parâmetro de busca da URL se houver
    if (window.location.search) {
        const url = window.location.pathname;
        window.history.replaceState({}, document.title, url);
    }
    
    showNotification('Filtros e busca limpos!', 'info');
}

function clearAllFiltersAndSearch() {
    // Limpa filtros
    document.querySelectorAll('input[type="radio"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
    
    // Limpa busca
    currentSearchTerm = '';
    filteredCourses = [...courses];
    currentPage = 1;
    renderCourses(filteredCourses);
    
    // Limpa campo de busca do header se existir
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.value = '';
    }
}

// ===================================
// FUNÇÕES DE PESQUISA
// ===================================

/**
 * Função de busca que procura em múltiplos campos do curso
 * @param {Array} coursesToSearch - Array de cursos para buscar
 * @param {string} searchTerm - Termo de busca
 * @returns {Array} - Cursos filtrados
 */
function searchInCourses(coursesToSearch, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return coursesToSearch;
    }

    const term = searchTerm.toLowerCase().trim();
    
    return coursesToSearch.filter(course => {
        // Busca no título
        if (course.title.toLowerCase().includes(term)) return true;
        
        // Busca na descrição
        if (course.description.toLowerCase().includes(term)) return true;
        
        // Busca no nome do instrutor
        if (course.instructor.toLowerCase().includes(term)) return true;
        
        // Busca nos tópicos
        if (course.topics.some(topic => topic.toLowerCase().includes(term))) return true;
        
        return false;
    });
}

/**
 * Função global para ser chamada pelo header
 * @param {string} searchTerm - Termo de busca
 */
window.searchCourses = function(searchTerm) {
    console.log('🔍 Pesquisando por:', searchTerm);
    
    currentSearchTerm = searchTerm;
    
    // Aplica a busca junto com os filtros existentes
    applyFilters();
    
    // Exibe feedback
    if (filteredCourses.length === 0) {
        showNotification(`Nenhum curso encontrado para "${searchTerm}"`, 'info');
    } else {
        showNotification(`${filteredCourses.length} curso(s) encontrado(s)`, 'success');
    }
};

/**
 * Verifica se há parâmetro de busca na URL ao carregar a página
 */
function checkURLSearchParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam) {
        console.log('🔍 Parâmetro de busca na URL:', searchParam);
        currentSearchTerm = searchParam;
        
        // Preenche o campo de busca do header se existir
        setTimeout(() => {
            const searchInput = document.querySelector('.search-bar input');
            if (searchInput) {
                searchInput.value = searchParam;
            }
        }, 500);
        
        // Aplica a busca
        window.searchCourses(searchParam);
    }
}

// ===================================
// INICIALIZAÇÃO
// ===================================

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    filteredCourses = [...courses];
    renderCourses(filteredCourses);
    
    // Verifica se há busca na URL
    checkURLSearchParameter();
    
    console.log('✅ Catálogo de cursos inicializado com sucesso!');
});

// Renderizar cursos inicialmente (fallback)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        filteredCourses = [...courses];
        renderCourses(filteredCourses);
        checkURLSearchParameter();
    });
} else {
    filteredCourses = [...courses];
    renderCourses(filteredCourses);
    checkURLSearchParameter();
}