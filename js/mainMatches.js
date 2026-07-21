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

function formatDateTime(utcDate) {
  const date = new Date(utcDate);

  const weekday = date
    .toLocaleDateString("es-ES", { weekday: "long" })
    .toUpperCase();
  const day = date.getDate();
  const month = date
    .toLocaleDateString("es-ES", { month: "short" })
    .toUpperCase()
    .replace(".", "");
  const time = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { dateLabel: `[${weekday} ${day} ${month}]`, time };
}

function getScore(match) {
  const fullTime = match.score?.fullTime ?? {};
  const home = fullTime.home ?? fullTime.homeTeam;
  const away = fullTime.away ?? fullTime.awayTeam;
  return { home, away };
}

function createFlagImage(team) {
  const name = team?.name ?? "Equipo";
  const crest = team?.crest;
  if (!crest) return `<span class="teamFlag">🏳️</span>`;
  return `<img class="teamFlag" src="${crest}" alt="Escudo de ${name}" onerror="this.style.display='none'">`;
}

function createScheduledCard(match) {
  const article = document.createElement("article");
  article.className = "match";

  const { dateLabel, time } = formatDateTime(match.utcDate);

  article.innerHTML = `
    <span class="matchDate">${dateLabel} - ${time}</span>
    <div class="matchTeams">
      <span class="team teamHome">
        ${match.homeTeam?.name ?? "Por confirmar"}
        ${createFlagImage(match.homeTeam)}
      </span>
      <span class="matchScore">${time}</span>
      <span class="team teamAway">
        ${createFlagImage(match.awayTeam)}
        ${match.awayTeam?.name ?? "Por confirmar"}
      </span>
    </div>
    <span class="matchVenue">📍 ${match.venue ?? "Por confirmar"}</span>
  `;

  return article;
}

function createLiveCard(match) {
  const article = document.createElement("article");
  article.className = "match";

  const { home, away } = getScore(match);
  const minute = match.minute ? `${match.minute}'` : match.status;

  article.innerHTML = `
    <div class="matchTeams">
      <span class="team teamHome">
        ${match.homeTeam?.name ?? "Equipo"}
        ${createFlagImage(match.homeTeam)}
      </span>
      <span class="matchScore matchScoreLive">
        ${home ?? 0} - ${away ?? 0}
      </span>
      <span class="team teamAway">
        ${createFlagImage(match.awayTeam)}
        ${match.awayTeam?.name ?? "Equipo"}
      </span>
    </div>
    <span class="matchStatus">${minute}</span>
    <span class="matchVenue">📍 ${match.venue ?? "Por confirmar"}</span>
  `;

  return article;
}

function createFinishedCard(match) {
  const article = document.createElement("article");
  article.className = "match";

  const { dateLabel } = formatDateTime(match.utcDate);
  const { home, away } = getScore(match);

  article.innerHTML = `
    <span class="matchDate">${dateLabel}</span>
    <div class="matchTeams">
      <span class="team teamHome">
        ${match.homeTeam?.name ?? "Equipo"}
        ${createFlagImage(match.homeTeam)}
      </span>
      <span class="matchScore">${home ?? "-"} - ${away ?? "-"}</span>
      <span class="team teamAway">
        ${createFlagImage(match.awayTeam)}
        ${match.awayTeam?.name ?? "Equipo"}
      </span>
    </div>
    <span class="matchVenue">📍 ${match.venue ?? "Por confirmar"}</span>
  `;

  return article;
}

function renderList(containerId, counterId, matches, createCard) {
  const container = document.getElementById(containerId);
  const counter = document.getElementById(counterId);
 
  container.innerHTML = "";
 
  if (matches.length === 0) {
    container.innerHTML = `<p class="match matchEmpty">No hay partidos en este momento.</p>`;
  } else {
    matches.forEach((match) => {
      container.appendChild(createCard(match));
    });
  }

  counter.textContent = `(${matches.length})`;
}

function showError(message) {
  ["scheduledList", "liveList", "finishedList"].forEach((id) => {
    document.getElementById(id).innerHTML =
      `<p class="match matchError">⚠️ ${message}</p>`;
  });
}

async function loadAndRenderMatches() {
  try {
    const matches = await getWorldCupMatches();
    const { scheduled, live, finished } = classifyMatches(matches);
 
    renderList("scheduledList", "scheduledCounter", scheduled, createScheduledCard);
    renderList("liveList", "liveCounter", live, createLiveCard);
    renderList("finishedList", "finishedCounter", finished, createFinishedCard);
  } catch (error) {
    console.error("No se pudieron cargar los partidos:", error);
    showError("No se pudieron cargar los partidos. Revisa la consola del navegador (F12) para más detalles.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadAndRenderMatches();

  setInterval(loadAndRenderMatches, REFRESH_INTERVAL_MS);
});
