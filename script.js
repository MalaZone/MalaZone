document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const originalSlides = document.querySelectorAll('.carousel-slide');
  
  if (!track || originalSlides.length === 0) return;

  // Clona la prima slide per creare l'effetto infinito continuo
  const firstSlideClone = originalSlides[0].cloneNode(true);
  track.appendChild(firstSlideClone);

  let currentIndex = 0;
  const intervalTime = 4000; // 4 secondi per slide
  const totalSlides = originalSlides.length; // 3 slide originali

  function moveToNextSlide() {
    currentIndex++;
    
    // Attiva la transizione fluida (0.7 secondi)
    track.style.transition = 'transform 0.7s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Quando arriva al clone (subito dopo l'ultima slide)
    if (currentIndex === totalSlides) {
      setTimeout(() => {
        // Disattiva la transizione e salta istantaneamente alla vera prima slide
        track.style.transition = 'none';
        currentIndex = 0;
        track.style.transform = `translateX(0%)`;
      }, 700); // Deve coincidere con i 0.7s della transizione CSS
    }
  }

  let slideInterval = setInterval(moveToNextSlide, intervalTime);

  // Pausa al passaggio del mouse
  track.addEventListener('mouseenter', () => clearInterval(slideInterval));
  track.addEventListener('mouseleave', () => {
    slideInterval = setInterval(moveToNextSlide, intervalTime);
  });
});