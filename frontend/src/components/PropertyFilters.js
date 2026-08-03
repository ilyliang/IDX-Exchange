import React, { useState } from 'react';
import './PropertyFilters.css';

function PropertyFilters({ onSearch }) {

  const [filters, setFilters] = useState({
    city: '',
    zipcode: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });

  function handleUpdate(event){
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  }

  function handleSearch(event){
    event.preventDefault();
    const cleanedFilters = {};
    for (const key in filters) {
      if (filters[key].trim() !== '') {
        cleanedFilters[key] = filters[key].trim();
      }
    }
    onSearch(cleanedFilters);
  }

  function handleClear(){
    setFilters({
        city: '',
        zipcode: '',
        minPrice: '',
        maxPrice: '', 
        beds: '',
        baths: ''
    });
    onSearch({});
  }
  return(
    <form className="property-filters" onSubmit={handleSearch}>
        <div className = "filter-group">
        <label> City </label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleUpdate}
        />
        </div>

        <div className = "filter-group">
        <label> Zipcode </label>
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={filters.zipcode}
          onChange={handleUpdate}
        />
        </div>

        <div className = "filter-group">
        <label> Min Price </label>
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleUpdate}
        />
        </div>

        <div className = "filter-group">
        <label> Max Price </label>
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleUpdate}
        />
        </div>

        <div className = "filter-group">
        <label> Beds </label>
        <select
          name="beds"
          value={filters.beds}
          onChange={handleUpdate}
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
        </div>

        <div className = "filter-group">
        <label> Baths </label>
        <select
          name="baths"
          value={filters.baths}
          onChange={handleUpdate}
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5+</option>
        </select>
        </div>


        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>

    </form>
  );




}

export default PropertyFilters;