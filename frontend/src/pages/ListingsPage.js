import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../api/client';
import './ListingsPage.css';

function ListingsPage() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { loadProperties(); }, []);

    async function loadProperties() {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProperties();
            setProperties(data.results);
        } catch (error) {
            setError('Failed to load properties');
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (error) {
        return <div className="error">{error}</div>;
    }
    return(
        <div className="listings-page">
            <h1>Property Listings</h1>
            <p>Total Properties: {properties.length}</p>
            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard key={property.L_ListingID} property={property} />
                ))}
            </div>
        </div>
    );

}
function PropertyCard({ property }) {
    let photo = "";
    try {
    const photos = JSON.parse(property.L_Photos || "[]");

    if (Array.isArray(photos) && photos.length > 0) {
      photo = photos[0];
    }
  } catch (error) {
    photo = "";
  }
  return (
    <div className="property-card">
      <div className="property-image">
        <img
          src={photo}
          alt={property.L_Address || "Property"}
        />
      </div>

      <div className="property-info">
        <h2 className="price">
          ${property.L_SystemPrice?.toLocaleString() || "N/A"}
        </h2>

        <p className="address">
          {property.L_Address}
        </p>

        <p className="city">
          {property.L_City}, {property.L_State}
        </p>

        <div className="property-details">
          {property.L_Keyword2 && (
            <span>{property.L_Keyword2} beds</span>
          )}

          {property.LM_Dec_3 && (
            <>
              <span> • </span>
              <span>{property.LM_Dec_3} baths</span>
            </>
          )}

          {property.LM_Int2_3 && (
            <>
              <span> • </span>
              <span>
                {property.LM_Int2_3.toLocaleString()} sqft
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListingsPage;


