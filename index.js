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


const filmsCarousel = get_films_random(5);

let index = 0;

const track = document.querySelector(".carrousel-track");

async function chargerCarrousel() {
  for (const requete of filmsCarousel) {
    const data = await get_film(requete);

    const slide = document.createElement("div");
    slide.classList.add("slide");

    slide.innerHTML = `
      <h3 class="titre-carrousel">${data?.Title || "Film inconnu"}</h3>
      <img src="${data?.Poster && data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png"}" alt="">
    `;

    track.appendChild(slide);
  }
}

await chargerCarrousel();

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

btnSuiv.onclick = () => {
  if (index < filmsCarousel.length - 1) {
    index++;
    updateCarrousel();
  }
};

updateCarrousel();