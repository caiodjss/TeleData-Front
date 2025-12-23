document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const form = document.querySelector("form");
  const passwordInput = document.querySelector("input[placeholder='Senha (mínimo 8 caracteres)']");
  const confirmPasswordInput = document.querySelector("input[placeholder='Confirmar Senha']");
  const submitButton = document.querySelector(".btn-entrar");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navActions = document.querySelector(".nav-actions");

  // ==================== VALIDAÇÃO EM TEMPO REAL ====================
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validatePassword);

  function validatePassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    clearValidationMessages();
    
    let isValid = true;
    
    // Validar comprimento da senha
    if (password.length > 0 && password.length < 8) {
      showValidationMessage(passwordInput, "A senha deve ter pelo menos 8 caracteres", "error");
      isValid = false;
    }
    
    // Validar se as senhas coincidem
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      showValidationMessage(confirmPasswordInput, "As senhas não coincidem", "error");
      isValid = false;
    }
    
    // Mostrar sucesso se as senhas coincidem
    if (password.length >= 8 && password === confirmPassword && confirmPassword.length > 0) {
      showValidationMessage(confirmPasswordInput, "Senhas coincidem!", "success");
    }
    
    return isValid;
  }

  // ==================== FUNÇÕES AUXILIARES DE VALIDAÇÃO ====================
  function showValidationMessage(input, message, type) {
    input.classList.remove("error", "success");
    input.classList.add(type);
    
    // Remover mensagem anterior
    const existingMessage = input.parentNode.querySelector(".validation-message");
    if (existingMessage) existingMessage.remove();
    
    // Adicionar nova mensagem
    const messageElement = document.createElement("span");
    messageElement.className = `validation-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
      display: block;
      color: ${type === "error" ? "#e74c3c" : "#27ae60"};
      font-size: 12px;
      margin-top: 5px;
      text-align: left;
    `;
    
    input.parentNode.appendChild(messageElement);
  }

  function clearValidationMessages() {
    document.querySelectorAll(".validation-message").forEach(msg => msg.remove());
    document.querySelectorAll(".input-group input").forEach(input => {
      input.classList.remove("error", "success");
    });
  }

  // ==================== SUBMIT DO FORMULÁRIO ====================
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Validação básica dos campos
    const name = document.querySelector('input[name="username"]').value.trim();
    const email = document.querySelector('input[name="useremail"]').value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validações iniciais
    if (!name || !email || !password) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }
    
    if (!validatePassword()) {
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
      return;
    }
    
    if (password !== confirmPassword) {
      showValidationMessage(confirmPasswordInput, "As senhas não coincidem", "error");
      return;
    }
    
    // Estado de loading
    submitButton.innerHTML = '<span class="btn-text">Cadastrando...</span>';
    submitButton.disabled = true;
    
    try {
      // Enviar dados para a API
      const response = await fetch("https://plusintel.up.railway.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          user_type: "student"
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || "Erro ao realizar cadastro.");
      }
      
      // Sucesso
      submitButton.innerHTML = '<span class="btn-text">Cadastro realizado!</span>';
      alert("Cadastro realizado com sucesso! Verifique seu e-mail para ativar a conta.");
      
      // Redirecionar após breve delay
      setTimeout(() => {
        window.location.href = "/Front-end/Pages/Login.html";
      }, 1500);
      
    } catch (error) {
      console.error("Erro no cadastro:", error);
      
      // Restaurar botão
      submitButton.innerHTML = '<span class="btn-text">Cadastrar</span>';
      submitButton.disabled = false;
      
      // Mostrar erro
      alert(error.message || "Erro de conexão com o servidor.");
    }
  });

  // ==================== MENU MOBILE ====================
  if (mobileMenuToggle && navActions) {
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navActions.classList.toggle("active");
      this.classList.toggle("active");
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".nav-actions") && !event.target.closest(".mobile-menu-toggle")) {
        navActions.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    });
    
    // Prevenir fechamento ao clicar dentro do menu
    navActions.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  // ==================== RESTAURAR BOTÃO APÓS EDIÇÃO ====================
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      if (submitButton.disabled && !submitButton.innerHTML.includes("Cadastrando")) {
        submitButton.innerHTML = '<span class="btn-text">Cadastrar</span>';
        submitButton.disabled = false;
      }
    });
  });

  // ==================== ESTILOS DINÂMICOS ====================
  const style = document.createElement("style");
  style.textContent = `
    .input-group input.error {
      border-color: #e74c3c !important;
      animation: shake 0.3s ease-in-out;
    }
    
    .input-group input.success {
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
    
    .btn-entrar:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .nav-actions.active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border-radius: 8px;
      z-index: 1000;
    }
    
    @media (max-width: 768px) {
      .nav-actions {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
});