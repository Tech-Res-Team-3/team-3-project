import axios from "axios";

const NHTSA_BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/";

/**
 * Fetch vehicle details from NHTSA by VIN and model year.
 * @param vin The VIN string (can be partial).
 * @param modelYear The model year (recommended by API docs).
 */
export async function fetchVehicleDetailsByVin(vin: string, modelYear?: number) {
    // Build the endpoint
    let url = `${NHTSA_BASE_URL}${encodeURIComponent(vin)}?format=json`;
    if (modelYear) {
        url += `&modelyear=${modelYear}`;
    }
    const response = await axios.get(url);
    return response.data;
}