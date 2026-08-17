export async function fetchProperties(params = {}) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = `http://localhost:5000/api/properties?${queryString}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function fetchPropertyDetail(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/properties/${id}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching property detail:', error);
    throw error;
  }
}

export async function fetchOpenHouses(id) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/properties/${id}/openhouses`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching open houses:', error);
    throw error;
  }
}