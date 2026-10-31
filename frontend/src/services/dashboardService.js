import axiosInstance from '../api/axiosInstance';

/**
 * Each function targets the real API endpoint defined for that module in
 * the Phase 1 architecture. Several don't exist yet (Farm Management ships
 * Phase 5, Weather Phase 6, Disease History Phase 7, Market Prices Phase 9),
 * so calls to them currently 404 — expected, not a bug. Each function
 * catches its own failure and returns null, so the dashboard renders an
 * honest "not available yet" state per card instead of one failed call
 * breaking the whole page. Once a module's backend ships, its card starts
 * rendering real data automatically with no changes needed here.
 */

const safeGet = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data.data;
  } catch {
    return null;
  }
};

export const getFarmSummary = () => safeGet('/farms/summary');
export const getWeatherSnapshot = () => safeGet('/weather/current');
export const getMarketPrices = () => safeGet('/market/prices');
export const getDiseaseHistory = () => safeGet('/disease-detection/history');
export const getNotifications = () => safeGet('/notifications');
export const getRecommendedCrops = () => safeGet('/crop-recommendation/latest');
