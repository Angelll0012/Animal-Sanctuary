
document.addEventListener("DOMContentLoaded", () => {
  // Form and input elements used by the script
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");
  if (!form || !nameInput || !emailInput) return;

  // status element: visible feedback for validation / success messages
  const status = document.createElement("p");
  status.className = "contact-status";
  status.setAttribute("aria-live", "polite");
  form.appendChild(status);

  const STORAGE_KEY = "contactForm";

  // Attempt to restore a saved draft from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.name) nameInput.value = data.name;
      if (data.email) emailInput.value = data.email;
      if (data.message) messageInput.value = data.message;
    }
  } catch (e) {
    // If retrieval/parsing fails, ignore and continue
  }

  // Handle form submission: validate, show status, clear draft
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput ? messageInput.value.trim() : "";

    // Basic required-field validation
    if (!name || !email) {
      status.textContent = "Please provide your name and email.";
      status.classList.add("error");
      return;
    }

    // Basic email format check to catch obvious typos
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("error");
      return;
    }

    // Show success and clear the form
    status.textContent = `Thanks ${name.split(" ")[0]} — we received your message.`;
    status.classList.remove("error");
    form.reset();

    // Remove saved draft after successful submit
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  });

  // Save a lightweight draft on input so users don't lose typing
  const saveDraft = () => {
    try {
      const data = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput ? messageInput.value : "",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore storage errors (quota, private mode)
    }
  };

  nameInput.addEventListener("input", saveDraft);
  emailInput.addEventListener("input", saveDraft);
  if (messageInput) messageInput.addEventListener("input", saveDraft);
});
