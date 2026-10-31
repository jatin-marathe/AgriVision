// import axiosInstance from '../api/axiosInstance';

// export const getDiseaseCrops = async () => {
//   const { data } = await axiosInstance.get('/disease/crops');
//   return data.data.crops;
// };

// export const assessDiseaseRisk = async (payload) => {
//   const { data } = await axiosInstance.post('/disease/assess', payload);
//   return data.data;
// };

import axiosInstance from '../api/axiosInstance';

export const getDiseaseCrops = async () => {
  const { data } = await axiosInstance.get('/disease/crops');
  return data.data.crops;
};

export const assessDiseaseRisk = async (payload) => {
  const { data } = await axiosInstance.post('/disease/assess', payload);
  return { ...data.data, recordSaved: data.record?.saved };
};
