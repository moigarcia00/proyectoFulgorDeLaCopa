const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_KEY_LOCAL = "4b51275c546a4e4db7c535a5e18c82e4";

const apiUrl = isLocalhost 
  ? "https://corsproxy.io/?" + encodeURIComponent("https://api.football-data.org/v4/competitions/WC/standings?season=2026")
  : "/api/matches?endpoint=standings";

const gruposOficialesMundial = [
  { group: "Grupo A", teams: [{ key: ["Mexico", "México"], flag: "https://flagcdn.com/w40/mx.png", name: "México" }, { key: ["South Africa", "Sudáfrica"], flag: "https://flagcdn.com/w40/za.png", name: "Sudáfrica" }, { key: ["Czech Republic", "Czechia", "República Checa"], flag: "https://flagcdn.com/w40/cz.png", name: "República Checa" }, { key: ["South Korea", "Korea Republic", "Corea del Sur"], flag: "https://flagcdn.com/w40/kr.png", name: "Corea del Sur" }] },
  { group: "Grupo B", teams: [{ key: ["Switzerland", "Suiza"], flag: "https://flagcdn.com/w40/ch.png", name: "Suiza" }, { key: ["Canada", "Canadá"], flag: "https://flagcdn.com/w40/ca.png", name: "Canadá" }, { key: ["Bosnia-Herzegovina", "Bosnia"], flag: "https://flagcdn.com/w40/ba.png", name: "Bosnia y Herzegovina" }, { key: ["Qatar", "Catar"], flag: "https://flagcdn.com/w40/qa.png", name: "Catar" }] },
  { group: "Grupo C", teams: [{ key: ["Brazil", "Brasil"], flag: "https://flagcdn.com/w40/br.png", name: "Brasil" }, { key: ["Morocco", "Marruecos"], flag: "https://flagcdn.com/w40/ma.png", name: "Marruecos" }, { key: ["Scotland", "Escocia"], flag: "https://flagcdn.com/w40/gb-sct.png", name: "Escocia" }, { key: ["Haiti", "Haití"], flag: "https://flagcdn.com/w40/ht.png", name: "Haití" }] },
  { group: "Grupo D", teams: [{ key: ["United States", "USA", "Estados Unidos"], flag: "https://flagcdn.com/w40/us.png", name: "Estados Unidos" }, { key: ["Australia"], flag: "https://flagcdn.com/w40/au.png", name: "Australia" }, { key: ["Paraguay"], flag: "https://flagcdn.com/w40/py.png", name: "Paraguay" }, { key: ["Turkey", "Türkiye", "Turquía"], flag: "https://flagcdn.com/w40/tr.png", name: "Turquía" }] },
  { group: "Grupo E", teams: [{ key: ["Germany", "Alemania"], flag: "https://flagcdn.com/w40/de.png", name: "Alemania" }, { key: ["Ivory Coast", "Costa de Marfil"], flag: "https://flagcdn.com/w40/ci.png", name: "Costa de Marfil" }, { key: ["Ecuador"], flag: "https://flagcdn.com/w40/ec.png", name: "Ecuador" }, { key: ["Curacao", "Curazao"], flag: "https://flagcdn.com/w40/cw.png", name: "Curazao" }] },
  { group: "Grupo F", teams: [{ key: ["Netherlands", "Países Bajos"], flag: "https://flagcdn.com/w40/nl.png", name: "Países Bajos" }, { key: ["Japan", "Japón"], flag: "https://flagcdn.com/w40/jp.png", name: "Japón" }, { key: ["Sweden", "Suecia"], flag: "https://flagcdn.com/w40/se.png", name: "Suecia" }, { key: ["Tunisia", "Túnez"], flag: "https://flagcdn.com/w40/tn.png", name: "Túnez" }] },
  { group: "Grupo G", teams: [{ key: ["Belgium", "Bélgica"], flag: "https://flagcdn.com/w40/be.png", name: "Bélgica" }, { key: ["Egypt", "Egipto"], flag: "https://flagcdn.com/w40/eg.png", name: "Egipto" }, { key: ["Iran", "Irán"], flag: "https://flagcdn.com/w40/ir.png", name: "Irán" }, { key: ["New Zealand", "Nueva Zelanda"], flag: "https://flagcdn.com/w40/nz.png", name: "Nueva Zelanda" }] },
  { group: "Grupo H", teams: [{ key: ["Spain", "España"], flag: "https://flagcdn.com/w40/es.png", name: "España" }, { key: ["Cape Verde", "Cabo Verde"], flag: "https://flagcdn.com/w40/cv.png", name: "Cabo Verde" }, { key: ["Uruguay"], flag: "https://flagcdn.com/w40/uy.png", name: "Uruguay" }, { key: ["Saudi Arabia", "Arabia Saudita"], flag: "https://flagcdn.com/w40/sa.png", name: "Arabia Saudita" }] },
  { group: "Grupo I", teams: [{ key: ["France", "Francia"], flag: "https://flagcdn.com/w40/fr.png", name: "Francia" }, { key: ["Norway", "Noruega"], flag: "https://flagcdn.com/w40/no.png", name: "Noruega" }, { key: ["Senegal"], flag: "https://flagcdn.com/w40/sn.png", name: "Senegal" }, { key: ["Iraq", "Irak"], flag: "https://flagcdn.com/w40/iq.png", name: "Irak" }] },
  { group: "Grupo J", teams: [{ key: ["Argentina"], flag: "https://flagcdn.com/w40/ar.png", name: "Argentina" }, { key: ["Austria"], flag: "https://flagcdn.com/w40/at.png", name: "Austria" }, { key: ["Algeria", "Argelia"], flag: "https://flagcdn.com/w40/dz.png", name: "Argelia" }, { key: ["Jordan", "Jordania"], flag: "https://flagcdn.com/w40/jo.png", name: "Jordania" }] },
  { group: "Grupo K", teams: [{ key: ["Colombia"], flag: "https://flagcdn.com/w40/co.png", name: "Colombia" }, { key: ["Portugal"], flag: "https://flagcdn.com/w40/pt.png", name: "Portugal" }, { key: ["Congo DR", "RD Congo"], flag: "https://flagcdn.com/w40/cd.png", name: "RD Congo" }, { key: ["Uzbekistan", "Uzbekistán"], flag: "https://flagcdn.com/w40/uz.png", name: "Uzbekistán" }] },
  { group: "Grupo L", teams: [{ key: ["England", "Inglaterra"], flag: "https://flagcdn.com/w40/gb-eng.png", name: "Inglaterra" }, { key: ["Croatia", "Croacia"], flag: "https://flagcdn.com/w40/hr.png", name: "Croacia" }, { key: ["Ghana"], flag: "https://flagcdn.com/w40/gh.png", name: "Ghana" }, { key: ["Panama", "Panamá"], flag: "https://flagcdn.com/w40/pa.png", name: "Panamá" }] }
];

document.addEventListener("DOMContentLoaded", fetchAndRenderStandings);

async function fetchAndRenderStandings() {
  const container = document.getElementById("groups-container");
  if (!container) return;

  try {
    const headers = isLocalhost ? { "X-Auth-Token": API_KEY_LOCAL } : {};
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

    const data = await response.json();
    const standingsData = data.standings || [];

    const mundialDataFormatted = mapApiToOfficialGroups(standingsData);
    renderTables(mundialDataFormatted);

  } catch (error) {
    console.warn("Usando mapa base por fallo/sin conexión de API:", error);
    renderTables(getFallbackGroupsWithZeroes());
  }
}

function normalizeName(str) {
  return (str || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

function mapApiToOfficialGroups(standingsList) {
  let apiEntries = [];

  standingsList.forEach((groupItem) => {
    const table = groupItem.table || [];
    table.forEach((entry) => {
      if (entry.team && entry.team.name) {
        let parsedForm = [];
        if (typeof entry.form === "string" && entry.form.trim() !== "") {
          parsedForm = entry.form.replace(/,/g, "").split("");
        } else if (Array.isArray(entry.form)) {
          parsedForm = entry.form;
        }

        apiEntries.push({
          apiName: entry.team.name,
          pj: entry.playedGames ?? 0,
          g: entry.won ?? 0,
          e: entry.draw ?? 0,
          p: entry.lost ?? 0,
          gf: entry.goalsFor ?? 0,
          gc: entry.goalsAgainst ?? 0,
          dg: entry.goalDifference ?? 0,
          pcd: entry.disciplinePoints ?? 0,
          pts: entry.points ?? 0,
          form: parsedForm
        });
      }
    });
  });

  return gruposOficialesMundial.map((groupObj) => {
    let teamsWithStats = groupObj.teams.map((teamObj) => {
      const matchedApiData = apiEntries.find(entry => {
        const normApi = normalizeName(entry.apiName);
        return teamObj.key.some(k => normApi.includes(normalizeName(k)));
      });

      let stats = matchedApiData || {
        pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, dg: 0, pcd: 0, pts: 0, form: []
      };

      let finalForm = [...stats.form];
      if (finalForm.length === 0 && stats.pj > 0) {
        for (let i = 0; i < stats.g; i++) finalForm.push("W");
        for (let i = 0; i < stats.e; i++) finalForm.push("D");
        for (let i = 0; i < stats.p; i++) finalForm.push("L");
      }

      return {
        flag: teamObj.flag,
        name: teamObj.name,
        ...stats,
        form: finalForm
      };
    });

    teamsWithStats.sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.dg !== a.dg) return b.dg - a.dg;
      return b.gf - a.gf;
    });

    teamsWithStats = teamsWithStats.map((team, index) => ({
      ...team,
      rank: index + 1
    }));

    return {
      group: groupObj.group,
      teams: teamsWithStats
    };
  });
}

function getFallbackGroupsWithZeroes() {
  return gruposOficialesMundial.map((groupObj) => ({
    group: groupObj.group,
    teams: groupObj.teams.map((teamObj, index) => ({
      rank: index + 1,
      flag: teamObj.flag,
      name: teamObj.name,
      pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, dg: 0, pcd: 0, pts: 0,
      form: []
    }))
  }));
}

function renderTables(data) {
  const container = document.getElementById("groups-container");
  if (!container) return;
  container.innerHTML = ""; 

  data.forEach(groupData => {
    const card = document.createElement("div");
    card.className = "group-card";

    let tableHTML = `
      <table class="standing-table">
        <thead>
          <tr>
            <th class="group-title" colspan="2">${groupData.group}</th>
            <th class="text-center" title="Partidos Jugados">PJ</th>
            <th class="text-center" title="Ganados">G</th>
            <th class="text-center" title="Empatados">E</th>
            <th class="text-center" title="Perdidos">P</th>
            <th class="text-center" title="Goles a Favor">GF</th>
            <th class="text-center" title="Goles en Contra">GC</th>
            <th class="text-center" title="Diferencia de Goles">DG</th>
            <th class="text-center" title="Puntos Conducta Deportiva">PCD</th>
            <th class="text-center" title="Puntos Totales">Pts</th>
            <th class="text-center">RESULTADOS</th>
          </tr>
        </thead>
        <tbody>
    `;

    groupData.teams.forEach(team => {
      const isQualifiedClass = team.rank <= 2 ? "qualified" : "";

      let dotsHTML = "";
      for (let i = 0; i < 5; i++) {
        const res = team.form && team.form[i] ? String(team.form[i]).toUpperCase() : null;
        let statusClass = "none";

        if (res === "W" || res === "G") statusClass = "win";
        if (res === "D" || res === "E") statusClass = "draw";
        if (res === "L" || res === "P") statusClass = "loss";

        dotsHTML += `<span class="dot ${statusClass}"></span>`;
      }

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