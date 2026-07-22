// ==========================================
//  DYNAMIC YEAR UPDATE
// ==========================================
document.getElementById("year").textContent = new Date().getFullYear();

// ==========================================
//  MOBILE NAVIGATION TOGGLE & SNAPPING
// ==========================================
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  const navLinks = document.querySelectorAll("#mainNav a, .hero-actions a, .dialogue-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      const rect = el.getBoundingClientRect();
      let targetY;

      if (id === "who-we-are" || id === "what-motivates-us" || id === "sov-news") {
        const headerOffset = 30;
        targetY = window.scrollY + rect.top - headerOffset;
      } else {
        targetY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
      }

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "instant"
      });

      mainNav.classList.remove("open");
    });
  });
}

// ==========================================
//  CRISIS LINE BANNER ROTATOR
// ==========================================
const crisisRotator = document.getElementById("crisisRotator");

const crisisImages = [
  "images/Spread the Word_Email Signatures.png",
  "images/Spread the Word_Email Signatures-15.png",
  "images/Spread the Word_Email Signatures-16.png",
  "images/Spread the Word_Email Signatures-01.png"
];

let currentCrisisImage = 0;

if (crisisRotator) {
  setInterval(() => {
    currentCrisisImage = (currentCrisisImage + 1) % crisisImages.length;
    crisisRotator.src = crisisImages[currentCrisisImage];
  }, 7000);
}

// ==========================================
//  FLOATING CONTROLS VISIBILITY (MENU & BACK TO TOP)
// ==========================================
const backToTop = document.getElementById("backToTop");
const floatingMenuBtn = document.getElementById("floatingMenuBtn");

function toggleFloatingControls() {
  if (window.scrollY > 400) {
    if (backToTop) backToTop.style.display = "inline-flex";
    if (floatingMenuBtn) floatingMenuBtn.style.display = "inline-flex";
  } else {
    if (backToTop) backToTop.style.display = "none";
    if (floatingMenuBtn) floatingMenuBtn.style.display = "none";
  }
}

if (backToTop) {
  backToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  });
}

window.addEventListener("scroll", toggleFloatingControls);
window.addEventListener("load", toggleFloatingControls);

// ==========================================
//  FLOATING MENU DIALOGUE BOX CONTROLS
// ==========================================
const menuDialogue = document.getElementById("menuDialogue");
const closeDialogueBtn = document.getElementById("closeDialogueBtn");

if (menuDialogue && floatingMenuBtn && closeDialogueBtn) {
  floatingMenuBtn.addEventListener("click", () => {
    menuDialogue.showModal();
  });

  closeDialogueBtn.addEventListener("click", () => {
    menuDialogue.close();
  });

  menuDialogue.addEventListener("click", (e) => {
    const dialogDimensions = menuDialogue.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      menuDialogue.close();
    }
  });

  const dialogueLinks = menuDialogue.querySelectorAll("a");
  dialogueLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      menuDialogue.close();

      const rect = el.getBoundingClientRect();
      let targetY;

      if (id === "who-we-are" || id === "what-motivates-us") {
        const headerOffset = 30;
        targetY = window.scrollY + rect.top - headerOffset;
      } else {
        targetY = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
      }

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: "instant"
      });
    });
  });
}

// ==========================================
//  HERO LOGO -> THANK YOU DIALOGUE & PATRIOTIC AUDIO
// ==========================================
const heroLogoLink = document.getElementById("heroLogoLink");
const thankYouDialogue = document.getElementById("thankYouDialogue");
const closeThankYouBtn = document.getElementById("closeThankYouBtn");
const modalCloseActionBtn = document.getElementById("modalCloseActionBtn");
const patrioticAudio = document.getElementById("patrioticAudio");

if (heroLogoLink && thankYouDialogue) {
  heroLogoLink.addEventListener("click", (e) => {
    e.preventDefault();

    // 1. Open dialogue box
    thankYouDialogue.showModal();

    // 2. Play Audio at 50% Volume
    if (patrioticAudio) {
      patrioticAudio.volume = 0.5; // Set volume to 50%
      patrioticAudio.currentTime = 0; // Play from beginning
      patrioticAudio.play().catch((err) => {
        console.warn("Audio play error:", err);
      });
    }
  });

  // Close handler function that stops the audio
  const closeThankYouModal = () => {
    thankYouDialogue.close();
    if (patrioticAudio) {
      patrioticAudio.pause();
      patrioticAudio.currentTime = 0;
    }
  };

  if (closeThankYouBtn) closeThankYouBtn.addEventListener("click", closeThankYouModal);
  if (modalCloseActionBtn) modalCloseActionBtn.addEventListener("click", closeThankYouModal);

  // Close when clicking outside the modal box backdrop
  thankYouDialogue.addEventListener("click", (e) => {
    const rect = thankYouDialogue.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      closeThankYouModal();
    }
  });
}
// Website Designed & Developed by David Huddleston, with contributions from Dale E. Justice & Frank C. Mons.
/**
 * Copyright (c) 2026 David Huddleston. All rights reserved.
 * Lead Website Development | Full-Stack Web Developer
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */
