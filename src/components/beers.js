import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Beer.css';

const Beers = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://api.punkapi.com/v2/beers')
      .then((response) => {
        setBeers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
        <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    <div className="beer-container">
      <div className="beer-grid">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Beers;