const API_TOKEN = "63e6ff0832004934adcb15c84d14bb87";
 
const API_URL = "https://api.football-data.org/v4";
const CORS_PROXY_URL = "https://corsproxy.io/?url=";
const COMPETITION_CODE = "WC";

const REFRESH_INTERVAL_MS = 60000;

function buildUrl(endpoint) {
  const targetUrl = `${API_URL}${endpoint}`;
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

function classifyMatches(matches) {
  const scheduled = matches.filter(
    (match) => match.status === "SCHEDULED" || match.status === "TIMED"
  );

  const live = matches.filter(
    (match) => match.status === "IN_PLAY" || match.status === "PAUSED"
  );

  const finished = matches.filter((match) => match.status === "FINISHED");

  scheduled.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
  finished.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));

  return {
    scheduled,
    live,
    finished,
  };
}