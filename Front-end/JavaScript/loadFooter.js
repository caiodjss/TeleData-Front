/**
 * ============================================================================
 * SISTEMA DE CARREGAMENTO DINÂMICO DO FOOTER
 * 
 * Este script é responsável por carregar dinamicamente o footer/rodapé
 * em todas as páginas do site, garantindo consistência e facilitando a manutenção.
 * 
 * Funcionalidades principais:
 * - Carrega o footer a partir de um arquivo HTML externo
 * - Gerencia o formulário de newsletter
 * - Valida e processa inscrições
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", function() {
    
    // =========================================================================
    // CONFIGURAÇÕES E CONSTANTES
    // =========================================================================
    const FOOTER_FILE_PATH = './footer.html';
    
    // =========================================================================
    // 1. FUNÇÃO PRINCIPAL - CARREGAMENTO DO FOOTER
    // =========================================================================
    
    /**
     * Carrega o conteúdo do footer a partir do arquivo HTML externo
     * e insere no final do body da página
     */
    function loadFooter() {
        console.log('📄 Iniciando carregamento do footer...');
        
        fetch(FOOTER_FILE_PATH)
            .then(response => {
                // Verifica se a requisição foi bem-sucedida
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(footerHTML => {
                // Insere o HTML do footer no final do body
                document.body.insertAdjacentHTML('beforeend', footerHTML);
                console.log('✅ Footer inserido com sucesso no DOM');
                
                // Inicializa todos os eventos e funcionalidades do footer
                initializeFooterFeatures();
            })
            .catch(error => {
                console.error('❌ Falha no carregamento do footer:', error);
                displayFooterError();
            });
    }

    // =========================================================================
    // 2. SISTEMA DE NEWSLETTER
    // =========================================================================
    
    /**
     * Configura e gerencia o formulário de newsletter
     */
    function setupNewsletterSystem() {
        const newsletterForm = document.querySelector('.newsletter-form');
        
        if (!newsletterForm) {
            console.warn('⚠️ Formulário de newsletter não encontrado');
            return;
        }

        /**
         * Processa a inscrição na newsletter
         * @param {string} email - Email do usuário
         */
        function subscribeNewsletter(email) {
            console.log(`📧 Processando inscrição: "${email}"`);
            
            // TODO: Implementar lógica de envio para backend
            // Exemplo: fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
            
            // Feedback visual temporário
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Inscrito! ✓';
            submitButton.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                newsletterForm.reset();
            }, 3000);
        }

        // Evento: Submit do formulário de newsletter
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                subscribeNewsletter(email);
            }
        });

        console.log('✅ Sistema de newsletter inicializado');
    }

    // =========================================================================
    // 3. ANIMAÇÕES DO FOOTER
    // =========================================================================
    
    /**
     * Adiciona animações e efeitos visuais ao footer
     */
    function setupFooterAnimations() {
        const footerLinks = document.querySelectorAll('footer a');
        
        if (!footerLinks.length) {
            console.warn('⚠️ Links do footer não encontrados');
            return;
        }

        // Smooth scroll para links âncora
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href && href.startsWith('#') && href !== '#') {
                link.addEventListener('click', function(event) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        event.preventDefault();
                        targetElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }
        });

        console.log('✅ Animações do footer configuradas');
    }

    // =========================================================================
    // 4. VALIDAÇÃO DE LINKS SOCIAIS
    // =========================================================================
    
    /**
     * Adiciona tracking e validação aos links sociais
     */
    function setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-links a');
        
        if (!socialLinks.length) {
            console.warn('⚠️ Links sociais não encontrados');
            return;
        }

        socialLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const platform = this.getAttribute('aria-label');
                console.log(`🔗 Clique no link social: ${platform}`);
                
                // TODO: Adicionar tracking analytics
                // Exemplo: gtag('event', 'social_click', { platform: platform });
            });
        });

        console.log('✅ Links sociais configurados');
    }

    // =========================================================================
    // 5. GERENCIADOR PRINCIPAL DE INICIALIZAÇÃO
    // =========================================================================
    
    /**
     * Inicializa todas as funcionalidades do footer após seu carregamento
     */
    function initializeFooterFeatures() {
        console.log('🔧 Inicializando funcionalidades do footer...');
        
        try {
            setupNewsletterSystem();
            setupFooterAnimations();
            setupSocialLinks();
            
            console.log('🎉 Todas as funcionalidades do footer foram inicializadas com sucesso!');
        } catch (error) {
            console.error('❌ Erro durante a inicialização do footer:', error);
        }
    }

    // =========================================================================
    // 6. SISTEMA DE FALLBACK/ERRO
    // =========================================================================
    
    /**
     * Exibe um footer básico em caso de falha no carregamento
     */
    function displayFooterError() {
        const fallbackFooter = `
            <footer style="background: #1f2937; color: white; padding: 2rem; text-align: center;">
                <div style="max-width: 1200px; margin: 0 auto;">
                    <p style="margin: 0;">© 2025 TeleData Treinamentos. Todos os direitos reservados.</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #9ca3af;">
                        Erro ao carregar footer completo - Versão simplificada
                    </p>
                </div>
            </footer>
        `;
        
        document.body.insertAdjacentHTML('beforeend', fallbackFooter);
        console.warn('⚠️ Footer de fallback carregado devido a erro no carregamento principal');
    }

    // =========================================================================
    // 7. INICIALIZAÇÃO DO SISTEMA
    // =========================================================================
    
    /**
     * Função de inicialização principal do script
     */
    function initialize() {
        console.log('🚀 Iniciando sistema de carregamento dinâmico do footer');
        loadFooter();
    }

    // Inicia o sistema quando o DOM estiver pronto
    initialize();
});