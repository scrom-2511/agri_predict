import type { PredictorFormData } from './types';

export interface PresetScenario {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  data: PredictorFormData;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'wheat-loam',
    name: 'Wheat Winter Crop',
    subtitle: 'Alluvial Loamy Soil · Moderate Moisture',
    badge: 'Cereal Grain',
    data: {
      temperature: 24,
      humidity: 58,
      moisture: 42,
      soilType: 'Loamy',
      cropType: 'Wheat',
      nitrogen: 38,
      potassium: 19,
      phosphorous: 24
    }
  },
  {
    id: 'paddy-wet',
    name: 'Monsoon Paddy',
    subtitle: 'Clayey Soil · High Humidity & Moisture',
    badge: 'Wetland Staple',
    data: {
      temperature: 31,
      humidity: 84,
      moisture: 72,
      soilType: 'Clayey',
      cropType: 'Paddy',
      nitrogen: 45,
      potassium: 22,
      phosphorous: 18
    }
  },
  {
    id: 'cotton-black',
    name: 'Cotton Cash Crop',
    subtitle: 'Deep Black Regur Soil · High Potash Need',
    badge: 'Cash Crop',
    data: {
      temperature: 29,
      humidity: 62,
      moisture: 35,
      soilType: 'Black',
      cropType: 'Cotton',
      nitrogen: 52,
      potassium: 35,
      phosphorous: 28
    }
  },
  {
    id: 'maize-sandy',
    name: 'Maize / Corn Vigor',
    subtitle: 'Sandy Loam · Low Nitrogen Alert',
    badge: 'Coarse Grain',
    data: {
      temperature: 27,
      humidity: 50,
      moisture: 30,
      soilType: 'Sandy',
      cropType: 'Maize',
      nitrogen: 20,
      potassium: 12,
      phosphorous: 15
    }
  }
];
