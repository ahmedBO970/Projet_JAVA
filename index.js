import { get_film, get_films_random } from "./api.js";

const filmsPodium = {
  "podium-1": "t=Deadpool",
  "podium-2": "t=Interstellar",
  "podium-3": "t=Dune"
};

async function remplirPodium() {
  for (const id in filmsPodium) {
    const data = await get_film(filmsPodium[id]);
    if (!data) continue;

    const bloc = document.getElementById(id);

    const img = bloc.querySelector(".affiche");
    img.src = data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png";

    bloc.querySelector(".titre-podium").textContent = data.Title;

    bloc.querySelector(".resume-cache p").textContent = data.Plot;

    const bouton = bloc.querySelector(".bouton-plus");
    const resume = bloc.querySelector(".resume-cache");

    bouton.onclick = () => {
      if (resume.classList.contains("open")) {
        resume.style.height = "0px";
        resume.classList.remove("open");
      } else {
        resume.style.height = resume.scrollHeight + "px";
        resume.classList.add("open");
      }
    };
  }
}

window.onload = remplirPodium;



let filmsCarousel = get_films_random(5);
let index = 0;
let loading = false;

const track = document.querySelector(".carrousel-track");
const loader = document.getElementById("loader");

async function chargerCarrousel(liste) {
  for (const requete of liste) {
    const data = await get_film(requete);
    if (!data) continue;

    const poster = data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png";

    const slide = document.createElement("div");
    slide.classList.add("slide");

    slide.innerHTML = `
      <div class="slide-bg" style="background-image:url('${poster}')"></div>

      <div class="slide-left">
        <h2 class="slide-title">${data.Title}</h2>
        <button class="bouton-plus btn-slide">En savoir plus</button>
        <div class="resume-cache"><p>${data.Plot}</p></div>
      </div>

      <div class="slide-right">
        <img class="slide-poster" src="${poster}">
      </div>
    `;

    track.appendChild(slide);
  }

  activerBoutonsCarrousel();
}

function activerBoutonsCarrousel() {
  document.querySelectorAll(".slide").forEach(slide => {
    const btn = slide.querySelector(".btn-slide");
    const resume = slide.querySelector(".resume-cache");
    btn.onclick = () => toggleResume(resume);
  });
}

await chargerCarrousel(filmsCarousel);


/* ======================== LOAD MORE ======================== */

async function chargerPlusDeFilms() {
  if (loading) return;

  loading = true;
  loader.style.display = "block";

  const nouveauxFilms = get_films_random(5);
  await chargerCarrousel(nouveauxFilms);

  filmsCarousel = filmsCarousel.concat(nouveauxFilms);

  loader.style.display = "none";
  loading = false;
}


/* ======================== NAVIGATION ======================== */

const btnPrec = document.getElementById("prec");
const btnSuiv = document.getElementById("suiv");

function updateCarrousel() {
  const width = document.querySelector(".carrousel-container").offsetWidth;
  track.style.transform = `translateX(-${index * width}px)`;
  btnPrec.style.visibility = index === 0 ? "hidden" : "visible";
}

btnPrec.onclick = () => {
  if (index > 0) {
    index--;
    updateCarrousel();
  }
};

btnSuiv.onclick = async () => {
  index++;

  if (index >= filmsCarousel.length - 1) {
    await chargerPlusDeFilms();
  }

  updateCarrousel();
};

updateCarrousel();