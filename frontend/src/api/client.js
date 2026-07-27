export async function fetchProperties(params = {}) {
    try{ 
        const queryString = new URLSearchParams(params).toString();
        const url = `http://localhost:5000/api/properties?${queryString}`;
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error;
    }
}