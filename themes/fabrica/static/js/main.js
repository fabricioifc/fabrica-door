// Espera o DOM ser carregado completamente
document.addEventListener("DOMContentLoaded", function () {
  // Adiciona comportamento ao menu mobile
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "<span></span><span></span><span></span>";

  const nav = document.querySelector("nav");
  if (window.innerWidth <= 768) {
    nav.parentNode.insertBefore(menuToggle, nav);

    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // Verifica se estamos na página de contato
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simula envio de formulário
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";

      // Simulação de requisição AJAX (apenas para demonstração)
      setTimeout(function () {
        submitButton.textContent = "Mensagem enviada!";

        // Feedback visual
        const formMessage = document.createElement("div");
        formMessage.className = "form-message success";
        formMessage.textContent =
          "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.";

        contactForm.appendChild(formMessage);
        contactForm.reset();

        // Restaura o botão após 3 segundos
        setTimeout(function () {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 3000);
      }, 1500);
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
