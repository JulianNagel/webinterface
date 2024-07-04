import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';

const fetchBands = async (query, setBands) => {
  try {
    const response = await fetch(`https://api.srgssr.ch/mx3/v2/bands?query=${query}`, {
      headers: {
        "Accept": "application/json",
        Authorization: "Bearer WivSa3LfxEIzYCpZB8j08kwfBuDe",
      },
    });
    const data = await response.json();
    setBands(data.response.bands);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const App = () => {
  const [bands, setBands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBands(searchTerm, setBands);
  }, [searchTerm]);

  const filteredBands = bands.filter((band) =>
      band.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="app">
        <div className="search-container">
          <input
              type="text"
              placeholder="Suche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searh-bar"
          />
        </div>
        {searchTerm ? (
            filteredBands.length > 0 ? (
                <ul>

                  {filteredBands.map((band, index) => (
                      <li key={index} className="results-item">
                        <h2>
                          {band.name}{" "}
                          <span className="separator">|</span>{" "}
                          <a href={band.permalink} target="_blank" rel="noopener noreferrer">
                            {band.permalink}
                          </a>
                        </h2>
                      </li>
                  ))}

                </ul>
            ) : (
                <p>Kein Ergebniss</p>
            )
        ) : (
            <p>Geben Sie einen Suchbegriff ein</p>
        )}
      </div>
  );
}

export default App;