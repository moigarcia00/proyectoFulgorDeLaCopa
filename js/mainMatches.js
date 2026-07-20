const API_TOKEN = "63e6ff0832004934adcb15c84d14bb87";

const URL_API = "https://api.football-data.org/v4";
const URL_PROXY_CORS = "https://corsproxy.io/?url=";
const CODIGO_COMPETICION = "WC";

const MAX_PROGRAMADOS = 104;
const MAX_FINALIZADOS = 104;

function construirUrl(endpoint) {
  const urlDestino = `${URL_API}${endpoint}`;
  return `${URL_PROXY_CORS}${encodeURIComponent(urlDestino)}`;
}

async function obtenerPartidosDelMundial() {
  const url = construirUrl(`/competitions/${CODIGO_COMPETICION}/matches`);

  const respuesta = await fetch(url, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });

  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al llamar a la API`);
  }

  const datos = await respuesta.json();
  return datos.matches; // La API devuelve un array llamado "matches"
}
