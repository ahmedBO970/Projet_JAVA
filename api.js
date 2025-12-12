const KEY_API = "15bde907";
const URL_API = "https://www.omdbapi.com/";

export const FILMS_POPULAIRES = [
  "t=American History X", "t=Jarhead", "t=Fight Club", "t=No Country for Old Men",
  "t=Inception", "t=Interstellar", "t=The Dark Knight", "t=Dune", "t=The Prestige",
  "t=Shutter Island", "t=Joker", "t=The Matrix", "t=Whiplash", "t=La La Land",
  "t=Avatar", "t=Avengers", "t=Avengers Endgame", "t=Guardians of the Galaxy", "t=Iron Man",
  "t=The Batman", "t=Black Panther", "t=John Wick", "t=Mad Max Fury Road", "t=Blade Runner 2049",
  "t=The Lord of the Rings", "t=Edge of Tomorrow", "t=Spider Man No Way Home",
  "t=Arrival", "t=Se7en", "t=Gone Girl", "t=Zodiac", "t=Heat", "t=Sicario", "t=Drive",
  "t=The Wolf of Wall Street", "t=Forrest Gump", "t=The Truman Show", "t=The Big Short",
  "t=The Nice Guys", "t=The Shawshank Redemption", "t=The Godfather", "t=The Green Mile",
  "t=Saving Private Ryan", "t=Oppenheimer", "t=Titanic", "t=Good Will Hunting", "t=Her",
  "t=1917", "t=Hacksaw Ridge", "t=Dune Part Two", "t=Top Gun Maverick", "t=Memento",
  "t=The Northman", "t=Poor Things", "t=Barbie", "t=The Whale", "t=Nightcrawler","t=Taxi Driver",
  "t=Bullet Train", "t=Your Name", "t=Spirited Away", "t=Princess Mononoke", "t=Gladiator",
  "t=Toy Story", "t=Wall E", "t=Pulp Fiction", "t=Scarface", "t=Training Day", "t=Ex Machina"
];


export async function get_film(requete) {
  try {
    const url = `${URL_API}?apikey=${KEY_API}&${requete}`;

    const reponse = await fetch(url);
    const data = await reponse.json();

    if (data.Response === "False") {
      console.warn("Erreur :", data.Error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'appel API :", error);
    return null;
  }
}

export function get_films_random(nombre = 5) {
  const shuffled = [...FILMS_POPULAIRES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, nombre);
}
