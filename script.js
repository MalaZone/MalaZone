document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const originalSlides = document.querySelectorAll('.carousel-slide');
  
  if (!track || originalSlides.length === 0) return;

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
        
        // Forza il browser a registrare il reset prima di riattivare le transizioni
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
});