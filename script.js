// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close navbar when link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Year in footer
const dateEl = document.getElementById("datee");
if (dateEl) {
  dateEl.textContent = new Date().getFullYear();
}

// Form Handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const submitBtn = document.getElementById("submit-btn");
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        formStatus.innerHTML = "<p style='color: #28a745; margin-top: 1rem; font-weight: 600;'>Thanks! Your message has been sent successfully.</p>";
        contactForm.reset();
      } else {
        const errorData = await response.json();
        formStatus.innerHTML = `<p style='color: #dc3545; margin-top: 1rem;'>Oops! ${errorData.errors.map(error => error.message).join(", ")}</p>`;
      }
    } catch (error) {
      formStatus.innerHTML = "<p style='color: #dc3545; margin-top: 1rem;'>Oops! There was a problem submitting your form.</p>";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}