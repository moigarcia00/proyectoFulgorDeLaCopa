const proxyCors = "https://corsproxy.io/?url=";
const apiKey = "4b51275c546a4e4db7c535a5e18c82e4";
const apiUrl =
  "https://api.football-data.org/v4/competitions/WC/matches?season=2026";
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
  const matches = await fetchMatchesApi();
  const matchesByNumber = assignOfficialNumbers(matches);
  renderBracket(matchesByNumber);
}

async function fetchMatchesApi() {
  try {
    const proxyUrl = proxyCors + encodeURIComponent(apiUrl);
    const response = await fetch(proxyUrl, {
      method: "GET",
      headers: { "X-Auth-Token": apiKey },
    });

    if (!response.ok) throw new Error(`API Error ${response.status}`);

    const data = await response.json();
    return processMatches(data.matches || []);
  } catch (error) {
    console.warn("Could not load live data:", error.message);
    return [];
  }
}

function processMatches(matches) {
  return matches
    .map(normalizeMatchStage)
    .filter((match) => stageInfo[match.stage] && match.stage !== "THIRD_PLACE");
}

function normalizeMatchStage(match) {
  const stageMapping = { LAST_32: "ROUND_OF_32" };
  return {
    ...match,
    stage: stageMapping[match.stage] || match.stage,
  };
}

function assignOfficialNumbers(matches) {
  const matchMap = {};

  Object.keys(stageInfo).forEach((stage) => {
    const stageDetails = stageInfo[stage];
    const stageMatches = matches
      .filter((match) => match.stage === stage)
      .sort(sortByDate);

    stageMatches.forEach((match, index) => {
      const officialNumber = getOfficialNumber(
        match,
        stageDetails.start + index,
      );
      matchMap[officialNumber] = { ...match, numero: officialNumber };
    });
  });

  return matchMap;
}

function getOfficialNumber(match, numberByDate) {
  const isValidMatchday =
    Number.isInteger(match.matchday) &&
    match.matchday >= stageInfo.ROUND_OF_32.start &&
    match.matchday <= stageInfo.FINAL.start;

  return isValidMatchday ? match.matchday : numberByDate;
}

function sortByDate(a, b) {
  const dateA = new Date(a.utcDate || 0).getTime();
  const dateB = new Date(b.utcDate || 0).getTime();

  if (dateA !== dateB) return dateA - dateB;
  return String(a.id || "").localeCompare(String(b.id || ""));
}

function getWinner(match) {
  const apiWinner = match.score?.winner;
  if (apiWinner === "HOME_TEAM" || apiWinner === "AWAY_TEAM") return apiWinner;

  const home = match.score?.fullTime?.home;
  const away = match.score?.fullTime?.away;

  if (isValidNumber(home) && isValidNumber(away)) {
    if (Number(home) > Number(away)) return "HOME_TEAM";
    if (Number(away) > Number(home)) return "AWAY_TEAM";
  }

  return null;
}

function renderBracket(matchesByNumber) {
  const leftSide = document.getElementById("leftSide");
  const rightSide = document.getElementById("rightSide");
  const finalSlot = document.getElementById("finalSlot");

  clearContainers([leftSide, rightSide, finalSlot]);

  const leftColumns = [
    displayOrder.roundOf32Left,
    displayOrder.last16Left,
    displayOrder.quarterFinalsLeft,
    displayOrder.semiFinalsLeft,
  ];

  const rightColumns = [
    displayOrder.semiFinalsRight,
    displayOrder.quarterFinalsRight,
    displayOrder.last16Right,
    displayOrder.roundOf32Right,
  ];

  leftColumns.forEach((col) =>
    leftSide.appendChild(createColumn(col, matchesByNumber)),
  );
  rightColumns.forEach((col) =>
    rightSide.appendChild(createColumn(col, matchesByNumber)),
  );

  const finalMatch = matchesByNumber[104] || createPlaceholder(104);
  finalSlot.appendChild(createCard(finalMatch, true));
}

function clearContainers(containers) {
  containers.forEach((container) => {
    if (container) container.innerHTML = "";
  });
}

function createColumn(matchNumbers, matchesByNumber) {
  const column = document.createElement("div");
  column.className = "column";

  for (let i = 0; i < matchNumbers.length; i += 2) {
    const pairContainer = document.createElement("div");
    pairContainer.className = "pair";

    const match1 =
      matchesByNumber[matchNumbers[i]] || createPlaceholder(matchNumbers[i]);
    const match2 =
      matchesByNumber[matchNumbers[i + 1]] ||
      createPlaceholder(matchNumbers[i + 1]);

    pairContainer.appendChild(createCard(match1));
    if (matchNumbers[i + 1]) pairContainer.appendChild(createCard(match2));

    column.appendChild(pairContainer);
  }

  return column;
}

function createCard(match, isFinal = false) {
  const card = document.createElement("article");
  card.className = isFinal ? "card final-card" : "card";

  const home = match.homeTeam || {};
  const away = match.awayTeam || {};
  const homeGoals = match.score?.fullTime?.home ?? "-";
  const awayGoals = match.score?.fullTime?.away ?? "-";
  const winner = getWinner(match);

  card.innerHTML = `
    <span class="match-number">M${match.numero}</span>
    ${createRowHtml(home, homeGoals, winner === "HOME_TEAM")}
    ${createRowHtml(away, awayGoals, winner === "AWAY_TEAM")}
  `;

  return card;
}

function createRowHtml(team, goals, isWinner) {
  const originalName = team?.name || teamPlaceholder;
  const translatedName = translateTeam(originalName);
  const crest = team?.crest || "";
  const placeholderClass =
    originalName === teamPlaceholder ? "placeholder" : "";
  const winnerClass = isWinner ? "winner" : "";

  const crestHtml = crest
    ? `<img class="flag" src="${crest}" alt="${escapeHtml(translatedName)}">`
    : `<div class="flag"></div>`;

  return `
    <div class="team ${winnerClass}">
        <div class="info">
            ${crestHtml}
            <span class="name ${placeholderClass}" title="${escapeHtml(translatedName)}">
              ${escapeHtml(translatedName)}
            </span>
        </div>
        <span class="score">${goals}</span>
    </div>
  `;
}

function createPlaceholder(numero) {
  return {
    numero,
    homeTeam: { name: teamPlaceholder, crest: "" },
    awayTeam: { name: teamPlaceholder, crest: "" },
    score: { winner: null, fullTime: { home: "-", away: "-" } },
    utcDate: null,
  };
}

function translateTeam(name) {
  return nombresEquiposEs[name] || name;
}

function isValidNumber(value) {
  return (
    value !== null &&
    value !== undefined &&
    value !== "-" &&
    !isNaN(Number(value))
  );
}

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
