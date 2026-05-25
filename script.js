// =========================
// UPDATED script.js
// =========================

// CHAT WINDOW

const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const chatWindow = document.getElementById("chatWindow");

openChat.addEventListener("click", () => {
  chatWindow.classList.remove("hidden");
});

closeChat.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

// CHATBOT SYSTEM

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  
  const text = userInput.value.trim();
  
  if (text === "") return;
  
  addMessage(text, "user-msg");
  
  const response = getAIResponse(text);
  
  setTimeout(() => {
    addMessage(response, "ai-msg");
  }, 500);
  
  userInput.value = "";
}

function addMessage(text, className) {
  
  const div = document.createElement("div");
  
  div.className = className;
  
  div.innerText = text;
  
  chatMessages.appendChild(div);
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(input) {
  
  input = input.toLowerCase();
  
  if (input.includes("whitening")) {
    return "Yes! Teeth whitening starts at $199.";
  }
  
  if (input.includes("appointment")) {
    return "We have appointments available tomorrow at 11:00 AM.";
  }
  
  if (input.includes("insurance")) {
    return "Yes! We accept most major insurance providers.";
  }
  
  if (input.includes("hours")) {
    return "Our clinic is open from 9 AM to 8 PM.";
  }
  
  if (input.includes("emergency")) {
    return "Yes, we provide 24/7 emergency dental care.";
  }
  
  if (input.includes("location")) {
    return "We are located at 245 Madison Avenue, New York.";
  }
  
  return "Our team will be happy to assist you with that.";
}

// FORM VALIDATION

const form = document.getElementById("consultationForm");

form.addEventListener("submit", function(e) {
  
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  
  if (name.length < 3) {
    
    alert("Please enter a valid full name.");
    
    return;
  }
  
  if (phone.length !== 10) {
    
    alert("Phone number must be exactly 10 digits.");
    
    return;
  }
  
  alert("Consultation request submitted successfully!");
  
  form.reset();
  
});

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
