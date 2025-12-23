document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector('input[name="username"]').value.trim();
    const email = document.querySelector('input[name="useremail"]').value.trim();
    const password = document.querySelector('input[name="userpassword"]').value;
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;

    if (!name || !email || !password) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("https://plusintel.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          user_type: "student" // padrão
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || data.message || "Erro ao realizar cadastro.");
        return;
      }

      alert("Cadastro realizado com sucesso! Verifique seu e-mail para ativar a conta.");
      window.location.href = "/Front-end/Pages/Login.html";

    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro de conexão com o servidor.");
    }
  });
});
