const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const apiUrl = isLocalhost
  ? "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://api.football-data.org/v4/competitions/WC/standings?season=2026",
    )
  : "/api/matches?endpoint=standings";

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

document.addEventListener("DOMContentLoaded", fetchAndRenderStandings);

async function fetchAndRenderStandings() {
  const container = document.getElementById("groups-container");
  container.innerHTML = `<p style="text-align: center; color: #d4a35b; padding: 20px;">Cargando clasificaciones...</p>`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: isLocalhost
        ? { "X-Auth-Token": "4b51275c546a4e4db7c535a5e18c82e4" }
        : {},
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const data = await response.json();
    const mundialDataFormatted = processStandingsData(data.standings || []);
    renderTables(mundialDataFormatted);
  } catch (error) {
    console.error("Error cargando clasificaciones:", error);
    container.innerHTML = `<p style="text-align: center; color: #ff6b6b; padding: 20px;">No se pudieron cargar las clasificaciones.</p>`;
  }
}

function processStandingsData(standingsList) {
  return standingsList.map((groupStandings) => {
    const groupName = groupStandings.group
      ? groupStandings.group.replace("GROUP_", "Grupo ")
      : "Grupo";

    const teams = groupStandings.table.map((entry) => {
      const formArray = entry.form
        ? entry.form.split(",").slice(0, 5)
        : ["-", "-", "-", "-", "-"];

      while (formArray.length < 5) formArray.push("-");

      return {
        rank: entry.position,
        flag: entry.team.crest || "https://flagcdn.com/w40/un.png",
        name: nombresEquiposEs[entry.team.name] || entry.team.name,
        pj: entry.playedGames ?? 0,
        g: entry.won ?? 0,
        e: entry.draw ?? 0,
        p: entry.lost ?? 0,
        gf: entry.goalsFor ?? 0,
        gc: entry.goalsAgainst ?? 0,
        dg: entry.goalDifference ?? 0,
        pcd: entry.disciplinePoints ?? 0,
        pts: entry.points ?? 0,
        form: formArray,
      };
    });

    return {
      group: groupName,
      teams: teams,
    };
  });
}

function renderTables(data) {
  const container = document.getElementById("groups-container");
  container.innerHTML = "";

  if (!data || data.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #d4a35b;">No hay información de grupos disponible en este momento.</p>`;
    return;
  }

  data.forEach((groupData) => {
    const card = document.createElement("div");
    card.className = "group-card";

    let tableHTML = `
      <table class="standing-table">
        <thead>
          <tr>
            <th class="group-title" colspan="2">${groupData.group}</th>
            <th class="text-center">PJ</th>
            <th class="text-center">G</th>
            <th class="text-center">E</th>
            <th class="text-center">P</th>
            <th class="text-center">GF</th>
            <th class="text-center">GC</th>
            <th class="text-center">DG</th>
            <th class="text-center">PCD</th>
            <th class="text-center">Pts</th>
            <th class="text-center">RESULTADOS</th>
          </tr>
        </thead>
        <tbody>
    `;

    groupData.teams.forEach((team) => {
      const isQualifiedClass = team.rank <= 2 ? "qualified" : "";

      const dotsHTML = team.form
        .map((res) => {
          let statusClass = "none";
          if (res === "W") statusClass = "win";
          if (res === "D") statusClass = "draw";
          if (res === "L") statusClass = "loss";
          return `<span class="dot ${statusClass}"></span>`;
        })
        .join("");

      tableHTML += `
        <tr class="${isQualifiedClass}">
          <td class="rank-col">${team.rank}</td>
          <td>
            <div class="team-name">
              <img src="${team.flag}" class="flag" alt="Bandera de ${team.name}">
              <span>${team.name}</span>
            </div>
          </td>
          <td class="text-center">${team.pj}</td>
          <td class="text-center">${team.g}</td>
          <td class="text-center">${team.e}</td>
          <td class="text-center">${team.p}</td>
          <td class="text-center">${team.gf}</td>
          <td class="text-center">${team.gc}</td>
          <td class="text-center">${team.dg}</td>
          <td class="text-center" style="color: #8a96a8;">${team.pcd}</td>
          <td class="text-center text-bold">${team.pts}</td>
          <td class="text-center">
            <div class="results-dots">${dotsHTML}</div>
          </td>
        </tr>
      `;
    });

    tableHTML += `
        </tbody>
      </table>
    `;

    card.innerHTML = tableHTML;
    container.appendChild(card);
  });
}
