<<<<<<< HEAD
export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Content-Type', 'application/json');

  const apiKey = process.env.FOOTBALL_API_KEY;
  const apiUrl = "https://api.football-data.org/v4/competitions/WC/matches?season=2026";

  if (!apiKey) {
    return response.status(500).json({ 
      error: "Error del sistema: Falta configurar la variable FOOTBALL_API_KEY en los ajustes de Vercel." 
    });
  }

  try {
    const apiResponse = await fetch(apiUrl, {
      method: "GET",
      headers: { "X-Auth-Token": apiKey },
    });

    if (!apiResponse.ok) {
      return response.status(apiResponse.status).json({ 
        error: `Error proveniente de la API externa (${apiResponse.status})` 
      });
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
=======
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
>>>>>>> 5f198f424931ecd6a59699c4ad120564e6db6b24
  }
}