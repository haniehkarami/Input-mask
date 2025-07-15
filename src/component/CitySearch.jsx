import { useState } from "react";
import cities from "../cities.json";

import "../index.css";

function CitySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredCities([]);
      return;
    }

    const matchesCities = cities.filter((city) => city.startsWith(term));
    setFilteredCities(matchesCities);
  };

  const handleSuggestionClick = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  const handleKeyDown = (e) => {
    // در این قسمت تب اعمال نمیشه و سوالم از منتور بابت این قسمت بود
    if ((e.key === "Tab" || e.key === "Enter") && filteredCities.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      setSearchTerm(filteredCities[0]);
      setFilteredCities([]);
    }
  };

  return (
    <div className="container">
      <div className="input-wrapper">
        <div className="input-container">
          <input
            className="transparent-input"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder=""
          />
          <label className={searchTerm ? "hidden" : ""}>
            Search for a city :
          </label>
          {searchTerm && (
            <span className="ghost-text">
              <span className="typed-text">{searchTerm}</span>
              <span className="suggested-text">
                {filteredCities[0]?.slice(searchTerm.length)}
              </span>
            </span>
          )}
        </div>
      </div>

      {filteredCities.length > 0 && (
        <ul className="dropdown">
          {filteredCities.map((city, index) => (
            <li key={index} onClick={() => handleSuggestionClick(city)}>
              <span>{city.slice(0, searchTerm.length)}</span>
              {city.slice(searchTerm.length)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CitySearch;
