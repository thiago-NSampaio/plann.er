import axios from "axios";

interface City {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

export async function getCities(param1: string) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
    param1
  )}&limit=5&appid=6a94f6605da631af9542b62f02bc6628`;

  try {
    const response = await axios.get(url);

    const data = response.data;
    return data.map((city: City) => ({
      name: city.name,
      country: city.country,
      state: city.state,
      lat: city.lat,
      lon: city.lon,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
}
