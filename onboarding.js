const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
  // Remove "active" class from current slide
  slides[currentSlide].classList.remove("active");

  // Move to next slide
  currentSlide++;

  // If we're past the last slide, stop OR loop back to first
  if (currentSlide >= slides.length) {
    currentSlide = 0; // <-- If you want to loop forever
    // return;        // <-- Or stop forever after the last one
  }

  // Add "active" class to the next slide
  slides[currentSlide].classList.add("active");
}

// Slide changes every 3 seconds
setInterval(nextSlide, 3000);