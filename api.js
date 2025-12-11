const KEY_API = "15bde907";
const URL_API = "https://www.omdbapi.com/";

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
