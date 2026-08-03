document.addEventListener("DOMContentLoaded", () => {
  // Wait for the DOM to be ready so form elements can be found safely
  // prevents JavaScript from trying to find HTML elements before they exist

  // Select the donation form and the relevant input fields
  const donationForm = document.querySelector(".donation-box form");
  const amountInput = document.getElementById("donation-amount");
  const messageInput = document.getElementById("message");

  // If the form or amount field is missing, stop executing
  // The message input is optional and may not exist in all layouts
  if (!donationForm || !amountInput) {
    return;
  }

  // Create a dedicated status paragraph for validation and messages
  const status = document.createElement("p");
  status.className = "donation-status";
  // Use aria-live so screen readers announce updates automatically
  status.setAttribute("aria-live", "polite");
  donationForm.appendChild(status);

  donationForm.addEventListener("submit", (event) => {
    // Prevent the normal form submission to handle it in JavaScript
    event.preventDefault();

    // Convert the donation amount from text to a number
    const amount = Number(amountInput.value);
    // Remove extra whitespace from the message field
    const message = messageInput.value.trim();

    // Reject invalid input: non-numbers or amounts smaller than $1
    if (Number.isNaN(amount) || amount < 1) {
      status.textContent =
        "Please enter a valid donation amount of at least $1.";
      status.classList.add("error");
      return;
    }

    // Build the success message and conditionally include the donor note
    status.textContent =
      `Thank you for your donation of $${amount.toFixed(2)}!` +
      (message ? ` Your message: "${message}" has been received.` : "");
    status.classList.remove("error");

    // Clear the form inputs so the user sees a fresh form state
    donationForm.reset();
  });
});
