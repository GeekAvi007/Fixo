const API_KEY = "YOUR_OPENROUTESERVICE_API_KEY"; // Get from OpenRouteService

export const getRoute = async (start, end) => {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${start}&end=${end}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.routes[0].geometry;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
