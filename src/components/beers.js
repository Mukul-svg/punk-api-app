import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Beer.css';

const Beers = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
    setCurrentPage(1);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    setCurrentPage(1);
  };

  const filteredBeers = beers.filter((beer) => {
    const nameIncludesSearchTerm = beer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatchesFilter = !filterType || beer.tagline.toLowerCase().includes(filterType.toLowerCase());
    return nameIncludesSearchTerm && typeMatchesFilter;
  });

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBeers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBeers.length / itemsPerPage);

  const beerTypes = Array.from(new Set(beers.map((beer) => beer.tagline.toLowerCase())));

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={filterType} onChange={handleFilterChange}>
          <option value="">All</option>
          {beerTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="beer-container">
        <div className="beer-grid">
          {getCurrentPageItems().map((beer) => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <h2>{beer.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Beers;