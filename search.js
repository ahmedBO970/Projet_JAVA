import { get_film } from "./api.js";

const barreRecherche = document.querySelector(".barre");
const resultatsSection = document.querySelector(".resultats");

let timeout = null;
let pageActuelle = 1;
let rechercheEnCours = "";
let chargement = false;
let totalResultats = 0;
let filmsAffiches = 0;

const LIMITE_FILMS = 8;

function afficherFilm(data) {
  const poster = data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png";

  const filmDiv = document.createElement("div");
  filmDiv.classList.add("film-resultat");

  filmDiv.innerHTML = `
    <img class="affiche" src="${poster}" alt="Poster de ${data.Title}">
    <h3 class="titre-film">${data.Title}</h3>
    <button class="bouton-plus">En savoir plus</button>
    <div class="resume-cache">
      <p>${data.Plot || "Résumé non disponible."}</p>
    </div>
  `;

  const bouton = filmDiv.querySelector(".bouton-plus");
  const resume = filmDiv.querySelector(".resume-cache");

  bouton.addEventListener("click", () => {
    if (resume.classList.contains("open")) {
      resume.style.height = "0px";
      resume.classList.remove("open");
    } else {
      resume.style.height = resume.scrollHeight + "px";
      resume.classList.add("open");
    }
  });

  resultatsSection.appendChild(filmDiv);
}

function afficherBoutonChargerPlus() {
  if (filmsAffiches >= totalResultats) return;

  const bouton = document.createElement("button");
  bouton.textContent = "Charger plus";
  bouton.className = "charger-btn";
  bouton.style.margin = "4vw auto";
  bouton.style.display = "block";

  bouton.addEventListener("click", () => {
    bouton.remove();
    pageActuelle++;
    rechercherFilms(rechercheEnCours, pageActuelle, true);
  });

  resultatsSection.appendChild(bouton);
}

async function rechercherFilms(recherche, page = 1, ajout = false) {
  if (chargement) return;
  chargement = true;

  if (!ajout) {
    resultatsSection.innerHTML = '<p class="chargement">Chargement...</p>';
    filmsAffiches = 0;
  }

  try {
    const url = `https://www.omdbapi.com/?apikey=15bde907&s=${encodeURIComponent(
      recherche
    )}&type=movie&page=${page}`;

    const reponse = await fetch(url);
    const data = await reponse.json();

    if (data.Response === "False") {
      resultatsSection.innerHTML = `<p class="info">Aucun résultat trouvé pour "${recherche}"</p>`;
      chargement = false;
      return;
    }

    if (!ajout) resultatsSection.innerHTML = "";

    totalResultats = Number(data.totalResults);

    const filmsPage = data.Search.slice(0, LIMITE_FILMS);

    for (const film of filmsPage) {
      const detail = await get_film(`i=${film.imdbID}`);
      if (detail) {
        afficherFilm(detail);
        filmsAffiches++;
      }
    }

    afficherBoutonChargerPlus();
  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    resultatsSection.innerHTML =
      '<p class="info">Erreur lors de la recherche, réessayez plus tard.</p>';
  }

  chargement = false;
}

barreRecherche.addEventListener("input", () => {
  const texte = barreRecherche.value.trim();

  if (texte.length < 3) {
    resultatsSection.innerHTML =
      '<p class="info">Veuillez entrer au moins 3 lettres pour lancer la recherche</p>';
    return;
  }

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    pageActuelle = 1;
    rechercheEnCours = texte;
    rechercherFilms(texte);
  }, 500);
});
