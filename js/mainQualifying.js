const apiUrl = "/api/matches";
const teamPlaceholder = "Por definir";

const nombresEquiposEs = {
  "South Africa": "Sudáfrica",
  Canada: "Canadá",
  Brazil: "Brasil",
  Japan: "Japón",
  Germany: "Alemania",
  Paraguay: "Paraguay",
  Netherlands: "Países Bajos",
  Morocco: "Marruecos",
  "Ivory Coast": "Costa de Marfil",
  Norway: "Noruega",
  France: "Francia",
  Sweden: "Suecia",
  Mexico: "México",
  Ecuador: "Ecuador",
  England: "Inglaterra",
  "Congo DR": "RD Congo",
  Belgium: "Bélgica",
  Senegal: "Senegal",
  "United States": "Estados Unidos",
  "Bosnia-Herzegovina": "Bosnia y Herzegovina",
  Portugal: "Portugal",
  Croatia: "Croacia",
  Spain: "España",
  Austria: "Austria",
  Switzerland: "Suiza",
  Algeria: "Argelia",
  Australia: "Australia",
  Egypt: "Egipto",
  Argentina: "Argentina",
  "Cape Verde Islands": "Cabo Verde",
  Colombia: "Colombia",
  Ghana: "Ghana",
  Italy: "Italia",
  Denmark: "Dinamarca",
  Uruguay: "Uruguay",
  "South Korea": "Corea del Sur",
  Chile: "Chile",
  Ukraine: "Ucrania",
  Nigeria: "Nigeria",
};

const stageInfo = {
  ROUND_OF_32: { start: 73, total: 16 },
  LAST_16: { start: 89, total: 8 },
  QUARTER_FINALS: { start: 97, total: 4 },
  SEMI_FINALS: { start: 101, total: 2 },
  FINAL: { start: 104, total: 1 },
};

const displayOrder = {
  roundOf32Left: [73, 76, 75, 78, 83, 84, 81, 82],
  last16Left: [89, 90, 93, 94],
  quarterFinalsLeft: [97, 98],
  semiFinalsLeft: [101],
  roundOf32Right: [74, 77, 79, 80, 86, 87, 85, 88],
  last16Right: [91, 92, 95, 96],
  quarterFinalsRight: [99, 100],
  semiFinalsRight: [102],
  final: [104],
};

window.onload = loadBracket;

async function loadBracket() {
  showLoadingState();
  try {
    const matches = await fetchMatchesApi();
    const matchesByNumber = assignOfficialNumbers(matches);
    renderBracket(matchesByNumber);
    hideStatus();
  } catch (error) {
    console.error("Error cargando el bracket:", error);
    showErrorState(error);
  }
}

async function fetchMatchesApi() {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(
      `Error de la API (${response.status}): no se pudieron obtener los partidos`,
    );
  }

  const data = await response.json();
  return processMatches(data.matches || []);
}

function processMatches(matches) {
  return matches
    .map(normalizeMatchStage)
    .filter((match) => stageInfo[match.stage] && match.stage !== "THIRD_PLACE");
}

function normalizeMatchStage(match) {
  const stageMapping = { LAST_32: "ROUND_OF_32" };
  return { ...match, stage: stageMapping[match.stage] || match.stage };
}

function assignOfficialNumbers(matches) {
  const matchMap = {};
  Object.keys(stageInfo).forEach((stage) => {
    const stageMatches = matches
      .filter((m) => m.stage === stage)
      .sort(sortByDate);

    stageMatches.forEach((match, index) => {
      const officialNumber = getOfficialNumber(
        match,
        stageInfo[stage].start + index,
      );
      matchMap[officialNumber] = { ...match, numero: officialNumber };
    });
  });
  return matchMap;
}

function getOfficialNumber(match, numberByDateFallback) {
  const isOfficialMatchday =
    Number.isInteger(match.matchday) &&
    match.matchday >= stageInfo.ROUND_OF_32.start &&
    match.matchday <= stageInfo.FINAL.start;
  return isOfficialMatchday ? match.matchday : numberByDateFallback;
}

function sortByDate(a, b) {
  return new Date(a.utcDate || 0) - new Date(b.utcDate || 0);
}

function getWinner(match) {
  const { winner, fullTime, penalties } = match.score || {};
  if (winner === "HOME_TEAM" || winner === "AWAY_TEAM") return winner;

  if (isValidNumber(fullTime?.home) && isValidNumber(fullTime?.away)) {
    if (fullTime.home > fullTime.away) return "HOME_TEAM";
    if (fullTime.away > fullTime.home) return "AWAY_TEAM";

    if (isValidNumber(penalties?.home) && isValidNumber(penalties?.away)) {
      if (penalties.home > penalties.away) return "HOME_TEAM";
      if (penalties.away > penalties.home) return "AWAY_TEAM";
    }
  }
  return null;
}

function getRegulationScore(match) {
  const fs = match.score?.fullTime;
  if (fs != null && isValidNumber(fs.home))
    return { home: fs.home, away: fs.away };

  const et = match.score?.extraTime;
  if (et != null && isValidNumber(et.home))
    return { home: et.home, away: et.away };

  const rt = match.score?.regularTime;
  return { home: rt?.home ?? "-", away: rt?.away ?? "-" };
}

function renderBracket(matchesByNumber) {
  clearContainers();
  renderLeftSide(matchesByNumber);
  renderRightSide(matchesByNumber);
  renderFinal(matchesByNumber);
}

function clearContainers() {
  getBracketContainers().forEach((container) => {
    if (container) container.innerHTML = "";
  });
}

function getBracketContainers() {
  return [
    document.getElementById("leftSide"),
    document.getElementById("rightSide"),
    document.getElementById("finalSlot"),
  ];
}

function renderLeftSide(matchesByNumber) {
  const container = document.getElementById("leftSide");
  if (!container) return;
  const columns = [
    displayOrder.roundOf32Left,
    displayOrder.last16Left,
    displayOrder.quarterFinalsLeft,
    displayOrder.semiFinalsLeft,
  ];
  columns.forEach((col) =>
    container.appendChild(createColumn(col, matchesByNumber)),
  );
}

function renderRightSide(matchesByNumber) {
  const container = document.getElementById("rightSide");
  if (!container) return;
  const columns = [
    displayOrder.semiFinalsRight,
    displayOrder.quarterFinalsRight,
    displayOrder.last16Right,
    displayOrder.roundOf32Right,
  ];
  columns.forEach((col) =>
    container.appendChild(createColumn(col, matchesByNumber)),
  );
}

function renderFinal(matchesByNumber) {
  const container = document.getElementById("finalSlot");
  if (!container) return;
  const finalMatch = matchesByNumber[104] || createPlaceholder(104);
  container.appendChild(createCard(finalMatch, true));
}

function createColumn(matchNumbers, matchesByNumber) {
  const column = document.createElement("div");
  column.className = "column";
  for (let i = 0; i < matchNumbers.length; i += 2) {
    const pair = document.createElement("div");
    pair.className = "pair";
    pair.appendChild(
      createCard(
        matchesByNumber[matchNumbers[i]] || createPlaceholder(matchNumbers[i]),
      ),
    );
    if (matchNumbers[i + 1]) {
      pair.appendChild(
        createCard(
          matchesByNumber[matchNumbers[i + 1]] ||
            createPlaceholder(matchNumbers[i + 1]),
        ),
      );
    }
    column.appendChild(pair);
  }
  return column;
}

function createCard(match, isFinal = false) {
  const card = document.createElement("article");
  card.className = isFinal ? "card final-card" : "card";
  const score = getRegulationScore(match);
  const winner = getWinner(match);

  card.innerHTML = `
    <span class="match-number">M${match.numero}</span>
    ${createRowHtml(match.homeTeam, formatScore(score.home, match.score?.penalties?.home), winner === "HOME_TEAM")}
    ${createRowHtml(match.awayTeam, formatScore(score.away, match.score?.penalties?.away), winner === "AWAY_TEAM")}
  `;
  return card;
}

function formatScore(goals, pen) {
  return isValidNumber(pen)
    ? `<span class="score-main">${goals}</span><span class="score-penalties">(${pen})</span>`
    : `<span class="score-main">${goals}</span>`;
}

function createRowHtml(team, goalsHtml, isWinner) {
  const name = translateTeam(team?.name || teamPlaceholder);
  const crestHtml = isSafeImageUrl(team?.crest)
    ? `<img class="flag" src="${escapeHtml(team.crest)}">`
    : `<div class="flag"></div>`;

  return `
    <div class="team ${isWinner ? "winner" : ""}">
        <div class="info">
            ${crestHtml}
            <span class="name">${escapeHtml(name)}</span>
        </div>
        <span class="score">${goalsHtml}</span>
    </div>`;
}

function createPlaceholder(numero) {
  return {
    numero,
    homeTeam: { name: teamPlaceholder },
    awayTeam: { name: teamPlaceholder },
    score: { fullTime: { home: "-", away: "-" } },
  };
}

function translateTeam(name) {
  return nombresEquiposEs[name] || name;
}

function isValidNumber(v) {
  return v !== null && v !== undefined && v !== "-" && !isNaN(Number(v));
}

function isSafeImageUrl(url) {
  if (typeof url !== "string") return false;
  return /^https?:\/\//i.test(url);
}

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (m) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[m],
  );
}

function showLoadingState() {
  const status = document.getElementById("bracketStatus");
  if (!status) return;
  status.innerHTML = `<p class="bracket-status bracket-status--loading">Cargando partidos…</p>`;
  status.style.display = "block";
}

function showErrorState(error) {
  const status = document.getElementById("bracketStatus");
  if (!status) {
    console.error(
      "No se pudo mostrar el error en pantalla: falta #bracketStatus",
    );
    return;
  }
  status.innerHTML = `
    <div class="bracket-status bracket-status--error">
      <p>No se pudieron cargar los partidos. ${escapeHtml(error.message || "")}</p>
      <button type="button" id="bracketRetryBtn">Reintentar</button>
    </div>`;
  status.style.display = "block";

  const retryBtn = document.getElementById("bracketRetryBtn");
  if (retryBtn) retryBtn.addEventListener("click", loadBracket);
}

function hideStatus() {
  const status = document.getElementById("bracketStatus");
  if (status) status.style.display = "none";
}
