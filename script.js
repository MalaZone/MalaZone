// DEFANIAMO IL COMPONENTE DINAMICO NAVBAR
class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="navbar bg-white text-base-content border-b border-gray-100 px-4 lg:px-8 sticky top-0 z-50">
        <div class="navbar-start">
          <a href="index.html" class="btn btn-ghost p-1 flex items-center">
            <img src="media/logo.png" alt="Mala Zone Logo" class="h-10 w-auto object-contain" />
          </a>
        </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1 font-medium gap-2">
            <li><a href="chi-siamo.html">Chi siamo</a></li>
            <li><a href="eventi.html">Eventi</a></li>
            <li><a href="contatti.html">Contatti</a></li>
          </ul>
        </div>

        <div class="navbar-end">
          <a href="socio.html" class="btn btn-primary btn-sm hidden lg:inline-flex">Diventa socio</a>

          <div class="dropdown dropdown-end lg:hidden">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-white rounded-box w-56 gap-2">
              <li><a href="chi-siamo.html">Chi siamo</a></li>
              <li><a href="eventi.html">Eventi</a></li>
              <li><a href="contatti.html">Contatti</a></li>
              <div class="divider my-1"></div>
              <li><a href="contatti.html" class="btn btn-primary btn-sm text-white">Diventa socio</a></li>
            </ul>
          </div>
        </div>
      </header>
    `;
  }
}

// DEFINIAMO IL COMPONENTE DINAMICO FOOTER
class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="social" class="footer footer-center p-6 bg-white border-t border-gray-100 text-base-content mt-12">
        <aside>
          <p>© 2026 Mala Zone - Tutti i diritti riservati</p>
        </aside>
      </footer>
    `;
  }
}

// REGISTRIAMO I NUOVI TAG HTML PERSONALIZZATI
customElements.define('custom-navbar', CustomNavbar);
customElements.define('custom-footer', CustomFooter);

// LOGICA SLIDER
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
});

function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const originalSlides = track.querySelectorAll('.carousel-slide');
  if (originalSlides.length === 0) return;

  const firstSlideClone = originalSlides[0].cloneNode(true);
  track.appendChild(firstSlideClone);

  let currentIndex = 0;
  const intervalTime = 4000;
  const totalSlides = originalSlides.length;

  function moveToNextSlide() {
    currentIndex++;
    track.style.transition = 'transform 0.7s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === totalSlides) {
      setTimeout(() => {
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = 'translateX(0%)';
      }, 700);
    }
  }

  let slideInterval = setInterval(moveToNextSlide, intervalTime);

  track.addEventListener('mouseenter', () => clearInterval(slideInterval));
  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(moveToNextSlide, intervalTime);
  });
}