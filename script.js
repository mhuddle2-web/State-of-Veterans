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

  // FIXED: Explicitly exclude #heroLogoLink from smooth-scrolling interceptor
  const navLinks = document.querySelectorAll("#mainNav a, .hero-actions a:not(#heroLogoLink), .dialogue-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

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
      if (!href || !href.startsWith("#") || href === "#") return;

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
// HERO LOGO EASTER EGG (FAILSAFE TRIGGER & AUDIO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const thankYouDialogue = document.getElementById("thankYouDialogue");
  const patrioticAudio = document.getElementById("patrioticAudio");

  // Global click handler to capture clicks directly on the hero logo or its image
  document.addEventListener("click", (e) => {
    const heroLink = e.target.closest("#heroLogoLink");

    if (heroLink) {
      e.preventDefault();
      e.stopPropagation();

      // 1. Open Dialogue Box
      if (thankYouDialogue) {
        if (typeof thankYouDialogue.showModal === "function") {
          thankYouDialogue.showModal();
        } else {
          thankYouDialogue.setAttribute("open", "true");
        }
      }

      // 2. Play Audio
      if (patrioticAudio) {
        patrioticAudio.volume = 0.3; // Set safe volume
        patrioticAudio.currentTime = 0; // Restart track

        const playPromise = patrioticAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Audio playback error:", err);
          });
        }
      }
    }
  });

  // Function to close box and stop music
  const stopAudioAndClose = () => {
    if (thankYouDialogue) {
      if (typeof thankYouDialogue.close === "function") {
        thankYouDialogue.close();
      } else {
        thankYouDialogue.removeAttribute("open");
      }
    }
    if (patrioticAudio) {
      patrioticAudio.pause();
      patrioticAudio.currentTime = 0;
    }
  };

  // Close button listeners
  const closeBtn1 = document.getElementById("closeThankYouBtn");
  const closeBtn2 = document.getElementById("modalCloseActionBtn");

  if (closeBtn1) closeBtn1.addEventListener("click", stopAudioAndClose);
  if (closeBtn2) closeBtn2.addEventListener("click", stopAudioAndClose);

  // Close when clicking outside the modal
  if (thankYouDialogue) {
    thankYouDialogue.addEventListener("click", (e) => {
      const rect = thankYouDialogue.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        stopAudioAndClose();
      }
    });
  }
});

// Website Designed & Developed by David Huddleston, with contributions from Dale E. Justice & Frank C. Mons.
/**
 */
