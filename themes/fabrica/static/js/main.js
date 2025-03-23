document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const header = document.querySelector("header#header");
  const scrollHint = document.querySelector(".scroll-hint");

  // Para evitar que todas as animações aconteçam de uma vez
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".page-content, .team-member, .footer-content")
    .forEach((el) => {
      observer.observe(el);
    });

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Efeito de scroll no header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Navegação por teclado entre seções e footer
  const sections = document.querySelectorAll("section");
  const footer = document.querySelector("footer");
  const navigableElements = [...sections, footer].filter(Boolean);
  let currentElementIndex = 0;

  // Obtém a altura do header dinamicamente
  const getHeaderHeight = () => {
    return (
      header.getBoundingClientRect().height ||
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--header-height"
        )
      ) ||
      40
    );
  };

  // Função para rolar até um elemento específico
  const scrollToElement = (index) => {
    if (index >= 0 && index < navigableElements.length) {
      const headerHeight = getHeaderHeight();
      const element = navigableElements[index];
      const elementTop =
        element.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: elementTop,
        behavior: "smooth",
      });
      currentElementIndex = index;

      // Esconde o botão após navegar
      if (scrollHint && index > 0) {
        scrollHint.classList.add("hidden");
      }
    }
  };

  // Evento de clique no botão de dica
  if (scrollHint) {
    scrollHint.addEventListener("click", () => {
      scrollToElement(1); // Rola para a segunda seção (índice 1)
    });
  }

  // Adiciona evento de teclado
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (currentElementIndex < navigableElements.length - 1) {
          scrollToElement(currentElementIndex + 1);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (currentElementIndex > 0) {
          scrollToElement(currentElementIndex - 1);
        }
        break;
      case "Home":
        e.preventDefault();
        scrollToElement(0);
        break;
      case "End":
        e.preventDefault();
        scrollToElement(navigableElements.length - 1);
        break;
    }
  });

  // Atualiza o índice e visibilidade do botão com base no scroll
  window.addEventListener("scroll", () => {
    const headerHeight = getHeaderHeight();
    navigableElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      if (rect.top <= headerHeight + 10 && rect.bottom >= headerHeight + 10) {
        currentElementIndex = index;
        // Controla a visibilidade do botão
        if (scrollHint) {
          if (index > 0) {
            scrollHint.classList.add("hidden");
          } else {
            scrollHint.classList.remove("hidden");
          }
        }
      }
    });
  });
});

// Formulário de contato e outras funcionalidades
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Limpar mensagens anteriores
      const existingMessage = contactForm.querySelector(".form-message");
      if (existingMessage) existingMessage.remove();

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      // Obter campos do formulário
      const formData = new FormData(this);
      const formEntries = Object.fromEntries(formData);
      const { nome, email, mensagem } = formEntries;

      // Validações
      try {
        // Validar campos obrigatórios
        if (!nome || !email || !mensagem) {
          throw new Error("Todos os campos são obrigatórios");
        }

        // Validar formato do email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          throw new Error("Por favor, insira um email válido");
        }

        // Validar comprimento mínimo
        if (nome.length < 2) {
          throw new Error("O nome deve ter pelo menos 2 caracteres");
        }
        if (mensagem.length < 10) {
          throw new Error("A mensagem deve ter pelo menos 10 caracteres");
        }

        // Prevenir XSS básico
        const sanitizeInput = (input) => {
          const temp = document.createElement("div");
          temp.textContent = input;
          return temp.innerHTML;
        };

        // Preparar dados sanitizados
        const emailData = {
          destinatario: "fabricadesoftware.videira@ifc.edu.br",
          assunto: "[Fábrica] Nova mensagem de contato",
          corpo: window.createContactEmailBody({
            nome: sanitizeInput(nome),
            email: sanitizeInput(email),
            assunto: sanitizeInput(formEntries.assunto),
            origin: window.location.hostname,
            mensagem: sanitizeInput(mensagem),
          }),
        };

        // Desabilitar botão durante o envio
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";

        const response = await fetch(
          "https://fsw-ifc.brdrive.net/services/email/api/enviar-email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(emailData),
          }
        );

        if (response.ok) {
          // Mostrar mensagem de sucesso
          submitButton.textContent = "Enviado!";
          const formMessage = document.createElement("div");
          formMessage.className = "form-message success";
          formMessage.textContent = "Sua mensagem foi enviada com sucesso.";
          contactForm.appendChild(formMessage);
          contactForm.reset();

          // Resetar botão após 2 segundos
          setTimeout(() => {
            submitButton.textContent = originalText;
          }, 2000);
        } else {
          throw new Error("Erro na resposta do servidor");
        }
      } catch (error) {
        // Mostrar mensagem de erro
        const formMessage = document.createElement("div");
        formMessage.className = "form-message error";
        formMessage.textContent =
          error.message || "Falha ao enviar a mensagem. Tente novamente.";
        contactForm.appendChild(formMessage);

        console.error("Erro:", error);
      } finally {
        // Reativar botão em caso de sucesso ou falha
        submitButton.disabled = false;
        if (!contactForm.querySelector(".form-message.success")) {
          submitButton.textContent = originalText;
        }
      }
    });
  }

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document
          .querySelector("header#header")
          .getBoundingClientRect().height;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Classe ativa no menu
  const currentPage = window.location.pathname;
  document.querySelectorAll("nav a").forEach((link) => {
    const linkHref = link.getAttribute("href");
    const normalizedCurrentPage = currentPage.endsWith("/")
      ? currentPage
      : currentPage + "/";
    const normalizedLinkHref = linkHref.endsWith("/")
      ? linkHref
      : linkHref + "/";
    if (normalizedCurrentPage === normalizedLinkHref) {
      link.classList.add("active");
    }
  });

  // Animação de entrada
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".feature-item, .team-member, .project-item"
    );
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("visible");
      }
    });
  };

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  const style = document.createElement("style");
  style.textContent = `
    .feature-item, .team-member, .project-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .feature-item.visible, .team-member.visible, .project-item.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
});

// Funções de feedback
function showFeedback(type, message) {
  clearFeedback();
  const formMessage = document.createElement("div");
  formMessage.className = `form-message ${type}`;
  formMessage.textContent = message;
  formMessage.style.cssText = `
    padding: 10px 15px;
    margin-top: 10px;
    border-radius: 4px;
    font-family: Arial, sans-serif;
    ${
      type === "success"
        ? "background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;"
        : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;"
    }
  `;
  contactForm.appendChild(formMessage);
}

function clearFeedback() {
  const existingMessage = contactForm.querySelector(".form-message");
  if (existingMessage) existingMessage.remove();
}
