const express = require('express');
const router = express.Router();
const pool = require('../db/mysql');


router.get('/', async (req, res) => {
  try {
    const{
      limit = 20,
      offset = 0,
      city,
      zipcode,
      minPrice,
      maxPrice,
      beds,
      baths
    } = req.query;
  
    const limitValue = Number(limit);
    const offsetValue = Number(offset);

    const conditions = [];
    const values = [];

    //city
    if (city) {
      conditions.push('LOWER(TRIM(L_City)) = LOWER(TRIM(?))');
      values.push(city);

    }
    //zipcode
    if (zipcode) {
      conditions.push('L_Zip = ?');
      values.push(zipcode);

    }
    //minPrice
    if (minPrice) {

      if(Number(minPrice) < 0){
        return res.status(400).json({ error: 'minPrice must be a non-negative number' });
      }
      if (isNaN(Number(minPrice))) {
        return res.status(400).json({ error: 'minPrice must be a valid number' });
      }
      conditions.push('L_SystemPrice >= ?');
      values.push(Number(minPrice));
    }
    //maxPrice
    if (maxPrice) {
      if(Number(maxPrice) < 0){
        return res.status(400).json({ error: 'maxPrice must be a non-negative number' });
      }
      if (isNaN(Number(maxPrice))) {
        return res.status(400).json({ error: 'maxPrice must be a valid number' });
      }
      conditions.push('L_SystemPrice <= ?');
      values.push(Number(maxPrice));
    }
    //beds
    if (beds) {
      if(Number(beds) < 0){
        return res.status(400).json({ error: 'beds must be a non-negative number' });
      }
      if (isNaN(Number(beds))) {
        return res.status(400).json({ error: 'beds must be a valid number' });
      }
      conditions.push('L_Keyword2 >= ?');
      values.push(Number(beds));
    }
    //baths
    if (baths) {
      if(Number(baths) < 0){
        return res.status(400).json({ error: 'baths must be a non-negative number' });
      }
      if (isNaN(Number(baths))) {
        return res.status(400).json({ error: 'baths must be a valid number' });
      }
      conditions.push('LM_Dec_3 >= ?');
      values.push(Number(baths));
    }
    
    const whereClause = conditions.length
      ? `WHERE ${conditions.join(" AND ")}`
      : "";
   

    const countQuery = `SELECT COUNT(*) as total FROM rets_property ${whereClause}`;
    const [countResult] = await pool.query(countQuery, values);
    const total = countResult[0].total;

    const dataQuery = `SELECT * FROM rets_property ${whereClause} LIMIT ? OFFSET ?`;
    const [results] = await pool.query(dataQuery, [...values, Number(limit), Number(offset)]);


    res.json({ total, limit, offset, results });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

  router.get('/:id/openhouses', async (req, res) => {
    try {
      const { id } = req.params;
      const [events] = await pool.query('SELECT * FROM rets_property WHERE L_ListingID = ?', [id]);
      if (events.length === 0) {
        return res.status(404).json({ error: 'Property not found' });
      }
      const [openHouseEvents] = await pool.query('SELECT * FROM rets_openhouse WHERE L_ListingID = ? ORDER BY OpenHouseDate, OH_StartTime', [id]);
      res.json({
        propertyID: id,
        openHouseEvents
       });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const [property] = await pool.query('SELECT * FROM rets_property WHERE L_ListingID = ?', [id]);
      if (property.length === 0) {
        return res.status(404).json({ error: 'Property not found' });
      }
      res.json(property[0]);
     } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch property'});
    }});

module.exports = router;

