import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyDetail, fetchOpenHouses } from '../api/client';
import './PropertyDetailPage.css';

function PropertyDetailPage(){
    const{id} =  useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [property, setProperty] = useState(null);
const [openHouses, setOpenHouses] = useState([]);
      useEffect(() => {
    loadPropertyData();
  }, [id]);

  async function loadPropertyData() {
    try {
      setLoading(true);
      setError(null);

      const [propertyData, openHousesData] = await Promise.all([
        fetchPropertyDetail(id),
        fetchOpenHouses(id)
      ]);

      setProperty(propertyData);
      setOpenHouses(openHousesData.openhouses || []);
    } catch (err) {
      setError(err.message || 'Failed to load property details');
    } finally {
      setLoading(false);
    }
  }
  if (loading){
    return (<div className="loading"> Loading... </div>);
}
return(
    <>
    <button onClick={() => navigate('/')} className="btn-back"> Back To Listings </button>
    <h2> Property Details</h2>
      <div>
        <h1>${property.L_SystemPrice?.toLocaleString()}</h1>
        <p className="property-address">{property.L_Address}</p>
        <p className="property-location">
          {property.L_City}, {property.L_State} {property.L_Zip}
        </p>
      </div>

      <div>{property.L_Keyword2}</div>
      <div> Bedrooms </div>
      <div>{property.LM_Dec_3}</div>
      <div> Bathrooms </div>
      <div>{property.LM_Int2_3.toLocaleString()}</div>
      <div> SqFt </div>
      <div>{property.YearBuilt}</div>
      <div> Year Built</div>
      {property.PublicRemarks && (
            <div className="property-section">
              <h2>Description</h2>
              <p className="property-description">{property.PublicRemarks}</p>
            </div>
          )}

    
    </>

)
}


export default PropertyDetailPage;