import { useState, useEffect, useRef } from "react";
import { getCities } from "../../../lib/getCities";

interface City {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
}

interface CitySearchProps {
  handleCityClick: (cityName: string, cityCountry: string) => void;
  isGuestsInputOpen: boolean;
}

export function CitySearch({
  handleCityClick,
  isGuestsInputOpen,
}: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isQueryCitiesOpen, setIsQueryCitiesOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCity) return;

    if (query.length >= 3) {
      setIsQueryCitiesOpen(true);
      const fetchCities = async () => {
        try {
          const result = await getCities(query);
          setCities(result);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    } else {
      setCities([]);
      setIsQueryCitiesOpen(false);
    }
  }, [query, selectedCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsQueryCitiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCitySelection = (cityName: string, cityCountry: string) => {
    setQuery(cityName + ", " + cityCountry);
    setSelectedCity(cityName);
    setIsQueryCitiesOpen(false);
    handleCityClick(cityName, cityCountry);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedCity(null);
  };

  return (
    <>
      <input
        type="text"
        disabled={isGuestsInputOpen}
        placeholder="Para onde você vai?"
        value={query}
        onChange={handleInputChange}
        ref={inputRef}
        className="text-left bg-transparent text-md placeholder-zinc-400 outline-none md:flex-1 md:text-lg"
      />
      {isQueryCitiesOpen && (
        <ul
          ref={listRef}
          className="flex w-32 my-7 z-10 rounded-md shadow-shape absolute flex-col bg-zinc-900"
        >
          {cities.map((city, index) => (
            <li
              onClick={() => handleCitySelection(city.name, city.country)}
              className="px-3 py-2 shadow-shape hover:bg-zinc-600 hover:cursor-pointer"
              key={index}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 text-white"></div>
    </>
  );
}
