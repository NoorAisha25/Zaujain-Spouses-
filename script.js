/* ================ SMOOTH SCROLL FOR NAVIGATION ================ */
document.querySelectorAll('nav .nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Set active class
      document.querySelectorAll('nav .nav-links a').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

/* ================ COUNTDOWN TIMERS LOGIC ================ */
function initCountdown(elementId, eventDateStr) {
  const countdownEl = document.getElementById(elementId);
  const eventDate = new Date(eventDateStr).getTime();

  function updateCountdown() {
    const now = Date.now();
    let diff = eventDate - now;
    if (diff < 0) diff = 0;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (diff === 0) {
      countdownEl.innerHTML = `<span class="countdown-ended">Event Started</span>`;
      return true; // Stop the interval
    } else {
      countdownEl.innerHTML = `
        <div class="countdown-segment"><span>${d}</span><span class="countdown-label">Days</span></div>
        <div class="countdown-segment"><span>${h.toString().padStart(2, '0')}</span><span class="countdown-label">Hrs</span></div>
        <div class="countdown-segment"><span>${m.toString().padStart(2, '0')}</span><span class="countdown-label">Min</span></div>
        <div class="countdown-segment"><span>${s.toString().padStart(2, '0')}</span><span class="countdown-label">Sec</span></div>
      `;
      return false;
    }
  }

  updateCountdown(); // Initial render
  const timer = setInterval(() => {
    if (updateCountdown()) clearInterval(timer);
  }, 1000);
}

// Initialize timers for each event (Update with real event dates/times)
initCountdown("nikah-timer", "2026-01-01T22:00:00+05:30");    // India Standard Time
initCountdown("rukhsati-timer", "2026-01-02T01:00:00+05:30");
initCountdown("walima-timer", "2026-01-04T19:00:00+05:30");

/* ================ SCROLL SPY FOR ACTIVE NAV LINK ================ */
const sectionIds = ['our-story', 'key-events', 'venue','wedding-ceremony', 'rsvp'];
const navLinks = sectionIds.map(id => document.querySelector(`nav .nav-links a[href="#${id}"]`));
window.addEventListener('scroll', () => {
  let fromTop = window.scrollY + 150;
  sectionIds.forEach((id, idx) => {
    const section = document.getElementById(id);
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navLinks.forEach(l => l.classList.remove('active'));
      navLinks[idx].classList.add('active');
    }
  });
});