/**
 * ============================================================================
 * SISTEMA DE CARREGAMENTO DINÂMICO DO HEADER
 * 
 * Este script é responsável por carregar dinamicamente o header/menu superior
 * em todas as páginas do site, garantindo consistência e facilitando a manutenção.
 * 
 * Funcionalidades principais:
 * - Carrega o header a partir de um arquivo HTML externo
 * - Gerencia eventos de pesquisa (clique e Enter) com filtro de cursos
 * - Controla menu mobile responsivo
 * - Destaca a página atual no menu de navegação
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================================================
    // CONFIGURAÇÕES E CONSTANTES
    // =========================================================================
    const HEADER_FILE_PATH = './menu-header.html';
    
    // =========================================================================
    // 1. FUNÇÃO PRINCIPAL - CARREGAMENTO DO HEADER
    // =========================================================================
    
    /**
     * Carrega o conteúdo do header a partir do arquivo HTML externo
     * e insere no início do body da página
     */
    function loadHeader() {
        console.log('📄 Iniciando carregamento do header...');
        
        fetch(HEADER_FILE_PATH)
            .then(response => {
                // Verifica se a requisição foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(headerHTML => {
                // Insere o HTML do header no início do body
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
                console.log('✅ Header inserido com sucesso no DOM');
                
                // Inicializa todos os eventos e funcionalidades do header
                initializeHeaderFeatures();
            })
            .catch(error => {
                console.error('❌ Falha no carregamento do header:', error);
                displayHeaderError();
            });
    }

    // =========================================================================
    // 2. SISTEMA DE PESQUISA
    // =========================================================================
    
    /**
     * Configura e gerencia os eventos do sistema de pesquisa
     */
    function setupSearchSystem() {
        const searchButton = document.querySelector('.search-button');
        const searchInput = document.querySelector('.search-bar input');

        if (!searchButton || !searchInput) {
            console.warn('⚠️ Elementos de pesquisa não encontrados');
            return;
        }

        /**
         * Executa a ação de pesquisa com o termo fornecido
         * @param {string} searchTerm - Termo a ser pesquisado
         */
        function performSearch(searchTerm) {
            if (searchTerm) {
                console.log(`🔍 Executando pesquisa por: "${searchTerm}"`);
                
                // Verifica se estamos na página do catálogo
                const currentPage = window.location.pathname;
                const isOnCatalog = currentPage.includes('Catalogo.html') || 
                                   currentPage.includes('catalogo.html');
                
                if (isOnCatalog) {
                    // Se estiver no catálogo, aplica o filtro diretamente
                    if (typeof window.searchCourses === 'function') {
                        window.searchCourses(searchTerm);
                        searchInput.value = '';
                    } else {
                        console.warn('⚠️ Função searchCourses não encontrada');
                    }
                } else {
                    // Se não estiver no catálogo, redireciona com parâmetro de busca
                    const catalogPath = '/Front-end/Pages/Catalogo.html';
                    window.location.href = `${catalogPath}?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        }

        // Evento: Clique no botão de pesquisa
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            performSearch(searchTerm);
        });

        // Evento: Tecla Enter no campo de pesquisa
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                const searchTerm = this.value.trim();
                performSearch(searchTerm);
            }
        });

        console.log('✅ Sistema de pesquisa inicializado');
    }

    // =========================================================================
    // 3. CONTROLE DO MENU MOBILE
    // =========================================================================
    
    /**
     * Gerencia o comportamento do menu mobile (abrir/fechar)
     */
    function setupMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navActions = document.querySelector('.nav-actions');

        if (!mobileMenuToggle || !navActions) {
            console.warn('⚠️ Elementos do menu mobile não encontrados');
            return;
        }

        /**
         * Abre ou fecha o menu mobile
         */
        function toggleMobileMenu() {
            navActions.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Feedback de acessibilidade
            const isOpen = navActions.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isOpen);
            console.log(`📱 Menu mobile ${isOpen ? 'aberto' : 'fechado'}`);
        }

        /**
         * Fecha o menu mobile
         */
        function closeMobileMenu() {
            navActions.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }

        // Evento: Toggle do menu mobile
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleMobileMenu();
        });

        // Evento: Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navActions.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                closeMobileMenu();
            }
        });

        // Evento: Fechar menu ao redimensionar a janela (para desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        console.log('✅ Menu mobile inicializado');
    }

    // =========================================================================
    // 4. DESTAQUE DA PÁGINA ATUAL
    // =========================================================================
    
    /**
     * Destaca visualmente o link correspondente à página atual no menu
     */
    function highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-actions a');
        let activeLinkFound = false;

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkText = link.textContent.trim();
            
            // Remove classe active de todos os links primeiro
            link.classList.remove('active');
            
            // Verifica se este link corresponde à página atual
            const isCurrentPage = isLinkCurrentPage(linkPath, currentPath);
            
            if (isCurrentPage) {
                link.classList.add('active');
                activeLinkFound = true;
                console.log(`🎯 Página atual destacada: ${linkText}`);
            }
        });

        if (!activeLinkFound) {
            console.log('ℹ️ Nenhum link correspondente à página atual foi encontrado');
        }
    }

    /**
     * Determina se um link corresponde à página atual
     * @param {string} linkPath - Caminho do link
     * @param {string} currentPath - Caminho atual da página
     * @returns {boolean} True se for a página atual
     */
    function isLinkCurrentPage(linkPath, currentPath) {
        // Caso especial: página inicial
        if (linkPath === './' || linkPath === 'index.html') {
            return currentPath.endsWith('/') || currentPath.endsWith('index.html');
        }
        
        // Comparação direta
        if (linkPath === currentPath) return true;
        
        // Verifica se o currentPath contém o linkPath (para subpáginas)
        if (linkPath && linkPath !== '/' && currentPath.includes(linkPath)) {
            return true;
        }
        
        return false;
    }

    // =========================================================================
    // 5. GERENCIADOR PRINCIPAL DE INICIALIZAÇÃO
    // =========================================================================
    
    /**
     * Inicializa todas as funcionalidades do header após seu carregamento
     */
    function initializeHeaderFeatures() {
        console.log('🔧 Inicializando funcionalidades do header...');
        
        try {
            setupSearchSystem();
            setupMobileMenu();
            highlightCurrentPage();
            
            console.log('🎉 Todas as funcionalidades do header foram inicializadas com sucesso!');
        } catch (error) {
            console.error('❌ Erro durante a inicialização do header:', error);
        }
    }

    // =========================================================================
    // 6. SISTEMA DE FALLBACK/ERRO
    // =========================================================================
    
    /**
     * Exibe um header básico em caso de falha no carregamento
     */
    function displayHeaderError() {
        const fallbackHeader = `
            <header style="background: #f8f9fa; padding: 1rem; border-bottom: 1px solid #ddd;">
                <nav style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="nav-brand">
                        <a href="./" style="text-decoration: none; color: #333; font-weight: bold;">
                            🏠 Meu Site
                        </a>
                    </div>
                    <div style="color: #666; font-size: 0.9rem;">
                        Menu temporário - Erro no carregamento
                    </div>
                </nav>
            </header>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        console.warn('⚠️ Header de fallback carregado devido a erro no carregamento principal');
    }

    // =========================================================================
    // 7. INICIALIZAÇÃO DO SISTEMA
    // =========================================================================
    
    /**
     * Função de inicialização principal do script
     */
    function initialize() {
        console.log('🚀 Iniciando sistema de carregamento dinâmico do header');
        loadHeader();
    }

    // Inicia o sistema quando o DOM estiver pronto
    initialize();
});