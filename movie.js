import { get_film } from "./api.js";

const params = new URLSearchParams(window.location.search);
const idFilm = params.get("id");

if (!idFilm) {
  document.querySelector("main").innerHTML =
    "<p style='text-align:center'>Film introuvable</p>";
}

async function chargerFilm() {
  const data = await get_film(`i=${idFilm}`);
  if (!data) return;

  document.querySelector(".movie-poster").src =
    data.Poster !== "N/A" ? data.Poster : "./img/no-poster.png";

  document.querySelector(".movie-titre").textContent = data.Title;

  document.querySelector(".movie-info").textContent =
    `${data.Year} • ${data.Runtime} • ${data.Genre}`;

  document.querySelector(".movie-note").textContent =
    `⭐ ${data.imdbRating} / 10`;

  document.querySelector(".movie-resume").textContent =
    data.Plot || "Résumé non disponible.";
}

chargerFilm();
