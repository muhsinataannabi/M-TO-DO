
const slides = document.querySelectorAll('.slide');
const startBtn = document.querySelector('.start-btn');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
    }
  });
}

function nextSlide() {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

// Show button always
startBtn.style.display = "inline-block";

showSlide(currentSlide);
setInterval(nextSlide, 3000);
