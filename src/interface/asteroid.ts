export interface Asteroid {
  id: string;
  name: string;
  name_limited: string;
  estimated_diameter: {
    meters: {
      estimated_diameter_max: number;
      estimated_diameter_min: number;
    }
  }
}