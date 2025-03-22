document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");
  const header = document.querySelector("header#header");
  const scrollHint = document.querySelector(".scroll-hint");

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

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      const formData = new FormData(this);
      let formText = "";
      formData.forEach((value, key) => {
        formText += `${key}: ${value}\n`;
      });
      const formEntries = Object.fromEntries(formData);

      const emailData = {
        destinatario: "fabricio.bizotto@ifc.edu.br",
        assunto: "[Fábrica] Nova mensagem de contato",
        corpo: window.createContactEmailBody(formEntries),
      };

      try {
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
          submitButton.textContent = "Mensagem enviada!";
          const formMessage = document.createElement("div");
          formMessage.className = "form-message success";
          formMessage.textContent = "Sua mensagem foi enviada com sucesso.";
          contactForm.appendChild(formMessage);
          contactForm.reset();
        } else {
          const errorData = await response.text();
          console.error("Erro na resposta:", response.status, errorData);
          throw new Error(
            `Erro ao enviar o e-mail. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
        alert("Falha ao enviar a mensagem. Tente novamente mais tarde.");
      } finally {
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 3000);
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
