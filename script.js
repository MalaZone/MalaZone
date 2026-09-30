document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-item');
  
  if (!carousel || slides.length === 0) return;

  let currentIndex = 0;
  const intervalTime = 4000; // 4 secondi per slide

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    const targetSlide = slides[currentIndex];
    
    carousel.scrollTo({
      left: targetSlide.offsetLeft,
      behavior: 'smooth'
    });
  }

  let slideInterval = setInterval(nextSlide, intervalTime);

  // Mette in pausa lo scorrimento al passaggio del mouse
  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  });
});