const mundialData = [
  {
    group: "Grupo A",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/mx.png", name: "México", pj: 3, g: 3, e: 0, p: 0, gf: 6, gc: 0, dg: 6, pcd: -6, pts: 9, form: ["W", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/za.png", name: "Sudáfrica", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 3, dg: -1, pcd: -13, pts: 4, form: ["L", "D", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/kr.png", name: "República de Corea", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 3, dg: -1, pcd: -4, pts: 3, form: ["W", "L", "L", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/cz.png", name: "República Checa", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 6, dg: -4, pcd: -1, pts: 1, form: ["L", "D", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo B",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/ch.png", name: "Suiza", pj: 3, g: 2, e: 1, p: 0, gf: 7, gc: 3, dg: 4, pcd: -3, pts: 7, form: ["D", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/ca.png", name: "Canadá", pj: 3, g: 1, e: 1, p: 1, gf: 8, gc: 3, dg: 5, pcd: -5, pts: 4, form: ["D", "W", "L", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/ba.png", name: "Bosnia y Herzegovina", pj: 3, g: 1, e: 1, p: 1, gf: 5, gc: 6, dg: -1, pcd: -10, pts: 4, form: ["D", "L", "W", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/qa.png", name: "Catar", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 10, dg: -8, pcd: -12, pts: 1, form: ["D", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo C",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/br.png", name: "Brasil", pj: 3, g: 2, e: 1, p: 0, gf: 7, gc: 1, dg: 6, pcd: -5, pts: 7, form: ["D", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/ma.png", name: "Marruecos", pj: 3, g: 2, e: 1, p: 0, gf: 6, gc: 3, dg: 3, pcd: -1, pts: 7, form: ["D", "W", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/gb-sct.png", name: "Escocia", pj: 3, g: 1, e: 0, p: 2, gf: 1, gc: 4, dg: -3, pcd: -5, pts: 3, form: ["W", "L", "L", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/ht.png", name: "Haití", pj: 3, g: 0, e: 0, p: 3, gf: 2, gc: 8, dg: -6, pcd: -7, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo D",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/us.png", name: "EE. UU.", pj: 3, g: 2, e: 0, p: 1, gf: 8, gc: 4, dg: 4, pcd: -5, pts: 6, form: ["W", "W", "L", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/au.png", name: "Australia", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 2, dg: 0, pcd: -5, pts: 4, form: ["W", "L", "D", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/py.png", name: "Paraguay", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 4, dg: -2, pcd: -12, pts: 4, form: ["L", "W", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/tr.png", name: "Turquía", pj: 3, g: 1, e: 0, p: 2, gf: 3, gc: 5, dg: -2, pcd: -3, pts: 3, form: ["L", "L", "W", "-", "-"] }
    ]
  },
  {
    group: "Grupo E",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/de.png", name: "Alemania", pj: 3, g: 2, e: 0, p: 1, gf: 10, gc: 4, dg: 6, pcd: -1, pts: 6, form: ["W", "L", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/ci.png", name: "Costa de Marfil", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 2, dg: 2, pcd: -4, pts: 6, form: ["W", "L", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/ec.png", name: "Ecuador", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 2, dg: 0, pcd: -5, pts: 4, form: ["L", "W", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/cw.png", name: "Curazao", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 9, dg: -8, pcd: -7, pts: 1, form: ["L", "L", "D", "-", "-"] }
    ]
  },
  {
    group: "Grupo F",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/nl.png", name: "Países Bajos", pj: 3, g: 2, e: 1, p: 0, gf: 10, gc: 4, dg: 6, pcd: -3, pts: 7, form: ["D", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/jp.png", name: "Japón", pj: 3, g: 1, e: 2, p: 0, gf: 7, gc: 3, dg: 4, pcd: -1, pts: 5, form: ["D", "W", "D", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/se.png", name: "Suecia", pj: 3, g: 1, e: 1, p: 1, gf: 7, gc: 7, dg: 0, pcd: -5, pts: 4, form: ["W", "L", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/tn.png", name: "Túnez", pj: 3, g: 0, e: 0, p: 3, gf: 2, gc: 12, dg: -10, pcd: -1, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo G",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/be.png", name: "Bélgica", pj: 3, g: 1, e: 2, p: 0, gf: 6, gc: 2, dg: 4, pcd: -7, pts: 5, form: ["D", "D", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/eg.png", name: "Egipto", pj: 3, g: 1, e: 2, p: 0, gf: 5, gc: 3, dg: 2, pcd: -6, pts: 5, form: ["D", "D", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/ir.png", name: "Irán", pj: 3, g: 0, e: 3, p: 0, gf: 3, gc: 3, dg: 0, pcd: -6, pts: 3, form: ["D", "D", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/nz.png", name: "Nueva Zelanda", pj: 3, g: 0, e: 1, p: 2, gf: 4, gc: 10, dg: -6, pcd: -4, pts: 1, form: ["D", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo H",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/es.png", name: "España", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 0, dg: 5, pcd: -2, pts: 7, form: ["D", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/cv.png", name: "Islas de Cabo Verde", pj: 3, g: 0, e: 3, p: 0, gf: 2, gc: 2, dg: 0, pcd: -4, pts: 3, form: ["D", "D", "D", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/uy.png", name: "Uruguay", pj: 3, g: 0, e: 2, p: 1, gf: 3, gc: 4, dg: -1, pcd: -9, pts: 2, form: ["D", "L", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/sa.png", name: "Arabia Saudí", pj: 3, g: 0, e: 2, p: 1, gf: 1, gc: 5, dg: -4, pcd: -6, pts: 2, form: ["D", "L", "D", "-", "-"] }
    ]
  },
  {
    group: "Grupo I",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/fr.png", name: "Francia", pj: 3, g: 3, e: 0, p: 0, gf: 10, gc: 2, dg: 8, pcd: -1, pts: 9, form: ["W", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/no.png", name: "Noruega", pj: 3, g: 2, e: 0, p: 1, gf: 8, gc: 7, dg: 1, pcd: -1, pts: 6, form: ["W", "W", "L", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/sn.png", name: "Senegal", pj: 3, g: 1, e: 0, p: 2, gf: 8, gc: 6, dg: 2, pcd: -2, pts: 3, form: ["L", "L", "W", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/iq.png", name: "Irak", pj: 3, g: 0, e: 0, p: 3, gf: 1, gc: 12, dg: -11, pcd: -8, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo J",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/ar.png", name: "Argentina", pj: 3, g: 3, e: 0, p: 0, gf: 8, gc: 1, dg: 7, pcd: -2, pts: 9, form: ["W", "W", "W", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/at.png", name: "Austria", pj: 3, g: 1, e: 1, p: 1, gf: 6, gc: 6, dg: 0, pcd: -4, pts: 4, form: ["L", "W", "D", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/dz.png", name: "Argelia", pj: 3, g: 1, e: 1, p: 1, gf: 5, gc: 7, dg: -2, pcd: -1, pts: 4, form: ["L", "W", "D", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/jo.png", name: "Jordania", pj: 3, g: 0, e: 0, p: 3, gf: 3, gc: 8, dg: -5, pcd: -4, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo K",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/co.png", name: "Colombia", pj: 3, g: 2, e: 1, p: 0, gf: 4, gc: 1, dg: 3, pcd: -4, pts: 7, form: ["W", "W", "D", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/pt.png", name: "Portugal", pj: 3, g: 1, e: 2, p: 0, gf: 6, gc: 1, dg: 5, pcd: -4, pts: 5, form: ["D", "D", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/cd.png", name: "RD Congo", pj: 3, g: 1, e: 1, p: 1, gf: 4, gc: 3, dg: 1, pcd: -5, pts: 4, form: ["L", "D", "W", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/uz.png", name: "Uzbekistán", pj: 3, g: 0, e: 0, p: 3, gf: 2, gc: 11, dg: -9, pcd: -4, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  },
  {
    group: "Grupo L",
    teams: [
      { rank: 1, flag: "https://flagcdn.com/w40/gb-eng.png", name: "Inglaterra", pj: 3, g: 2, e: 1, p: 0, gf: 6, gc: 2, dg: 4, pcd: -2, pts: 7, form: ["W", "W", "D", "-", "-"] },
      { rank: 2, flag: "https://flagcdn.com/w40/hr.png", name: "Croacia", pj: 3, g: 2, e: 0, p: 1, gf: 5, gc: 5, dg: 0, pcd: -2, pts: 6, form: ["L", "W", "W", "-", "-"] },
      { rank: 3, flag: "https://flagcdn.com/w40/gh.png", name: "Ghana", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 2, dg: 0, pcd: -3, pts: 4, form: ["D", "L", "W", "-", "-"] },
      { rank: 4, flag: "https://flagcdn.com/w40/pa.png", name: "Panamá", pj: 3, g: 0, e: 0, p: 3, gf: 0, gc: 4, dg: -4, pcd: -5, pts: 0, form: ["L", "L", "L", "-", "-"] }
    ]
  }
];

// 2. Función de renderizado dinámico (se mantiene idéntica, pero ahora procesará los 12 grupos)
function renderTables(data) {
    const container = document.getElementById("groups-container");
    container.innerHTML = ""; 

    data.forEach(groupData => {
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

        groupData.teams.forEach(team => {
            const isQualifiedClass = team.rank <= 2 ? "qualified" : "";

            const dotsHTML = team.form.map(res => {
                let statusClass = "none";
                if (res === "W") statusClass = "win";
                if (res === "D") statusClass = "draw";
                if (res === "L") statusClass = "loss";
                return `<span class="dot ${statusClass}"></span>`;
            }).join("");

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
                    <td class="text-center" style="color: #5f6368;">${team.pcd}</td>
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

document.addEventListener("DOMContentLoaded", () => {
    renderTables(mundialData);
});