import { Vehicle } from "../types/vehicle";

type NhtsaResult = { Variable: string; Value: string | null };

export function mapNhtsaToVehicleDraft(results: NhtsaResult[]): Partial<Vehicle> {
    const get = (name: string) =>
        results.find((r) => r.Variable === name)?.Value || "";

    return {
        make: get("Make") || undefined,
        model: get("Model") || undefined,
        year: get("Model Year") ? Number(get("Model Year")) : undefined,
        vin: get("VIN") || undefined,
        bodyStyle: get("Body Class") || undefined,
        trim: get("Trim") || undefined,
        type: get("Vehicle Type") || undefined,
        seats: get("Doors") ? Number(get("Doors")) : undefined,
        // Add more mappings as needed
    };
}