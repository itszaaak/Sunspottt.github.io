document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector('.about-container');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutSection.style.opacity = 1;
        aboutSection.style.transform = 'translateY(0)';
        observer.unobserve(aboutSection);
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(aboutSection);
});

const favoritesList = document.getElementById('favoritesList');

function addFavoriteSpot(title, description) {
  // Supprime le message vide s’il est présent
  const emptyMsg = document.querySelector('.empty-msg');
  if (emptyMsg) emptyMsg.remove();

  const card = document.createElement('div');
  card.className = 'favorite-card';

  card.innerHTML = `
    <h3 class="favorite-title">${title}</h3>
    <p class="favorite-desc">${description}</p>
  `;

  favoritesList.appendChild(card);
}

// Exemple d’appel (à adapter à ton système de favoris réel)
addFavoriteSpot("Uluwatu, Bali", "Perfect spot for golden hour over cliffs.");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("lightboxImg").src = img.src;
    document.getElementById("lightbox").classList.remove("hidden");
  });
});

document.getElementById("closeLightbox").addEventListener("click", () => {
  document.getElementById("lightbox").classList.add("hidden");
});

const burger = document.getElementById('burgerBtn');
const nav = document.querySelector('.nav-links');

// Toggle menu
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Scroll animation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    burger.classList.add('scrolled');
  } else {
    burger.classList.remove('scrolled');
  }
});
