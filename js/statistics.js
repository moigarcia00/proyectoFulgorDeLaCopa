/* statistics.js
   Llama a la API de Football-Data a través de corsproxy.io (que reenvía
   la cabecera X-Auth-Token) y muestra cada resultado en una tabla dinámica
   dentro del modal centrado.
*/

const API_TOKEN = "21f1e35ebddb45f091be4126a0347acf";
const API_BASE = "https://api.football-data.org/v4";

// Mundial 2026 (FIFA World Cup), el torneo real de esta web.
// Se está disputando ahora mismo (11 jun - 19 jul 2026), así que ya hay
// partidos finalizados y goleadores reales para consultar.
const COMPETITION_CODE = "WC";
const SEASON = "2026";

/* La API devuelve los nombres de los equipos (países) en inglés.
   Traducimos los más comunes; si un país no está en la lista,
   se muestra tal cual viene de la API. */
const TEAM_NAME_ES = {
  Spain: "España",
  Germany: "Alemania",
  France: "Francia",
  England: "Inglaterra",
  Italy: "Italia",
  Portugal: "Portugal",
  Netherlands: "Países Bajos",
  Belgium: "Bélgica",
  Croatia: "Croacia",
  Switzerland: "Suiza",
  Poland: "Polonia",
  Austria: "Austria",
  Denmark: "Dinamarca",
  Sweden: "Suecia",
  Norway: "Noruega",
  Serbia: "Serbia",
  Wales: "Gales",
  Scotland: "Escocia",
  "Republic of Ireland": "Irlanda",
  Ukraine: "Ucrania",
  Turkey: "Turquía",
  Greece: "Grecia",
  Hungary: "Hungría",
  Romania: "Rumanía",
  Slovakia: "Eslovaquia",
  Slovenia: "Eslovenia",
  "Czech Republic": "Chequia",
  Iceland: "Islandia",
  Brazil: "Brasil",
  Argentina: "Argentina",
  Uruguay: "Uruguay",
  Colombia: "Colombia",
  Chile: "Chile",
  Peru: "Perú",
  Ecuador: "Ecuador",
  Paraguay: "Paraguay",
  Bolivia: "Bolivia",
  Venezuela: "Venezuela",
  Mexico: "México",
  "United States": "Estados Unidos",
  Canada: "Canadá",
  "Costa Rica": "Costa Rica",
  Panama: "Panamá",
  Honduras: "Honduras",
  Jamaica: "Jamaica",
  Japan: "Japón",
  "South Korea": "Corea del Sur",
  "Korea Republic": "Corea del Sur",
  Australia: "Australia",
  "Saudi Arabia": "Arabia Saudita",
  Iran: "Irán",
  Qatar: "Catar",
  Morocco: "Marruecos",
  Senegal: "Senegal",
  Tunisia: "Túnez",
  Algeria: "Argelia",
  Egypt: "Egipto",
  Nigeria: "Nigeria",
  Ghana: "Ghana",
  Cameroon: "Camerún",
  "Ivory Coast": "Costa de Marfil",
  "South Africa": "Sudáfrica",
  "New Zealand": "Nueva Zelanda",
};

function translateTeamName(name) {
  return TEAM_NAME_ES[name] ?? name;
}

/* Función auxiliar para procesar los partidos y acumular estadísticas por equipo */
function processMatchData(data) {
  const matches = data?.matches ?? [];
  const teamStats = {};

  matches.forEach((match) => {
    if (match.status !== "FINISHED") return;

    const homeTeam = translateTeamName(match.homeTeam.name);
    const awayTeam = translateTeamName(match.awayTeam.name);
    const homeGoals = match.score?.fullTime?.home ?? 0;
    const awayGoals = match.score?.fullTime?.away ?? 0;

    if (!teamStats[homeTeam]) {
      teamStats[homeTeam] = { goalsFor: 0, goalsAgainst: 0, flag: match.homeTeam.crest };
    }
    if (!teamStats[awayTeam]) {
      teamStats[awayTeam] = { goalsFor: 0, goalsAgainst: 0, flag: match.awayTeam.crest };
    }

    teamStats[homeTeam].goalsFor += homeGoals;
    teamStats[homeTeam].goalsAgainst += awayGoals;

    teamStats[awayTeam].goalsFor += awayGoals;
    teamStats[awayTeam].goalsAgainst += homeGoals;
  });

  return teamStats;
}

/* Configuración de cada botón */
const statsConfig = {
  teamScorer: {
    title: "Equipo Máx. Goleador",
    endpoint: `${API_BASE}/competitions/${COMPETITION_CODE}/matches?season=${SEASON}`,
    buildRows(data) {
      const stats = processMatchData(data);
      return Object.entries(stats)
        .map(([teamName, values]) => ({
          Equipo: teamName,
          "Goles a favor": values.goalsFor,
          _flag: values.flag,
        }))
        .sort((a, b) => b["Goles a favor"] - a["Goles a favor"]);
    },
  },

  playerScorer: {
    title: "Jugador Máx. Goleador",
    endpoint: `${API_BASE}/competitions/${COMPETITION_CODE}/scorers?season=${SEASON}`,
    buildRows(data) {
      const scorers = data?.scorers ?? [];
      return scorers.map((row) => ({
        Jugador: row.player.name,
        Equipo: translateTeamName(row.team.name),
        Goles: row.goals,
        _flag: row.team.crest,
      }));
    },
  },

  teamConceded: {
    title: "Equipo Máx. Encajados",
    endpoint: `${API_BASE}/competitions/${COMPETITION_CODE}/matches?season=${SEASON}`,
    buildRows(data) {
      const stats = processMatchData(data);
      return Object.entries(stats)
        .map(([teamName, values]) => ({
          Equipo: teamName,
          "Goles en contra": values.goalsAgainst,
          _flag: values.flag,
        }))
        .sort((a, b) => b["Goles en contra"] - a["Goles en contra"]);
    },
  },
};

/* Referencias del DOM */
const statButtons = document.querySelectorAll(".selector [data-stat]");
const modal = document.getElementById("statsModal");
const modalTitle = document.getElementById("statsModalTitle");
const tableHead = document.getElementById("statsTableHead");
const tableBody = document.getElementById("statsTableBody");
const modalClose = document.getElementById("statsModalClose");

/* Cache simple para no repetir la misma llamada a la API */
const cache = {};

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

function renderMessage(message) {
  tableHead.innerHTML = "";
  tableBody.innerHTML = `<tr><td style="padding: 15px; text-align: center;">${message}</td></tr>`;
}

function renderTable(rows) {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  if (!rows.length) {
    renderMessage("No se encontraron registros.");
    return;
  }

  // Las claves que empiezan con "_" son datos auxiliares (ej. la bandera)
  // y no deben mostrarse como columna propia.
  const columns = Object.keys(rows[0]).filter((col) => !col.startsWith("_"));

  const headRow = document.createElement("tr");
  columns.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.appendChild(th);
  });
  tableHead.appendChild(headRow);

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((col) => {
      const td = document.createElement("td");

      if (col === "Equipo" && row._flag) {
        const cell = document.createElement("div");
        cell.className = "teamCell";

        const flag = document.createElement("img");
        flag.src = row._flag;
        flag.alt = "";
        flag.className = "teamFlag";
        flag.onerror = () => flag.remove();

        const name = document.createElement("span");
        name.textContent = row[col] ?? "";

        cell.appendChild(flag);
        cell.appendChild(name);
        td.appendChild(cell);
      } else {
        td.textContent = row[col] ?? "";
      }

      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

/* Obtiene (y cachea) las filas ya procesadas para un botón concreto */
async function fetchStatsRows(key) {
  if (cache[key]) return cache[key];

  const config = statsConfig[key];

  // football-data.org no siempre permite CORS directo desde localhost,
  // así que pasamos por corsproxy.io, que SÍ reenvía cabeceras personalizadas
  // (a diferencia de otros proxies como allorigins) y devuelve la respuesta
  // tal cual, sin envolverla en JSON.
  const proxiedUrl = `https://corsproxy.io/?url=${encodeURIComponent(config.endpoint)}`;

  const response = await fetch(proxiedUrl, {
    headers: { "X-Auth-Token": API_TOKEN },
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const errorBody = await response.json();
      detail = errorBody.message || detail;
    } catch (_) {
      /* la respuesta de error no era JSON, usamos statusText */
    }
    throw new Error(`(${response.status}) ${detail}`);
  }

  const data = await response.json();
  const rows = config.buildRows(data);
  cache[key] = rows;
  return rows;
}

async function loadStats(key) {
  const config = statsConfig[key];
  if (!config) return;

  modalTitle.textContent = config.title;
  openModal();
  renderMessage("Cargando datos de la API...");

  try {
    const rows = await fetchStatsRows(key);
    renderTable(rows);
  } catch (error) {
    console.error("Detalle del error:", error);
    renderMessage(`⚠️ Error: ${error.message}`);
  }
}

/* ---------- Tarjetas de líder (debajo de cada botón) ---------- */

function renderLeaderCard(card, row) {
  card.innerHTML = "";

  if (!row) {
    card.innerHTML = `<p class="leaderEmpty">Sin datos</p>`;
    return;
  }

  const img = document.createElement("img");
  img.className = "leaderImage";
  img.alt = "";
  img.src = row._flag ?? "";
  img.onerror = () => img.remove();

  const name = document.createElement("p");
  name.className = "leaderName";
  name.textContent = row.Jugador ?? row.Equipo ?? "";

  const sub = document.createElement("p");
  sub.className = "leaderSub";
  sub.textContent = row.Jugador ? row.Equipo ?? "" : "";

  const statKey = Object.keys(row).find(
    (k) => !k.startsWith("_") && k !== "Jugador" && k !== "Equipo"
  );

  const value = document.createElement("p");
  value.className = "leaderValue";
  value.textContent = statKey ? `${row[statKey]} ⚽` : "";

  card.appendChild(img);
  card.appendChild(name);
  if (sub.textContent) card.appendChild(sub);
  card.appendChild(value);
}

async function initLeaders() {
  const leaderCards = document.querySelectorAll("[data-leader]");

  leaderCards.forEach((card) => {
    card.innerHTML = `<p class="leaderEmpty">Cargando...</p>`;
  });

  for (const card of leaderCards) {
    const key = card.dataset.leader;
    try {
      const rows = await fetchStatsRows(key);
      renderLeaderCard(card, rows[0]);
    } catch (error) {
      console.error("Detalle del error:", error);
      card.innerHTML = `<p class="leaderEmpty">Error al cargar</p>`;
    }
  }
}

initLeaders();

statButtons.forEach((button) => {
  button.addEventListener("click", () => loadStats(button.dataset.stat));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});
