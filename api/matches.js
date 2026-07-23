export default async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET");
  response.setHeader("Content-Type", "application/json");

  const apiKey = process.env.FOOTBALL_API_KEY;
  if (!apiKey) {
    return response.status(500).json({
      error:
        "Error del sistema: Falta configurar la variable FOOTBALL_API_KEY en los ajustes de Vercel.",
    });
  }

  const endpointType = request.query.endpoint || "matches";

  let externalUrl =
    "https://api.football-data.org/v4/competitions/WC/matches?season=2026";

  if (endpointType === "scorers") {
    externalUrl =
      "https://api.football-data.org/v4/competitions/WC/scorers?season=2026";
  } else if (endpointType === "standings" || endpointType === "clasification") {
    externalUrl =
      "https://api.football-data.org/v4/competitions/WC/standings?season=2026";
  }

  try {
    const apiResponse = await fetch(externalUrl, {
      method: "GET",
      headers: { "X-Auth-Token": apiKey },
    });

    if (!apiResponse.ok) {
      return response.status(apiResponse.status).json({
        error: `Error proveniente de la API externa (${apiResponse.status})`,
      });
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
