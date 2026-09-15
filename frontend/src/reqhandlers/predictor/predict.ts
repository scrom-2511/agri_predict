import axios from 'axios';
import { BACKEND_URL } from '@/config';
import type {
  PredictorFormData,
  FertilizerPredictionPayload,
  FertilizerPredictionResponse,
} from '@/components/predictor/types';

// Map lowercase strings to the exact choice string required by backend FertilizerInputSerializer
const SERIALIZER_CROP_CHOICES: Record<string, string> = {
  rice: 'rice',
  wheat: 'Wheat',
  tobacco: 'Tobacco',
  sugarcane: 'Sugarcane',
  pulses: 'Pulses',
  pomegranate: 'pomegranate',
  paddy: 'Paddy',
  'oil seeds': 'Oil seeds',
  millets: 'Millets',
  maize: 'Maize',
  'ground nuts': 'Ground Nuts',
  cotton: 'Cotton',
  coffee: 'coffee',
  watermelon: 'watermelon',
  barley: 'Barley',
  kidneybeans: 'kidneybeans',
  orange: 'orange',
};

export const predictFertilizerReq = async (
  data: PredictorFormData | FertilizerPredictionPayload
): Promise<FertilizerPredictionResponse> => {
  const rawCrop = 'crop_type' in data ? data.crop_type : data.cropType;
  const rawSoil = 'soil_type' in data ? data.soil_type : data.soilType;

  const normalizedCrop = SERIALIZER_CROP_CHOICES[rawCrop.toLowerCase()] || rawCrop;

  const payload: FertilizerPredictionPayload = {
    temperature: Number(data.temperature),
    humidity: Number(data.humidity),
    moisture: Number(data.moisture),
    soil_type: rawSoil,
    crop_type: normalizedCrop,
    nitrogen: Number(data.nitrogen),
    potassium: Number(data.potassium),
    phosphorous: Number(data.phosphorous),
  };

  try {
    console.log(payload);
    const res = await axios.post<FertilizerPredictionResponse>(
      `${BACKEND_URL}/api/predictor/predict/`,
      payload
    );

    console.log(res.data)
    return res.data;
  } catch (error: any) {
    const errorData = error.response?.data || {};

    // Extract first error from serializer validation dict if present
    const fieldErrorKey = Object.keys(errorData).find((key) => Array.isArray(errorData[key]));
    const firstFieldError = fieldErrorKey ? `${fieldErrorKey}: ${errorData[fieldErrorKey][0]}` : null;

    const message =
      errorData.error ||
      errorData.detail ||
      firstFieldError ||
      error.message ||
      'Failed to compute fertilizer prediction';

    throw new Error(message);
  }
};
