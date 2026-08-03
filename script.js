document.addEventListener('DOMContentLoaded', () => {
  const donationForm = document.querySelector('.donation-box form');
  const amountInput = document.getElementById('donation-amount');
  const messageInput = document.getElementById('message');

  if (!donationForm || !amountInput) {
    return;
  }

  const status = document.createElement('p');
  status.className = 'donation-status';
  status.setAttribute('aria-live', 'polite');
  donationForm.appendChild(status);

  donationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const message = messageInput.value.trim();

    if (Number.isNaN(amount) || amount < 1) {
      status.textContent = 'Please enter a valid donation amount of at least $1.';
      status.classList.add('error');
      return;
    }

    status.textContent = `Thank you for your donation of $${amount.toFixed(2)}!` +
      (message ? ` Your message: "${message}" has been received.` : '');
    status.classList.remove('error');

    donationForm.reset();
  });
});
