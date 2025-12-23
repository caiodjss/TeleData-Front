// script.js - Versão Simplificada com Controles Nativos
document.addEventListener("DOMContentLoaded", function () {
    console.log("=== SCRIPT INICIADO ===");

    // =============================================
    // ELEMENTOS DO DOM
    // =============================================
    const video = document.getElementById("main-video");
    const lessons = document.querySelectorAll(".lesson");
    const progressBar = document.getElementById("progress");
    const progressText = document.getElementById("progress-text");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    // Verificar se elementos existem
    if (!video) {
        console.error("ERRO: Elemento de vídeo não encontrado!");
        return;
    }

    console.log("Elementos encontrados:", {
        video: !!video,
        lessons: lessons.length,
        progressBar: !!progressBar,
        progressText: !!progressText,
        tabBtns: tabBtns.length,
        tabContents: tabContents.length,
    });

    // =============================================
    // VÍDEOS ESPECÍFICOS SOBRE IPAAS E N8N
    // =============================================
    const n8nVideos = {
        "1. Bem-vindo ao curso": {
            video: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
            description: "Introdução ao ecossistema de automação e iPaaS",
        },
        "2. O que é o n8n": {
            video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            poster: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop",
            description:
                "Conceitos fundamentais do n8n como plataforma de automação",
        },
        "3. Instalação Cloud": {
            video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop",
            description: "Configuração e deploy do n8n na nuvem",
        },
        "4. Primeiros passos": {
            video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            poster: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=225&fit=crop",
            description: "Criando seu primeiro workflow de automação",
        },
        "5. Instalação no servidor": {
            video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            poster: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
            description:
                "Instalação self-hosted com Docker e configurações avançadas",
        },
    };

    // =============================================
    // ATIVAR CONTROLES NATIVOS DO NAVEGADOR
    // =============================================
    function enableNativeControls() {
        console.log("Ativando controles nativos do navegador");
        video.controls = true;
        video.removeAttribute("controlslist"); // Remove restrições se houver
    }

    // =============================================
    // SIDEBAR - LIÇÕES
    // =============================================
    if (lessons.length > 0) {
        lessons.forEach((lesson) => {
            lesson.addEventListener("click", function () {
                console.log("Clicou na lição:", this.textContent);

                // Remove active de todas
                lessons.forEach((l) => l.classList.remove("active"));
                // Adiciona active na clicada
                this.classList.add("active");

                // Carrega o vídeo
                const videoUrl = this.getAttribute("data-video");
                const posterUrl = this.getAttribute("data-poster");

                if (videoUrl) {
                    console.log("Carregando vídeo:", videoUrl);

                    // Limpa o vídeo atual
                    video.innerHTML = "";

                    // Adiciona novo source
                    const source = document.createElement("source");
                    source.src = videoUrl;
                    source.type = "video/mp4";
                    video.appendChild(source);

                    // Atualiza poster
                    if (posterUrl) {
                        video.poster = posterUrl;
                    }

                    // Habilita controles nativos
                    enableNativeControls();

                    // Carrega o vídeo
                    video.load();

                    // Tenta reproduzir automaticamente (pode ser bloqueado pelo navegador)
                    video.play().catch((e) => {
                        console.log(
                            "Reprodução automática bloqueada, use os controles do navegador"
                        );
                    });
                }
            });
        });
    }

    // =============================================
    // PROGRESSO DO CURSO
    // =============================================
    video.addEventListener("ended", function () {
        console.log("Vídeo terminou!");
        const currentLesson = document.querySelector(".lesson.active");
        if (currentLesson) {
            currentLesson.classList.add("completed");
            if (!currentLesson.innerHTML.includes("")) {
                currentLesson.innerHTML += "";
            }
            updateProgress();
            saveProgress();
            showNotification("Lição concluída!");
        }
    });

    function updateProgress() {
        const totalLessons = lessons.length;
        const completedLessons =
            document.querySelectorAll(".lesson.completed").length;
        const progressPercentage = (completedLessons / totalLessons) * 100;

        console.log("Progresso:", progressPercentage + "%");

        if (progressBar) {
            progressBar.style.width = progressPercentage + "%";
        }
        if (progressText) {
            progressText.textContent =
                Math.round(progressPercentage) + "% concluído";
        }
    }

    function saveProgress() {
        const progress = {};
        lessons.forEach((lesson) => {
            const lessonId = lesson.textContent.trim();
            progress[lessonId] = {
                completed: lesson.classList.contains("completed"),
                timestamp: new Date().toISOString(),
            };
        });
        localStorage.setItem("courseProgress", JSON.stringify(progress));
        console.log("Progresso salvo no localStorage");
    }

    function restoreProgress() {
        const progress = JSON.parse(
            localStorage.getItem("courseProgress") || "{}"
        );
        console.log("Restaurando progresso:", progress);

        lessons.forEach((lesson) => {
            const lessonId = lesson.textContent.trim();
            if (progress[lessonId] && progress[lessonId].completed) {
                lesson.classList.add("completed");
                if (!lesson.innerHTML.includes("")) {
                    lesson.innerHTML += "";
                }
            }
        });

        updateProgress();
    }

    // =============================================
    // ABAS
    // =============================================
    if (tabBtns.length > 0) {
        tabBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const target = btn.dataset.target;
                console.log("Clicou na aba:", target);

                tabBtns.forEach((b) => b.classList.remove("active"));
                tabContents.forEach((c) => c.classList.remove("active"));

                btn.classList.add("active");
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    targetElement.classList.add("active");
                }
            });
        });
    }

    // =============================================
    // FUNÇÕES AUXILIARES
    // =============================================
    function showNotification(message, type = "success") {
        // Removido todo o CSS inline - deve ser tratado no arquivo CSS
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Adiciona classe para animação
        setTimeout(() => {
            notification.classList.add("show");
        }, 100);

        // Remove após 3 segundos
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // =============================================
    // INICIALIZAÇÃO
    // =============================================
    console.log("🎬 Inicializando player...");

    // Habilita controles nativos desde o início
    enableNativeControls();

    // Restaura progresso
    restoreProgress();

    console.log("Player inicializado com sucesso!");
    console.log("Controles nativos ativados");
});
