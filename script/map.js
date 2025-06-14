// Initialiser la carte centrée sur le monde
const map = L.map('mapid', {
  zoomControl: false,       // cache les boutons de zoom
  scrollWheelZoom: false,   // désactive le zoom avec la molette
  doubleClickZoom: false,   // désactive le zoom au double clic
  dragging: true            // laisse le déplacement possible (à adapter si besoin)
}).setView([20, 0], 2);


// Ajouter le fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Exemple de spots de couchers de soleil
const sunsetSpots = [
  {
    name: "Santorini, Grèce",
    coords: [36.3932, 25.4615],
    description: "Coucher de soleil célèbre depuis Oia.",
    image: "/img/hero.jpg",
    url: "https://fr.wikipedia.org/wiki/Santorin"
  },
  {
    name: "Grand Canyon, USA",
    coords: [36.1069, -112.1129],
    description: "Des couleurs rouges incroyables au crépuscule.",
    image: "/img/hero.jpg",
    url: "https://fr.wikipedia.org/wiki/Grand_Canyon"
  },
  {
    name: "Uluwatu, Bali",
    coords: [-8.8296, 115.083],
    description: "Parfait pour admirer le soleil plonger dans l’océan.",
    image: "/img/hero.jpg",
    url: "https://fr.wikipedia.org/wiki/Uluwatu"
  }
];

// Créer les marqueurs avec popup
sunsetSpots.forEach(spot => {
  const popupContent = `
    <div class="custom-popup">
      <img src="${spot.image}" alt="${spot.name}" class="popup-img" />
      <h3 class="popup-title">${spot.name}</h3>
      <p class="popup-desc">${spot.description}</p>
      <button class="add-fav-btn" onclick='addToFavorites(${JSON.stringify(spot)})'>Ajouter aux favoris</button>
    </div>
  `;

  L.marker(spot.coords)
    .addTo(map)
    .bindPopup(popupContent);
});

// Sauvegarder dans localStorage
function saveFavorites(favorites) {
  localStorage.setItem("sunspotFavorites", JSON.stringify(favorites));
}

// Récupérer les favoris
function loadFavorites() {
  const data = localStorage.getItem("sunspotFavorites");
  return data ? JSON.parse(data) : [];
}

// Ajouter un favori
function addToFavorites(spot) {
  const favorites = loadFavorites();
  if (!favorites.find(s => s.name === spot.name)) {
    favorites.push(spot);
    saveFavorites(favorites);
    renderFavorites();
  }
}

// Supprimer un favori
function removeFavorite(name) {
  const favorites = loadFavorites().filter(s => s.name !== name);
  saveFavorites(favorites);
  renderFavorites();
}

// Afficher les favoris
function renderFavorites() {
  const favorites = loadFavorites();
  const list = document.getElementById("favoritesList");
  list.className = "favorites-list"; // important !
  list.innerHTML = "";

  if (favorites.length === 0) {
    list.innerHTML = `<p class="empty-msg">Aucun favori pour le moment.</p>`;
    return;
  }

  favorites.forEach(spot => {
    const li = document.createElement("li");
    li.className = "favorite-card";
    li.innerHTML = `
      <h3 class="favorite-title">${spot.name}</h3>
      <p class="favorite-desc">${spot.description}</p>
      <button onclick="removeFavorite('${spot.name}')">Supprimer</button>
    `;
    list.appendChild(li);
  });
}


// Afficher les favoris au chargement
document.addEventListener("DOMContentLoaded", renderFavorites);
