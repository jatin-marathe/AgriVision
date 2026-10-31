// import { useRef, useState } from 'react';
// import { FiZoomIn, FiInfo, FiCheck, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';
// import { GiPlantSeed } from 'react-icons/gi';
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';
// import { getCropRecommendations } from '../../services/cropService';

// const NUMERIC_FIELDS = [
//   { name: 'rainfall', label: 'Average Rainfall (mm)', min: 0, max: 500, placeholder: 'e.g., 120', hint: 'Growing-season rainfall (training data covers 20-300 mm)' },
//   { name: 'temperature', label: 'Average Temperature (°C)', min: 0, max: 50, placeholder: 'e.g., 25', hint: 'Average temperature during the crop season' },
//   { name: 'humidity', label: 'Average Humidity (%)', min: 0, max: 100, placeholder: 'e.g., 70' },
//   { name: 'ph', label: 'Soil pH Level', min: 0, max: 14, placeholder: '7.0', hint: 'If unknown, leave as 7.0 (neutral)' },
//   { name: 'N', label: 'Nitrogen -  N (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 90' },
//   { name: 'P', label: 'Phosphorus - P (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 42' },
//   { name: 'K', label: 'Potassium - K (kg/ha)', min: 0, max: 300, placeholder: 'e.g., 43' },
// ];

// const SOIL_OPTIONS = [
//   { value: 'clay', label: 'Clay Soil' },
//   { value: 'sandy', label: 'Sandy Soil' },
//   { value: 'loamy', label: 'Loamy Soil' },
//   { value: 'black', label: 'Black Cotton Soil' },
//   { value: 'red', label: 'Red Soil' },
//   { value: 'alluvial', label: 'Alluvial Soil' },
//   { value: 'laterite', label: 'Laterite Soil' },
// ];

// const SEASON_OPTIONS = [
//   { value: 'kharif', label: 'Kharif (June-October)' },
//   { value: 'rabi', label: 'Rabi (November-April)' },
//   { value: 'zaid', label: 'Zaid (April-June)' },
//   { value: 'year_round', label: 'Year-round cultivation' },
// ];

// const INITIAL_VALUES = {
//   rainfall: '', temperature: '', humidity: '', ph: '7.0', N: '', P: '', K: '', soil_type: '', season: '',
// };

// const validateField = (field, value) => {
//   if (value === '') return 'This field is required';
//   const num = Number(value);
//   if (!Number.isFinite(num)) return 'Enter a valid number';
//   if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
//   return '';
// };

// const CropRecommendationPage = () => {
//   const [values, setValues] = useState(INITIAL_VALUES);
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);
//   const [submitted, setSubmitted] = useState(null);
//   const resultRef = useRef(null);

//   const errors = {};
//   NUMERIC_FIELDS.forEach((f) => {
//     errors[f.name] = validateField(f, values[f.name]);
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched(Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, true])));
//     if (Object.values(errors).some(Boolean)) return;

//     const payload = Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, Number(values[f.name])]));
//     if (values.soil_type) payload.soil_type = values.soil_type;
//     if (values.season) payload.season = values.season;

//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const data = await getCropRecommendations(payload);
//       setResult(data);
//       setSubmitted(payload);
//       setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderNumber = (f) => {
//     const showError = touched[f.name] && errors[f.name];
//     const valid = touched[f.name] && !errors[f.name];
//     return (
//       <div className="crop-form__group" key={f.name}>
//         <label className="crop-form__label" htmlFor={f.name}>{f.label} *</label>
//         <div className="crop-form__control">
//           <input
//             id={f.name}
//             name={f.name}
//             type="number"
//             step="any"
//             inputMode="decimal"
//             placeholder={f.placeholder}
//             value={values[f.name]}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`crop-form__input${showError ? ' crop-form__input--error' : ''}${valid ? ' crop-form__input--valid' : ''}`}
//             aria-invalid={Boolean(showError)}
//           />
//           {valid && <FiCheck className="crop-form__tick" />}
//         </div>
//         {showError ? (
//           <p className="crop-form__error">{errors[f.name]}</p>
//         ) : (
//           f.hint && <p className="crop-form__hint">{f.hint}</p>
//         )}
//       </div>
//     );
//   };

//   const renderSelect = (name, label, options, placeholder) => (
//     <div className="crop-form__group">
//       <label className="crop-form__label" htmlFor={name}>{label}</label>
//       <select id={name} name={name} value={values[name]} onChange={handleChange} className="crop-form__input">
//         <option value="">{placeholder}</option>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>{o.label}</option>
//         ))}
//       </select>
//       <p className="crop-form__hint">Optional - used for suitability notes only</p>
//     </div>
//   );

//   return (
//     <div className="crop-page">
//       <div className="crop-page__top"><Navbar /></div>

//       <main className="crop-page__main">
//         <section className="crop-card-form">
//           <h1 className="crop-card-form__title"><FiZoomIn /> Smart Crop Recommendation</h1>
//           <p className="crop-card-form__subtitle">Get crop suggestions from a machine-learning model trained on soil and climate data</p>

//           <form className="crop-form" onSubmit={handleSubmit} noValidate>
//             <div className="crop-form__grid">
//               {NUMERIC_FIELDS.slice(0, 6).map(renderNumber)}
//               {renderNumber(NUMERIC_FIELDS[6])}
//               <div className="crop-form__group crop-form__group--spacer" />
//               {renderSelect('soil_type', 'Soil Type', SOIL_OPTIONS, 'Select Soil Type')}
//               {renderSelect('season', 'Preferred Season', SEASON_OPTIONS, 'Select Season')}
//             </div>

//             <div className="crop-form__info">
//               <FiInfo />
//               <p><strong>Smart Recommendation:</strong> The model compares your N, P, K, temperature, humidity, pH and rainfall against 2,200 labelled field records to rank the most suitable crops.</p>
//             </div>

//             {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

//             <button type="submit" className="crop-form__submit" disabled={loading}>
//               {loading ? (<><span className="crop-form__spinner" /> Analysing...</>) : (<><GiPlantSeed /> Get Crop Recommendations</>)}
//             </button>
//           </form>
//         </section>

//         {result && (
//           <section className="crop-results" ref={resultRef}>
//             <h2 className="crop-results__title"><GiPlantSeed /> Crop Recommendations for Your Farm</h2>

//             <div className="crop-results__params">
//               <strong>Analysis Parameters:</strong> Rainfall: {submitted.rainfall}mm, Temperature: {submitted.temperature}°C, Humidity: {submitted.humidity}%, pH: {submitted.ph}, N-P-K: {submitted.N}-{submitted.P}-{submitted.K}
//             </div>

//             {result.warnings?.length > 0 && (
//               <div className="crop-results__warning">
//                 <FiAlertTriangle />
//                 <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
//               </div>
//             )}

//             <div className="crop-results__grid">
//               {result.recommendations.map((r) => (
//                 <article className="crop-card" key={r.crop}>
//                   <header className="crop-card__head">
//                     <h3>{r.name}</h3>
//                     <span className="crop-card__badge">{r.confidence}% Match</span>
//                   </header>
//                   <div className="crop-card__body">
//                     <p className={`crop-card__level crop-card__level--${r.level}`}>{r.recommendation}</p>
//                     <dl className="crop-card__meta">
//                       <div><dt>Duration</dt><dd>{r.duration || '-'}</dd></div>
//                       <div><dt>Water Need</dt><dd>{r.water_need || '-'}</dd></div>
//                     </dl>
//                     <h4 className="crop-card__subtitle">Suitability Analysis:</h4>
//                     <ul className="crop-card__checks">
//                       {r.checks.map((c) => (
//                         <li key={c.text} className={`crop-card__check crop-card__check--${c.status}`}>
//                           {c.status === 'ok' ? <FiCheck /> : <FiAlertTriangle />} {c.text}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </article>
//               ))}
//             </div>

//             <div className="crop-results__notes">
//               <h4><FiAlertTriangle /> Important Notes:</h4>
//               <ul>
//                 <li>Predictions come from a model trained on a public dataset (hold-out accuracy {result.model.accuracy}%) and are not a guarantee.</li>
//                 <li>"Match" is the model's confidence, not expected profit or yield.</li>
//                 <li>Consult local agricultural extension officers for region-specific advice.</li>
//                 <li>Soil testing is recommended for precise nutrient management.</li>
//               </ul>
//             </div>
//           </section>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CropRecommendationPage;


// import { useRef, useState } from 'react';
// import { FiZoomIn, FiInfo, FiCheck, FiAlertCircle } from 'react-icons/fi';
// import { GiPlantSeed } from 'react-icons/gi';
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';
// import CropResult from '../../components/results/CropResult';
// import { getCropRecommendations } from '../../services/cropService';

// const NUMERIC_FIELDS = [
//   { name: 'rainfall', label: 'Average Rainfall (mm)', min: 0, max: 500, placeholder: 'e.g., 120', hint: 'Growing-season rainfall (training data covers 20-300 mm)' },
//   { name: 'temperature', label: 'Average Temperature (°C)', min: 0, max: 50, placeholder: 'e.g., 25', hint: 'Average temperature during the crop season' },
//   { name: 'humidity', label: 'Average Humidity (%)', min: 0, max: 100, placeholder: 'e.g., 70' },
//   { name: 'ph', label: 'Soil pH Level', min: 0, max: 14, placeholder: '7.0', hint: 'If unknown, leave as 7.0 (neutral)' },
//   { name: 'N', label: 'Nitrogen - N (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 90' },
//   { name: 'P', label: 'Phosphorus - P (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 42' },
//   { name: 'K', label: 'Potassium - K (kg/ha)', min: 0, max: 300, placeholder: 'e.g., 43' },
// ];

// const SOIL_OPTIONS = [
//   { value: 'clay', label: 'Clay Soil' },
//   { value: 'sandy', label: 'Sandy Soil' },
//   { value: 'loamy', label: 'Loamy Soil' },
//   { value: 'black', label: 'Black Cotton Soil' },
//   { value: 'red', label: 'Red Soil' },
//   { value: 'alluvial', label: 'Alluvial Soil' },
//   { value: 'laterite', label: 'Laterite Soil' },
// ];

// const SEASON_OPTIONS = [
//   { value: 'kharif', label: 'Kharif (June-October)' },
//   { value: 'rabi', label: 'Rabi (November-April)' },
//   { value: 'zaid', label: 'Zaid (April-June)' },
//   { value: 'year_round', label: 'Year-round cultivation' },
// ];

// const INITIAL_VALUES = {
//   rainfall: '', temperature: '', humidity: '', ph: '7.0', N: '', P: '', K: '', soil_type: '', season: '',
// };

// const validateField = (field, value) => {
//   if (value === '') return 'This field is required';
//   const num = Number(value);
//   if (!Number.isFinite(num)) return 'Enter a valid number';
//   if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
//   return '';
// };

// const CropRecommendationPage = () => {
//   const [values, setValues] = useState(INITIAL_VALUES);
//   const [touched, setTouched] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);
//   const [submitted, setSubmitted] = useState(null);
//   const resultRef = useRef(null);

//   const errors = {};
//   NUMERIC_FIELDS.forEach((f) => {
//     errors[f.name] = validateField(f, values[f.name]);
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setValues((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched(Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, true])));
//     if (Object.values(errors).some(Boolean)) return;

//     const payload = Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, Number(values[f.name])]));
//     if (values.soil_type) payload.soil_type = values.soil_type;
//     if (values.season) payload.season = values.season;

//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const data = await getCropRecommendations(payload);
//       setResult(data);
//       setSubmitted(payload);
//       setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderNumber = (f) => {
//     const showError = touched[f.name] && errors[f.name];
//     const valid = touched[f.name] && !errors[f.name];
//     return (
//       <div className="crop-form__group" key={f.name}>
//         <label className="crop-form__label" htmlFor={f.name}>{f.label} *</label>
//         <div className="crop-form__control">
//           <input
//             id={f.name}
//             name={f.name}
//             type="number"
//             step="any"
//             inputMode="decimal"
//             placeholder={f.placeholder}
//             value={values[f.name]}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`crop-form__input${showError ? ' crop-form__input--error' : ''}${valid ? ' crop-form__input--valid' : ''}`}
//             aria-invalid={Boolean(showError)}
//           />
//           {valid && <FiCheck className="crop-form__tick" />}
//         </div>
//         {showError ? (
//           <p className="crop-form__error">{errors[f.name]}</p>
//         ) : (
//           f.hint && <p className="crop-form__hint">{f.hint}</p>
//         )}
//       </div>
//     );
//   };

//   const renderSelect = (name, label, options, placeholder) => (
//     <div className="crop-form__group">
//       <label className="crop-form__label" htmlFor={name}>{label}</label>
//       <select id={name} name={name} value={values[name]} onChange={handleChange} className="crop-form__input">
//         <option value="">{placeholder}</option>
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>{o.label}</option>
//         ))}
//       </select>
//       <p className="crop-form__hint">Optional - used for suitability notes only</p>
//     </div>
//   );

//   return (
//     <div className="crop-page">
//       <div className="crop-page__top"><Navbar /></div>

//       <main className="crop-page__main">
//         <section className="crop-card-form">
//           <h1 className="crop-card-form__title"><FiZoomIn /> Smart Crop Recommendation</h1>
//           <p className="crop-card-form__subtitle">Get crop suggestions from a machine-learning model trained on soil and climate data</p>

//           <form className="crop-form" onSubmit={handleSubmit} noValidate>
//             <div className="crop-form__grid">
//               {NUMERIC_FIELDS.slice(0, 6).map(renderNumber)}
//               {renderNumber(NUMERIC_FIELDS[6])}
//               <div className="crop-form__group crop-form__group--spacer" />
//               {renderSelect('soil_type', 'Soil Type', SOIL_OPTIONS, 'Select Soil Type')}
//               {renderSelect('season', 'Preferred Season', SEASON_OPTIONS, 'Select Season')}
//             </div>

//             <div className="crop-form__info">
//               <FiInfo />
//               <p><strong>Smart Recommendation:</strong> The model compares your N, P, K, temperature, humidity, pH and rainfall against 2,200 labelled field records to rank the most suitable crops.</p>
//             </div>

//             {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

//             <button type="submit" className="crop-form__submit" disabled={loading}>
//               {loading ? (<><span className="crop-form__spinner" /> Analysing...</>) : (<><GiPlantSeed /> Get Crop Recommendations</>)}
//             </button>
//           </form>
//         </section>

//         {result && (
//           <div ref={resultRef}>
//             <CropResult result={result} inputs={submitted} />
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CropRecommendationPage;

import { useRef, useState } from 'react';
import { FiZoomIn, FiInfo, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import CropResult from '../../components/results/CropResult';
import { getCropRecommendations } from '../../services/cropService';

const NUMERIC_FIELDS = [
  { name: 'rainfall', label: 'Average Rainfall (mm)', min: 0, max: 500, placeholder: 'e.g., 120', hint: 'Growing-season rainfall (training data covers 20-300 mm)' },
  { name: 'temperature', label: 'Average Temperature (°C)', min: 0, max: 50, placeholder: 'e.g., 25', hint: 'Average temperature during the crop season' },
  { name: 'humidity', label: 'Average Humidity (%)', min: 0, max: 100, placeholder: 'e.g., 70' },
  { name: 'ph', label: 'Soil pH Level', min: 0, max: 14, placeholder: '7.0', hint: 'If unknown, leave as 7.0 (neutral)' },
  { name: 'N', label: 'Nitrogen - N (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 90' },
  { name: 'P', label: 'Phosphorus - P (kg/ha)', min: 0, max: 200, placeholder: 'e.g., 42' },
  { name: 'K', label: 'Potassium - K (kg/ha)', min: 0, max: 300, placeholder: 'e.g., 43' },
  {
    name: 'area_ha', label: 'Farm Size (hectares)', min: 0.01, max: 10000, placeholder: '1.0', optional: true,
    hint: 'Long-term tree/plantation crops are ranked lower on very small plots',
  },
];
const FIELD = Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, f]));

const SOIL_OPTIONS = [
  { value: 'clay', label: 'Clay Soil' },
  { value: 'sandy', label: 'Sandy Soil' },
  { value: 'loamy', label: 'Loamy Soil' },
  { value: 'black', label: 'Black Cotton Soil' },
  { value: 'red', label: 'Red Soil' },
  { value: 'alluvial', label: 'Alluvial Soil' },
  { value: 'laterite', label: 'Laterite Soil' },
];

const SEASON_OPTIONS = [
  { value: 'kharif', label: 'Kharif (June-October)' },
  { value: 'rabi', label: 'Rabi (November-April)' },
  { value: 'zaid', label: 'Zaid (April-June)' },
  { value: 'year_round', label: 'Year-round cultivation' },
];

const WATER_OPTIONS = [
  { value: 'low', label: 'Low (Rainfed / limited water)' },
  { value: 'medium', label: 'Medium (Some irrigation)' },
  { value: 'high', label: 'High (Good irrigation)' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'beginner', label: 'Beginner (0-3 years)' },
  { value: 'intermediate', label: 'Intermediate (3-10 years)' },
  { value: 'experienced', label: 'Experienced (10+ years)' },
];

const MARKET_OPTIONS = [
  { value: 'food', label: 'Food crops (own use / local market)' },
  { value: 'cash', label: 'Cash crops (commercial)' },
  { value: 'mixed', label: 'Mixed farming' },
];

const INITIAL_VALUES = {
  rainfall: '', temperature: '', humidity: '', ph: '7.0', N: '', P: '', K: '',
  soil_type: '', season: '',
  area_ha: '1.0', water_availability: 'high', farming_experience: 'intermediate', market_preference: 'mixed',
};

const validateField = (field, value) => {
  if (value === '') return field.optional ? '' : 'This field is required';
  const num = Number(value);
  if (!Number.isFinite(num)) return 'Enter a valid number';
  if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
  return '';
};

const CropRecommendationPage = () => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const resultRef = useRef(null);

  const errors = {};
  NUMERIC_FIELDS.forEach((f) => {
    errors[f.name] = validateField(f, values[f.name]);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(NUMERIC_FIELDS.map((f) => [f.name, true])));
    if (Object.values(errors).some(Boolean)) return;

    const payload = {};
    NUMERIC_FIELDS.forEach((f) => {
      if (values[f.name] !== '') payload[f.name] = Number(values[f.name]);
    });
    if (values.soil_type) payload.soil_type = values.soil_type;
    if (values.season) payload.season = values.season;
    payload.water_availability = values.water_availability;
    payload.farming_experience = values.farming_experience;
    payload.market_preference = values.market_preference;

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getCropRecommendations(payload);
      setResult(data);
      setSubmitted(payload);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const renderNumber = (f) => {
    const showError = touched[f.name] && errors[f.name];
    const valid = touched[f.name] && !errors[f.name] && values[f.name] !== '';
    return (
      <div className="crop-form__group" key={f.name}>
        <label className="crop-form__label" htmlFor={f.name}>{f.label}{f.optional ? '' : ' *'}</label>
        <div className="crop-form__control">
          <input
            id={f.name}
            name={f.name}
            type="number"
            step="any"
            inputMode="decimal"
            placeholder={f.placeholder}
            value={values[f.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`crop-form__input${showError ? ' crop-form__input--error' : ''}${valid ? ' crop-form__input--valid' : ''}`}
            aria-invalid={Boolean(showError)}
          />
          {valid && <FiCheck className="crop-form__tick" />}
        </div>
        {showError ? (
          <p className="crop-form__error">{errors[f.name]}</p>
        ) : (
          f.hint && <p className="crop-form__hint">{f.hint}</p>
        )}
      </div>
    );
  };

  // `placeholder` adds an empty first option (optional field); omit it for selects that always hold a value
  const renderSelect = (name, label, options, { placeholder, hint } = {}) => (
    <div className="crop-form__group">
      <label className="crop-form__label" htmlFor={name}>{label}</label>
      <select id={name} name={name} value={values[name]} onChange={handleChange} className="crop-form__input">
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <p className="crop-form__hint">{hint || 'Optional - used for suitability notes only'}</p>
    </div>
  );

  return (
    <div className="crop-page">
      <div className="crop-page__top"><Navbar /></div>

      <main className="crop-page__main">
        <section className="crop-card-form">
          <h1 className="crop-card-form__title"><FiZoomIn /> Smart Crop Recommendation</h1>
          <p className="crop-card-form__subtitle">Get crop suggestions from a machine-learning model trained on soil and climate data</p>

          <form className="crop-form" onSubmit={handleSubmit} noValidate>
            <div className="crop-form__grid">
              {renderNumber(FIELD.rainfall)}
              {renderNumber(FIELD.temperature)}
              {renderNumber(FIELD.humidity)}
              {renderNumber(FIELD.ph)}
              {renderNumber(FIELD.N)}
              {renderNumber(FIELD.P)}
              {renderNumber(FIELD.K)}
              <div className="crop-form__group crop-form__group--spacer" />
              {renderSelect('soil_type', 'Soil Type', SOIL_OPTIONS, { placeholder: 'Select Soil Type' })}
              {renderSelect('season', 'Preferred Season', SEASON_OPTIONS, { placeholder: 'Select Season' })}
              {renderNumber(FIELD.area_ha)}
              {renderSelect('water_availability', 'Water Availability', WATER_OPTIONS, {
                hint: 'Crops needing more water than this are ranked lower',
              })}
              {renderSelect('farming_experience', 'Farming Experience', EXPERIENCE_OPTIONS, {
                hint: 'Demanding crops are ranked lower for less experience',
              })}
              {renderSelect('market_preference', 'Market Preference', MARKET_OPTIONS, {
                hint: 'Crops from the other market group are ranked lower',
              })}
            </div>

            <div className="crop-form__info">
              <FiInfo />
              <p><strong>Smart Recommendation:</strong> The model ranks crops from your N, P, K, temperature, humidity, pH and rainfall (2,200 labelled field records). Water availability, farming experience, market preference and farm size then adjust each crop&apos;s match with fixed, documented rules.</p>
            </div>

            {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

            <button type="submit" className="crop-form__submit" disabled={loading}>
              {loading ? (<><span className="crop-form__spinner" /> Analysing...</>) : (<><GiPlantSeed /> Get Crop Recommendations</>)}
            </button>
          </form>
        </section>

        {result && (
          <div ref={resultRef}>
            <CropResult result={result} inputs={submitted} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CropRecommendationPage;
