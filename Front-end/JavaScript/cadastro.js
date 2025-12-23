// Validação do formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const passwordInput = document.querySelector(
        "input[placeholder='Senha (mínimo 8 caracteres)']"
    );
    const confirmPasswordInput = document.querySelector(
        "input[placeholder='Confirmar Senha']"
    );

    // Adicionar validação em tempo real
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validatePassword);

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Limpar mensagens anteriores
        clearValidationMessages();

        // Validar comprimento da senha
        if (password.length > 0 && password.length < 8) {
            showValidationMessage(
                passwordInput,
                "A senha deve ter pelo menos 8 caracteres"
            );
            return false;
        }

        // Validar se as senhas coincidem
        if (password !== confirmPassword && confirmPassword.length > 0) {
            showValidationMessage(
                confirmPasswordInput,
                "As senhas não coincidem"
            );
            return false;
        }

        // Se as senhas coincidem e têm comprimento suficiente
        if (password === confirmPassword && password.length >= 8) {
            showValidationSuccess(confirmPasswordInput, "Senhas coincidem!");
        }

        return true;
    }

    function showValidationMessage(input, message) {
        // Remover sucesso anterior
        input.classList.remove("success");
        input.classList.add("error");

        // Remover mensagem anterior
        let existingMessage = input.parentNode.querySelector(
            ".validation-message"
        );
        if (existingMessage) {
            existingMessage.remove();
        }

        // Adicionar nova mensagem
        const messageElement = document.createElement("span");
        messageElement.className = "validation-message error";
        messageElement.textContent = message;
        messageElement.style.cssText = `
            display: block;
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            text-align: left;
        `;

        input.parentNode.appendChild(messageElement);
    }

    function showValidationSuccess(input, message) {
        // Remover erro anterior
        input.classList.remove("error");
        input.classList.add("success");

        // Remover mensagem anterior
        let existingMessage = input.parentNode.querySelector(
            ".validation-message"
        );
        if (existingMessage) {
            existingMessage.remove();
        }

        // Adicionar mensagem de sucesso
        const messageElement = document.createElement("span");
        messageElement.className = "validation-message success";
        messageElement.textContent = message;
        messageElement.style.cssText = `
            display: block;
            color: #27ae60;
            font-size: 12px;
            margin-top: 5px;
            text-align: left;
        `;

        input.parentNode.appendChild(messageElement);
    }

    function clearValidationMessages() {
        const messages = document.querySelectorAll(".validation-message");
        messages.forEach((msg) => msg.remove());

        const inputs = document.querySelectorAll(".input-group input");
        inputs.forEach((input) => {
            input.classList.remove("error", "success");
        });
    }

    // Validação no submit
    form.addEventListener("submit", function (event) {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!validatePassword()) {
            event.preventDefault();
            // Adicionar shake animation para indicar erro
            form.classList.add("shake");
            setTimeout(() => form.classList.remove("shake"), 500);
        }
    });

    // Adicionar CSS para estados de validação
    const style = document.createElement("style");
    style.textContent = `
        .input-group.error {
            border-color: #e74c3c !important;
        }
        
        .input-group.success {
            border-color: #27ae60 !important;
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // Adicionar loading state no botão de cadastro
    const submitButton = document.querySelector(".btn-entrar");

    form.addEventListener("submit", function (e) {
        if (validatePassword()) {
            submitButton.innerHTML =
                '<span class="btn-text">Cadastrando...</span>';
            submitButton.disabled = true;
            // Simular tempo de processamento
            setTimeout(() => {
                submitButton.innerHTML =
                    '<span class="btn-text">Cadastro realizado!</span>';
            }, 1500);
        }
    });

    // Restaurar botão se houver erro
    const inputs = form.querySelectorAll("input");
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            if (submitButton.disabled) {
                submitButton.innerHTML =
                    '<span class="btn-text">Cadastrar</span>';
                submitButton.disabled = false;
            }
        });
    });

    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navActions = document.querySelector(".nav-actions");

    mobileMenuToggle.addEventListener("click", function () {
        navActions.classList.toggle("active");
        this.classList.toggle("active");
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {
        if (
            !event.target.closest(".nav-actions") &&
            !event.target.closest(".mobile-menu-toggle")
        ) {
            navActions.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
        }
    });

    // Prevenir fechamento ao clicar dentro do menu
    navActions.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});
