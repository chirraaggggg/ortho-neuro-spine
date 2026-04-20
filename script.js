const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const yearEl = document.getElementById('year');
const appointmentForm = document.getElementById('appointmentForm');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target || 0);
  const duration = 1400;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);
    counter.textContent = value.toLocaleString('en-IN');
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (appointmentForm) {
  appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(appointmentForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const condition = formData.get('condition');
    const branch = formData.get('branch');
    const date = formData.get('date');

    const message = `Namaste, I want to book an appointment.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ACondition: ${encodeURIComponent(condition)}%0APreferred Branch: ${encodeURIComponent(branch)}%0APreferred Date: ${encodeURIComponent(date)}`;
    const whatsappURL = `https://wa.me/919693614502?text=${message}`;

    window.open(whatsappURL, '_blank', 'noopener');
    appointmentForm.reset();
  });
}
