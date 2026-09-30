document.addEventListener('DOMContentLoaded', () => {
  // 1. CARICAMENTO COMPONENTI DINAMICI (Navbar, Footer, Sezioni)
  const includes = document.querySelectorAll('[data-include]');
  
  const loadComponents = Array.from(includes).map(el => {
    const file = el.getAttribute('data-include');
    return fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Errore caricamento ${file}`);
        return response.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => console.error(err));
  });

  // 2. INIZIALIZZAZIONE SLIDER (dopo che l'HTML principale è pronto)
  Promise.all(loadComponents).then(() => {
    initCarousel();
  });
});

function initCarousel() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  const originalSlides = track.querySelectorAll('.carousel-slide');
  if (originalSlides.length === 0) return;

  // Clona la prima slide per il loop continuo
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
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {});
        });
      }, 700);
    }
  }

  let slideInterval = setInterval(moveToNextSlide, intervalTime);

  track.addEventListener('mouseenter', () => clearInterval(slideInterval));
  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(moveToNextSlide, intervalTime);
  });
}