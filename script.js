// ======================================
// CONFIGURATION NIGHT PvP | SHOP
// ======================================

// Remplace cette adresse par le lien d'invitation de ton Discord.
const DISCORD_URL = "https://discord.com/invite/TONINVITATION";

// ======================================
// PRODUITS DE LA BOUTIQUE
// ======================================

// Pour chaque produit, indique :
// name = nom du produit
// category = vip, armes ou autres
// description = description affichée
// price = prix affiché
// image = chemin vers l'image dans le dossier images
// link = lien d'achat, ou laisse "" pour utiliser Discord

const products = [
  {
    name: "VIP Bronze",
    category: "vip",
    description: "Découvre les avantages du rang VIP Bronze.",
    price: "4,99 €",
    image: "images/vip-bronze.jpg",
    link: ""
  },
  {
    name: "VIP Silver",
    category: "vip",
    description: "Passe au niveau supérieur avec le VIP Silver.",
    price: "9,99 €",
    image: "images/vip-silver.jpg",
    link: ""
  },
  {
    name: "VIP Gold",
    category: "vip",
    description: "Profite des avantages du rang VIP Gold.",
    price: "19,99 €",
    image: "images/vip-gold.jpg",
    link: ""
  },
  {
    name: "Pack d'armes",
    category: "armes",
    description: "Découvre notre pack d'armes disponible.",
    price: "5,99 €",
    image: "images/pack-armes.jpg",
    link: ""
  },
  {
    name: "Pack spécial",
    category: "autres",
    description: "Un pack spécial pour les joueurs Night PvP.",
    price: "7,99 €",
    image: "images/pack-special.jpg",
    link: ""
  },
  {
    name: "Offre exclusive",
    category: "autres",
    description: "Retrouve les détails de cette offre sur Discord.",
    price: "2,99 €",
    image: "images/offre-exclusive.jpg",
    link: ""
  }
];

// ======================================
// IMAGES DE LA GALERIE
// ======================================

const galleryImages = [
  {
    image: "images/galerie-1.jpg",
    title: "Univers Night PvP"
  },
  {
    image: "images/galerie-2.jpg",
    title: "Notre communauté"
  },
  {
    image: "images/galerie-3.jpg",
    title: "Nos événements"
  }
];

// ======================================
// AFFICHAGE DES PRODUITS
// ======================================

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const emptyMessage = document.getElementById("empty-message");

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  productsContainer.replaceChildren();
  emptyMessage.hidden = filteredProducts.length > 0;

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    // Image de remplacement si le fichier est introuvable.
    image.onerror = () => {
      image.onerror = null;
      image.src = createPlaceholder(product.name);
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const badge = document.createElement("span");
    badge.className = "product-category";
    badge.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = product.price;

    const button = document.createElement("a");
    button.className = "product-button";
    button.textContent = "Acheter";

    // Lien d'achat si tu en as un, sinon redirection vers Discord.
    button.href = product.link || DISCORD_URL;

    if (!product.link && !isDiscordConfigured()) {
      button.href = "#contact";
    }

    if (button.href.startsWith("https://")) {
      button.target = "_blank";
      button.rel = "noopener noreferrer";
    }

    bottom.append(price, button);
    info.append(badge, title, description, bottom);
    card.append(image, info);
    productsContainer.append(card);
  });
}

// Crée une image de remplacement si une image n'existe pas.
function createPlaceholder(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
      <rect width="100%" height="100%" fill="#171020"/>
      <text x="50%" y="48%" text-anchor="middle"
        fill="#c084fc" font-size="34" font-family="Arial">
        NIGHT PvP
      </text>
      <text x="50%" y="62%" text-anchor="middle"
        fill="#ffffff" font-size="22" font-family="Arial">
        ${escapeXml(label)}
      </text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, character => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;"
  })[character]);
}

function isDiscordConfigured() {
  return !DISCORD_URL.includes("TONINVITATION");
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);

// ======================================
// AFFICHAGE DE LA GALERIE
// ======================================

const galleryContainer = document.getElementById("gallery");

galleryImages.forEach(item => {
  const figure = document.createElement("figure");

  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.title;
  image.loading = "lazy";
  image.onerror = () => {
    image.onerror = null;
    image.src = createPlaceholder(item.title);
  };

  const caption = document.createElement("figcaption");
  caption.textContent = item.title;

  figure.append(image, caption);
  galleryContainer.append(figure);
});

// ======================================
// LIENS DISCORD ET ANNÉE
// ======================================

[
  "discord-header",
  "discord-hero",
  "discord-footer"
].forEach(id => {
  const link = document.getElementById(id);

  if (isDiscordConfigured()) {
    link.href = DISCORD_URL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  } else {
    link.href = "#contact";
  }
});

document.getElementById("year").textContent =
  new Date().getFullYear();

// Premier affichage.
renderProducts();