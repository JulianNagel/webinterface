import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [bands, setBands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBands = async () => {
      try {
        const response = await fetch(`./mock.json?query=${searchTerm}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer WivSa3LfxEIzYCpZB8j08kwfBuDe",
          },
        });
        const data = await response.json();
        setBands(data.response.bands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBands();
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
              className="search-bar"
          />
        </div>
        {searchTerm ? (
            filteredBands.length > 0 ? (
                <ul>
                  {filteredBands.map((band, index) => (
                      <li key={index}>
                        <h2>{band.name}</h2>
                        <p>{band.permalink}</p>
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