import { get_film } from "./api.js";

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

const filmsTest = [
  { title: "Film 1", img: "./img/1.jpg" },
  { title: "Film 2", img: "./img/2.jpg" },
  { title: "Film 3", img: "./img/3.jpg" },
  { title: "Film 4", img: "./img/4.jpg" },
  { title: "Film 5", img: "./img/5.jpg" },
];

let index = 0;

const track = document.querySelector(".carrousel-track");

filmsTest.forEach(film => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  slide.innerHTML = `
    <h3 class="titre-carrousel">${film.title}</h3>
    <img src="${film.img}" alt="">
  `;
  track.appendChild(slide);
});

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
  if (index < filmsTest.length - 1) {
    index++;
    updateCarrousel();
  }
};

// init
updateCarrousel();

