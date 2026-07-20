export default async function handler(req, res) {
  const apiUrl = "https://api.football-data.org/v4/competitions/WC/matches?season=2026";

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Auth-Token": "4b51275c546a4e4db7c535a5e18c82e4" },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener los partidos" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}