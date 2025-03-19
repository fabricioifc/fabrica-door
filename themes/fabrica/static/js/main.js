document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

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

  // Opcional: efeito de scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});

// Espera o DOM ser carregado completamente
document.addEventListener("DOMContentLoaded", function () {
  // Verifica se estamos na página de contato
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      // Coletando os dados do formulário
      const formData = new FormData(this);
      let formText = "";
      formData.forEach((value, key) => {
        formText += `${key}: ${value}\n`;
      });
      const formEntries = Object.fromEntries(formData);

      // Criando o corpo da requisição
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

          // Feedback visual
          const formMessage = document.createElement("div");
          formMessage.className = "form-message success";
          formMessage.textContent =
            "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.";
          contactForm.appendChild(formMessage);
          contactForm.reset();
        } else {
          // Exiba mensagem mais detalhada
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

  // Adiciona efeito de scroll smooth para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Adiciona classe de ativo ao item de menu correspondente à página atual
  const currentPage = window.location.pathname;
  document.querySelectorAll("nav a").forEach((link) => {
    if (
      link.getAttribute("href") === currentPage ||
      link.getAttribute("href") ===
        currentPage.substring(currentPage.lastIndexOf("/"))
    ) {
      link.classList.add("active");
    }
  });

  // Adiciona animação de entrada para elementos quando eles entram na viewport
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

  // Adiciona a classe para animação de entrada inicial
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Adiciona estilo para a classe visible em runtime (para não depender do CSS)
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
