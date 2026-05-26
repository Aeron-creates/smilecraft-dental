// =========================
// UPDATED script.js
// =========================



// =========================
// PREMIUM CAROUSEL
// =========================

const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentIndex = 0;
let autoSlide;

// UPDATE SLIDE

function updateCarousel() {
  
  track.style.transform =
    `translateX(-${currentIndex * 100}%)`;
  
  dots.forEach(dot => dot.classList.remove("active"));
  
  dots[currentIndex].classList.add("active");
}

// NEXT

function nextSlide() {
  
  currentIndex++;
  
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  
  updateCarousel();
}

// PREVIOUS

function prevSlide() {
  
  currentIndex--;
  
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  
  updateCarousel();
}

// BUTTONS

nextBtn.addEventListener("click", () => {
  
  nextSlide();
  
  restartAutoSlide();
  
});

prevBtn.addEventListener("click", () => {
  
  prevSlide();
  
  restartAutoSlide();
  
});

// DOTS

dots.forEach((dot, index) => {
  
  dot.addEventListener("click", () => {
    
    currentIndex = index;
    
    updateCarousel();
    
    restartAutoSlide();
    
  });
  
});

// AUTO SLIDE

function startAutoSlide() {
  
  autoSlide = setInterval(() => {
    
    nextSlide();
    
  }, 4000);
  
}

// RESTART AUTO

function restartAutoSlide() {
  
  clearInterval(autoSlide);
  
  startAutoSlide();
}

// START

startAutoSlide();

// TOUCH SUPPORT

let startX = 0;

track.addEventListener("touchstart", e => {
  
  startX = e.touches[0].clientX;
  
});

track.addEventListener("touchend", e => {
  
  let endX = e.changedTouches[0].clientX;
  
  if (startX - endX > 50) {
    
    nextSlide();
    
  }
  
  else if (endX - startX > 50) {
    
    prevSlide();
    
  }
  
  restartAutoSlide();
  
});

const form = document.getElementById("consultationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function(e) {

  e.preventDefault();

  const formData = new FormData(form);

  try {

    const response = await fetch(form.action, {

      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }

    });

    if (response.ok) {

      successMessage.classList.remove("hidden");

      form.reset();

      setTimeout(() => {

        successMessage.classList.add("hidden");

      }, 4000);

    } else {

      alert("Something went wrong. Please try again.");

    }

  } catch(error) {

    alert("Network error. Please try again.");

  }

});
