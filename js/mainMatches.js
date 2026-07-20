const API_TOKEN = "63e6ff0832004934adcb15c84d14bb87";

const URL_API = "https://api.football-data.org/v4";
const URL_PROXY_CORS = "https://corsproxy.io/?url=";
const COMPETITION_CODE = "WC";

const MAX_SCHEDULED = 104;
const MAX_FINISHED = 104;

const REFRESH_INTERVAL_MS = 60000;

function buildUrl(endpoint) {
  const targetUrl = `${URL_API}${endpoint}`;
  return `${CORS_PROXY_URL}${encodeURIComponent(targetUrl)}`;
}

async function getWorldCupMatches() {
  const url = buildUrl(`/competitions/${COMPETITION_CODE}/matches`);

  const response = await fetch(url, {
    headers: {
      "X-Auth-Token": API_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al llamar a la API`);
  }

  const data = await response.json();
  return data.matches;
}
