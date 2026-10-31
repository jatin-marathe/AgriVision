// export const SERVICES = [
//   { value: 'crop', label: 'Crop Recommendation' },
//   { value: 'yield', label: 'Yield Prediction' },
//   { value: 'disease', label: 'Disease Prediction' },
//   { value: 'fertilizer', label: 'Fertilizer Guide' },
// ];

// export const SERVICE_LABELS = Object.fromEntries(SERVICES.map((s) => [s.value, s.label]));

// const LABELS = {
//   crop: 'Crop',
//   rainfall: 'Rainfall',
//   temperature: 'Temperature',
//   humidity: 'Humidity',
//   ph: 'Soil pH',
//   N: 'Nitrogen (N)',
//   P: 'Phosphorus (P)',
//   K: 'Potassium (K)',
//   soil_type: 'Soil type',
//   season: 'Season',
//   pesticides: 'Pesticides',
//   pesticide_days: 'Last pesticide spray',
//   area_ha: 'Field size',
//   growth_stage: 'Growth stage',
//   ph_class: 'Soil pH range',
// };

// const UNITS = {
//   rainfall: ' mm',
//   temperature: ' °C',
//   humidity: ' %',
//   N: ' kg/ha',
//   P: ' kg/ha',
//   K: ' kg/ha',
//   pesticides: ' tonnes',
//   area_ha: ' ha',
// };

// const VALUE_LABELS = {
//   soil_type: { clay: 'Clay', sandy: 'Sandy', loamy: 'Loamy', silt: 'Silt', red: 'Red', black: 'Black cotton', alluvial: 'Alluvial', laterite: 'Laterite' },
//   season: { kharif: 'Kharif', rabi: 'Rabi', zaid: 'Zaid', year_round: 'Year-round', summer: 'Summer', monsoon: 'Monsoon', post_monsoon: 'Post-monsoon', winter: 'Winter' },
//   pesticide_days: { '0_7': '0-7 days ago', '8_14': '8-14 days ago', '15_30': '15-30 days ago', '30_plus': '30+ days ago / none' },
//   growth_stage: { basal: 'Pre-planting / basal', vegetative: 'Vegetative growth', flowering: 'Flowering / fruiting', maturity: 'Maturity / grain filling' },
//   ph_class: { unknown: 'Unknown', acidic: 'Acidic (< 6.0)', slightly_acidic: 'Slightly acidic (6.0-6.5)', neutral: 'Neutral (6.5-7.5)', alkaline: 'Alkaline (> 7.5)' },
// };

// const formatValue = (key, value) => {
//   const mapped = VALUE_LABELS[key]?.[value];
//   if (mapped) return mapped;
//   if (key === 'crop' && typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1);
//   return `${value}${UNITS[key] || ''}`;
// };

// export const formatInputs = (inputs = {}) =>
//   Object.entries(inputs).map(([key, value]) => ({
//     key,
//     label: LABELS[key] || key,
//     value: formatValue(key, value),
//   }));

// export const formatDate = (iso) =>
//   new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

export const SERVICES = [
  { value: 'crop', label: 'Crop Recommendation' },
  { value: 'yield', label: 'Yield Prediction' },
  { value: 'disease', label: 'Disease Prediction' },
  { value: 'fertilizer', label: 'Fertilizer Guide' },
];

export const SERVICE_LABELS = Object.fromEntries(SERVICES.map((s) => [s.value, s.label]));

const LABELS = {
  crop: 'Crop',
  rainfall: 'Rainfall',
  temperature: 'Temperature',
  humidity: 'Humidity',
  ph: 'Soil pH',
  N: 'Nitrogen (N)',
  P: 'Phosphorus (P)',
  K: 'Potassium (K)',
  soil_type: 'Soil type',
  season: 'Season',
  pesticides: 'Pesticides',
  pesticide_days: 'Last pesticide spray',
  area_ha: 'Field size',
  growth_stage: 'Growth stage',
  ph_class: 'Soil pH range',
  water_availability: 'Water availability',
  farming_experience: 'Farming experience',
  market_preference: 'Market preference',
};

const UNITS = {
  rainfall: ' mm',
  temperature: ' °C',
  humidity: ' %',
  N: ' kg/ha',
  P: ' kg/ha',
  K: ' kg/ha',
  pesticides: ' tonnes',
  area_ha: ' ha',
};

const VALUE_LABELS = {
  soil_type: { clay: 'Clay', sandy: 'Sandy', loamy: 'Loamy', silt: 'Silt', red: 'Red', black: 'Black cotton', alluvial: 'Alluvial', laterite: 'Laterite' },
  season: { kharif: 'Kharif', rabi: 'Rabi', zaid: 'Zaid', year_round: 'Year-round', summer: 'Summer', monsoon: 'Monsoon', post_monsoon: 'Post-monsoon', winter: 'Winter' },
  pesticide_days: { '0_7': '0-7 days ago', '8_14': '8-14 days ago', '15_30': '15-30 days ago', '30_plus': '30+ days ago / none' },
  growth_stage: { basal: 'Pre-planting / basal', vegetative: 'Vegetative growth', flowering: 'Flowering / fruiting', maturity: 'Maturity / grain filling' },
  ph_class: { unknown: 'Unknown', acidic: 'Acidic (< 6.0)', slightly_acidic: 'Slightly acidic (6.0-6.5)', neutral: 'Neutral (6.5-7.5)', alkaline: 'Alkaline (> 7.5)' },
  water_availability: { low: 'Low (rainfed)', medium: 'Medium', high: 'High (good irrigation)' },
  farming_experience: { beginner: 'Beginner (0-3 yrs)', intermediate: 'Intermediate (3-10 yrs)', experienced: 'Experienced (10+ yrs)' },
  market_preference: { food: 'Food crops', cash: 'Cash crops', mixed: 'Mixed farming' },
};

const formatValue = (key, value) => {
  const mapped = VALUE_LABELS[key]?.[value];
  if (mapped) return mapped;
  if (key === 'crop' && typeof value === 'string') return value.charAt(0).toUpperCase() + value.slice(1);
  return `${value}${UNITS[key] || ''}`;
};

export const formatInputs = (inputs = {}) =>
  Object.entries(inputs).map(([key, value]) => ({
    key,
    label: LABELS[key] || key,
    value: formatValue(key, value),
  }));

export const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
