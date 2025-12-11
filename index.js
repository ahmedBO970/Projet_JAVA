import { get_filme } from "./api.js";

const filmesPodium = {
  "podium-1": "t=Deadpool",
  "podium-2": "t=Interstellar",
  "podium-3": "t=Dune"
};

async function remplirPodium() {
  for (const id in filmesPodium) {
    const data = await get_filme(filmesPodium[id]);
    if (!data) continue;

    const bloc = document.getElementById(id);

    const img = bloc.querySelector(".affiche");
    img.src = data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png";

    bloc.querySelector(".titre-film").textContent = data.Title;

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
