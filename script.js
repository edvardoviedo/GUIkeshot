// DOM Elements
const toggleButtons = document.querySelectorAll(".toggle-btn");
const navArrows = document.querySelectorAll(".nav-arrow");
const actionButtons = document.querySelectorAll(".action-btn");
const shareButton = document.querySelector(".share-btn");
const closeButton = document.querySelector(".close-btn");
const previewImage = document.querySelector(".preview-image");
const styleName = document.querySelector(".style-name");
const sliderThumb = document.querySelector(".slider-thumb");
const sliderTrack = document.querySelector(".slider-track");

// Style options
const styles = [
  {
    name: "Floral",
    image:
      "https://raw.githubusercontent.com/edvardoviedo/GUIkeshot/refs/heads/main/IA_photo.jpg",
  },
  {
    name: "Portrait",
    image:
      "https://raw.githubusercontent.com/edvardoviedo/GUIkeshot/refs/heads/main/IA_photo.jpg",
  },
  {
    name: "Abstract",
    image:
      "https://raw.githubusercontent.com/edvardoviedo/GUIkeshot/refs/heads/main/IA_photo.jpg",
  },
  {
    name: "Vintage",
    image:
      "https://raw.githubusercontent.com/edvardoviedo/GUIkeshot/refs/heads/main/IA_photo.jpg",
  },
];

let currentStyleIndex = 0;
let currentSkinTone = "light";

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  initializeToggleButtons();
  initializeNavigation();
  initializeActions();
  initializeSlider();
  updateStyleDisplay();
});

// Slider Functionality
function initializeSlider() {
  if (!sliderThumb || !sliderTrack) return;

  sliderThumb.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  sliderTrack.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackWidth = rect.width;
    const thumbWidth = 32;
    const padding = 20;
    const availableWidth = trackWidth - thumbWidth - padding * 2;

    let newPosition;
    let newValue;

    if (clickX < trackWidth / 3) {
      newPosition = 4;
      newValue = "light";
    } else if (clickX < (trackWidth * 2) / 3) {
      newPosition = "50%";
      newValue = "medium";
    } else {
      newPosition = "auto";
      newValue = "dark";
    }

    updateSliderPosition(newValue);
    currentSkinTone = newValue;

    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  });
}

function updateSliderPosition(value) {
  sliderThumb.className = "slider-thumb";
  sliderThumb.dataset.value = value;

  if (value === "medium") {
    sliderThumb.classList.add("medium");
  } else if (value === "dark") {
    sliderThumb.classList.add("dark");
  }
}

// Toggle Button Functionality
function initializeToggleButtons() {
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const group = this.parentElement;
      const siblings = group.querySelectorAll(".toggle-btn");

      // Remove active class from siblings
      siblings.forEach((sibling) => {
        sibling.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Add haptic feedback for mobile
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }

      // Animate button
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });
}

// Navigation Functionality
function initializeNavigation() {
  const leftArrow = document.querySelector(".nav-arrow-left");
  const rightArrow = document.querySelector(".nav-arrow-right");

  leftArrow.addEventListener("click", function () {
    currentStyleIndex = (currentStyleIndex - 1 + styles.length) % styles.length;
    updateStyleDisplay();
    animateImageTransition("left");
  });

  rightArrow.addEventListener("click", function () {
    currentStyleIndex = (currentStyleIndex + 1) % styles.length;
    updateStyleDisplay();
    animateImageTransition("right");
  });
}

// Update Style Display
function updateStyleDisplay() {
  const currentStyle = styles[currentStyleIndex];
  styleName.textContent = currentStyle.name;

  // Update image with fade effect
  previewImage.style.opacity = "0.7";
  setTimeout(() => {
    previewImage.src = currentStyle.image;
    previewImage.style.opacity = "1";
  }, 200);
}

// Animate Image Transition
function animateImageTransition(direction) {
  const translateX = direction === "left" ? "-10px" : "10px";

  previewImage.style.transform = `translateX(${translateX})`;
  setTimeout(() => {
    previewImage.style.transform = "translateX(0)";
  }, 300);
}

// Action Button Functionality
function initializeActions() {
  const backButton = document.querySelector(".action-btn.secondary");
  const nextButton = document.querySelector(".action-btn.primary");

  backButton.addEventListener("click", function () {
    // Add ripple effect
    createRipple(this, event);

    // Simulate back action
    console.log("Back button clicked");

    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
  });

  nextButton.addEventListener("click", function () {
    // Add ripple effect
    createRipple(this, event);

    // Simulate next action
    console.log("Next button clicked");

    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }

    // Show success animation
    showSuccessAnimation();
  });

  // Share button functionality
  if (shareButton) {
    shareButton.addEventListener("click", function () {
      // Add ripple effect
      createRipple(this, event);

      // Simulate share action
      console.log("Share button clicked");

      // Add haptic feedback
      if (navigator.vibrate) {
        navigator.vibrate(25);
      }

      // Show share animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  }

  // Close button functionality
  closeButton.addEventListener("click", function () {
    // Add close animation
    document.querySelector(".mobile-card").style.transform = "scale(0.95)";
    document.querySelector(".mobile-card").style.opacity = "0";

    setTimeout(() => {
      console.log("Close button clicked");
    }, 300);
  });
}

// Create Ripple Effect
function createRipple(button, event) {
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;

  button.style.position = "relative";
  button.style.overflow = "hidden";
  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Success Animation
function showSuccessAnimation() {
  const card = document.querySelector(".mobile-card");
  card.style.transform = "scale(1.02)";

  setTimeout(() => {
    card.style.transform = "scale(1)";
  }, 200);
}

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Touch gesture support for mobile
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
  if (!startX || !startY) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const diffX = startX - endX;
  const diffY = startY - endY;

  // Only trigger if horizontal swipe is more significant than vertical
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      // Swipe left - next style
      currentStyleIndex = (currentStyleIndex + 1) % styles.length;
      updateStyleDisplay();
      animateImageTransition("right");
    } else {
      // Swipe right - previous style
      currentStyleIndex =
        (currentStyleIndex - 1 + styles.length) % styles.length;
      updateStyleDisplay();
      animateImageTransition("left");
    }
  }

  startX = 0;
  startY = 0;
});

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowLeft":
      currentStyleIndex =
        (currentStyleIndex - 1 + styles.length) % styles.length;
      updateStyleDisplay();
      animateImageTransition("left");
      break;
    case "ArrowRight":
      currentStyleIndex = (currentStyleIndex + 1) % styles.length;
      updateStyleDisplay();
      animateImageTransition("right");
      break;
    case "Enter":
      document.querySelector(".action-btn.primary").click();
      break;
    case "Escape":
      document.querySelector(".close-btn").click();
      break;
  }
});

// Preload images for smooth transitions
styles.forEach((style) => {
  const img = new Image();
  img.src = style.image;
});
