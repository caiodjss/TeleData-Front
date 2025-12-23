document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;
    const rememberMe = document.getElementById("remember-me").checked;

    if (!email || !password) {
      alert("Preencha e-mail e senha.");
      return;
    }

    try {
      const response = await fetch("https://SEU_BACKEND_RAILWAY/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro no login.");
        return;
      }

      // Caso 2FA esteja ativo
      if (data.user_id) {
        localStorage.setItem("2fa_user_id", data.user_id);
        localStorage.setItem("2fa_email", email);
        window.location.href = "/verificar-codigo"; // rota futura
        return;
      }

      // Login normal
      localStorage.setItem("accessToken", data.token);

      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      window.location.href = "/perfil";

    } catch (error) {
      console.error("Erro ao logar:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });
});
