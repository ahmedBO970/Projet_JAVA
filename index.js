import { get_filme } from "./api.js";

const filmesPodium = {
  "podium-1": "t=Deadpool",
  "podium-2": "t=Interstellar",
  "podium-3": "t=Dune"
};

async function remplirPodium() {
  for (const id in filmesPodium) {
    const requete = filmesPodium[id];
    const data = await get_filme(requete);

    if (!data) continue;

    const bloc_filme = document.getElementById(id);

    // Correction du mauvais nom de variable
    const blocAffiche = bloc_filme.querySelector(".affiche");
    blocAffiche.style.backgroundImage = `url('${data.Poster}')`;

    const titre = bloc_filme.querySelector(".titre-film");
    titre.textContent = data.Title;

    const resume = bloc_filme.querySelector("p");
    resume.textContent = data.Plot;
  }
}

window.onload = remplirPodium;
