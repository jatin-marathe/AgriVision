// import axiosInstance from '../api/axiosInstance';

// export const getCropRecommendations = async (payload) => {
//   const { data } = await axiosInstance.post('/crop/recommend', payload);
//   return data.data;
// };

import axiosInstance from '../api/axiosInstance';

export const getCropRecommendations = async (payload) => {
  const { data } = await axiosInstance.post('/crop/recommend', payload);
  return { ...data.data, recordSaved: data.record?.saved };
};
