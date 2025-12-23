// Animação para a página de login
document.addEventListener("DOMContentLoaded", function () {
    // Animação de entrada para os elementos do formulário
    const loginBox = document.querySelector(".login-box");
    const inputGroups = document.querySelectorAll(".input-group");
    const rememberMe = document.querySelector(".remember-me");
    const loginLinks = document.querySelector(".login-links");
    const separator = document.querySelector(".separator");

    // Função para animar elementos com atraso
    function animateElements() {
        // Anima a caixa de login principal
        setTimeout(() => {
            if (loginBox) loginBox.classList.add("animated");
        }, 300);

        // Anima os campos de input
        if (inputGroups.length > 0) {
            inputGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add("animated");
                }, 500 + index * 100);
            });
        }

        // Anima a opção "Lembrar senha"
        setTimeout(() => {
            if (rememberMe) rememberMe.classList.add("animated");
        }, 800);

        // Anima o botão de entrar
        setTimeout(() => {
            if (btnEntrar) btnEntrar.classList.add("animated");
        }, 900);

        // Anima os links de login
        setTimeout(() => {
            if (loginLinks) loginLinks.classList.add("animated");
        }, 1000);

        // Anima o separador
        setTimeout(() => {
            if (separator) separator.classList.add("animated");
        }, 1100);
    }

    // Inicia as animações quando a página carrega
    setTimeout(animateElements, 100);

    // Efeito de preenchimento no botão de entrar
    if (btnEntrar) {
        btnEntrar.addEventListener("mouseenter", function () {
            this.style.background =
                "linear-gradient(45deg, var(--color-primary), var(--color-accent))";
        });

        btnEntrar.addEventListener("mouseleave", function () {
            this.style.background = "var(--color-primary)";
        });
    }

    // Animação de shake para campos inválidos
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            let isValid = true;
            const inputs = this.querySelectorAll("input[required]");

            inputs.forEach((input) => {
                if (!input.value.trim()) {
                    isValid = false;
                    // Adiciona animação de shake
                    input.style.animation = "shake 0.5s";
                    setTimeout(() => {
                        input.style.animation = "";
                    }, 500);
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    // Adicionar loading state no botão de login
    const submitButton = document.querySelector(".btn-entrar");

    if (form && submitButton) {
        form.addEventListener("submit", function (e) {
            // Verifica se o formulário é válido
            const inputs = form.querySelectorAll("input[required]");
            let formIsValid = true;

            inputs.forEach((input) => {
                if (!input.value.trim()) {
                    formIsValid = false;
                    input.style.animation = "shake 0.5s";
                    setTimeout(() => {
                        input.style.animation = "";
                    }, 500);
                }
            });

            if (formIsValid) {
                e.preventDefault(); // Previne envio real para demonstração

                submitButton.innerHTML =
                    "<span class='btn-text'>Entrando...</span>";
                submitButton.disabled = true;

                // Simular tempo de processamento
                setTimeout(() => {
                    submitButton.innerHTML =
                        "<span class='btn-text'>Login realizado!</span>";
                    // Redirecionar após sucesso (simulado)
                    setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 1000);
                }, 1500);
            } else {
                e.preventDefault();
            }
        });

        // Restaurar botão se houver erro
        const inputs = form.querySelectorAll("input");
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                if (submitButton.disabled) {
                    submitButton.innerHTML =
                        "<span class='btn-text'>Entrar</span>";
                    submitButton.disabled = false;
                }
            });
        });
    }

    document.head.appendChild(style);

    // Validação em tempo real dos campos de login
    const loginInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");

    if (loginInput && passwordInput) {
        loginInput.addEventListener("blur", function () {
            if (this.value.trim() === "") {
                this.classList.add("error");
            } else {
                this.classList.remove("error");
            }
        });

        passwordInput.addEventListener("blur", function () {
            if (this.value.trim() === "") {
                this.classList.add("error");
            } else {
                this.classList.remove("error");
            }
        });
    }
});
