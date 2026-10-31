// import { useEffect, useRef, useState } from 'react';
// import { FiCheck, FiAlertCircle, FiAlertTriangle, FiEdit2, FiInfo } from 'react-icons/fi';
// import { FaFlask, FaLeaf, FaSeedling, FaTint, FaCalendarAlt } from 'react-icons/fa';
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';
// import { getFertilizerCrops, getFertilizerRecommendation } from '../../services/fertilizerService';

// const SOIL_OPTIONS = [
//   { value: 'clay', label: 'Clay Soil' },
//   { value: 'sandy', label: 'Sandy Soil' },
//   { value: 'loamy', label: 'Loamy Soil (Best for most crops)' },
//   { value: 'silt', label: 'Silt Soil' },
//   { value: 'red', label: 'Red Soil' },
//   { value: 'black', label: 'Black Cotton Soil' },
//   { value: 'alluvial', label: 'Alluvial Soil' },
// ];

// const STAGE_OPTIONS = [
//   { value: 'basal', label: 'Pre-planting / Basal' },
//   { value: 'vegetative', label: 'Vegetative Growth' },
//   { value: 'flowering', label: 'Flowering / Fruiting' },
//   { value: 'maturity', label: 'Maturity / Grain filling' },
// ];

// const PH_OPTIONS = [
//   { value: 'unknown', label: 'Unknown' },
//   { value: 'acidic', label: 'Acidic (< 6.0)' },
//   { value: 'slightly_acidic', label: 'Slightly Acidic (6.0-6.5)' },
//   { value: 'neutral', label: 'Neutral (6.5-7.5) - Ideal' },
//   { value: 'alkaline', label: 'Alkaline (> 7.5)' },
// ];

// const NUMERIC_FIELDS = {
//   rainfall: { label: 'Expected Annual Rainfall (mm)', required: true, min: 0, max: 5000, placeholder: 'e.g., 1200', hint: 'Enter expected or historical average rainfall' },
//   area_ha: { label: 'Field Size (hectares)', required: false, min: 0.01, max: 10000, placeholder: '1.0', hint: 'Used to calculate total fertilizer quantities' },
// };

// const NUTRIENTS = [
//   { key: 'n', label: 'Nitrogen (N)', icon: FaLeaf, mod: 'n' },
//   { key: 'p2o5', label: 'Phosphorus (P₂O₅)', icon: FaSeedling, mod: 'p' },
//   { key: 'k2o', label: 'Potassium (K₂O)', icon: FaTint, mod: 'k' },
// ];

// const INITIAL = {
//   crop: '', rainfall: '', soil_type: '', area_ha: '1.0', growth_stage: 'vegetative', ph_class: 'unknown',
// };

// const validateNumber = (field, value) => {
//   if (value === '') return 'This field is required';
//   const num = Number(value);
//   if (!Number.isFinite(num)) return 'Enter a valid number';
//   if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
//   return '';
// };

// const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 });

// const FertilizerPage = () => {
//   const [values, setValues] = useState(INITIAL);
//   const [touched, setTouched] = useState({});
//   const [crops, setCrops] = useState([]);
//   const [cropsLoading, setCropsLoading] = useState(true);
//   const [cropsError, setCropsError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);
//   const resultRef = useRef(null);

//   useEffect(() => {
//     let cancelled = false;
//     getFertilizerCrops()
//       .then((list) => !cancelled && setCrops(list))
//       .catch((err) => {
//         if (!cancelled) {
//           setCropsError(err.response?.data?.message || 'Could not load the crop list. Is the server running?');
//         }
//       })
//       .finally(() => !cancelled && setCropsLoading(false));
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const errors = {
//     crop: values.crop ? '' : 'Please select a crop',
//     soil_type: values.soil_type ? '' : 'Please select a soil type',
//     rainfall: validateNumber(NUMERIC_FIELDS.rainfall, values.rainfall),
//     area_ha: validateNumber(NUMERIC_FIELDS.area_ha, values.area_ha),
//   };

//   const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ crop: true, rainfall: true, soil_type: true, area_ha: true });
//     if (Object.values(errors).some(Boolean)) return;

//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const data = await getFertilizerRecommendation({
//         crop: values.crop,
//         rainfall: Number(values.rainfall),
//         soil_type: values.soil_type,
//         area_ha: Number(values.area_ha),
//         growth_stage: values.growth_stage,
//         ph_class: values.ph_class,
//       });
//       setResult(data);
//       setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stateClass = (name) => {
//     if (touched[name] && errors[name]) return ' crop-form__input--error';
//     if (touched[name] && !errors[name]) return ' crop-form__input--valid';
//     return '';
//   };

//   const renderSelect = (name, label, options, { required = false, placeholder, disabled = false } = {}) => (
//     <div className="crop-form__group">
//       <label className="crop-form__label" htmlFor={name}>{label}{required ? ' *' : ''}</label>
//       <div className="crop-form__control">
//         <select
//           id={name}
//           name={name}
//           value={values[name]}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           disabled={disabled}
//           className={`crop-form__input${required ? stateClass(name) : ''}`}
//           aria-invalid={Boolean(required && touched[name] && errors[name])}
//         >
//           {placeholder && <option value="">{placeholder}</option>}
//           {options.map((o) => (
//             <option key={o.value} value={o.value}>{o.label}</option>
//           ))}
//         </select>
//       </div>
//       {required && touched[name] && errors[name] && <p className="crop-form__error">{errors[name]}</p>}
//     </div>
//   );

//   const renderNumber = (name) => {
//     const f = NUMERIC_FIELDS[name];
//     const showError = touched[name] && errors[name];
//     const valid = touched[name] && !errors[name];
//     return (
//       <div className="crop-form__group">
//         <label className="crop-form__label" htmlFor={name}>{f.label}{f.required ? ' *' : ''}</label>
//         <div className="crop-form__control">
//           <input
//             id={name}
//             name={name}
//             type="number"
//             step="any"
//             inputMode="decimal"
//             placeholder={f.placeholder}
//             value={values[name]}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`crop-form__input${stateClass(name)}`}
//             aria-invalid={Boolean(showError)}
//           />
//           {valid && <FiCheck className="crop-form__tick" />}
//         </div>
//         {showError ? <p className="crop-form__error">{errors[name]}</p> : <p className="crop-form__hint">{f.hint}</p>}
//       </div>
//     );
//   };

//   const formDisabled = loading || cropsLoading || Boolean(cropsError);

//   return (
//     <div className="crop-page">
//       <div className="crop-page__top"><Navbar /></div>

//       <main className="crop-page__main crop-page__main--narrow">
//         <section className="crop-card-form">
//           <h1 className="crop-card-form__title"><FaFlask /> Fertilizer Recommendation</h1>
//           <p className="crop-card-form__subtitle">Get personalized NPK recommendations for optimal crop nutrition</p>

//           <form className="crop-form" onSubmit={handleSubmit} noValidate>
//             <div className="crop-form__grid">
//               <div>
//                 {renderSelect('crop', 'Crop Type', crops, {
//                   required: true,
//                   placeholder: cropsLoading ? 'Loading crops...' : 'Select Crop',
//                   disabled: cropsLoading || Boolean(cropsError),
//                 })}
//                 {cropsError && <p className="crop-form__error">{cropsError}</p>}
//               </div>
//               {renderNumber('rainfall')}
//               {renderSelect('soil_type', 'Soil Type', SOIL_OPTIONS, { required: true, placeholder: 'Select Soil Type' })}
//               {renderNumber('area_ha')}
//               {renderSelect('growth_stage', 'Current Growth Stage', STAGE_OPTIONS)}
//               {renderSelect('ph_class', 'Soil pH (if known)', PH_OPTIONS)}
//             </div>

//             <div className="crop-form__info">
//               <FiInfo />
//               <p><strong>Quick Tip:</strong> For best results, conduct a soil test to determine exact nutrient levels. These recommendations are general guidelines based on typical crop requirements.</p>
//             </div>

//             {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

//             <button type="submit" className="crop-form__submit" disabled={formDisabled}>
//               {loading ? (<><span className="crop-form__spinner" /> Calculating...</>) : (<><FiEdit2 /> Generate Recommendation</>)}
//             </button>
//           </form>

//           {result && (
//             <section className="fert-result" ref={resultRef}>
//               <h2 className="fert-result__title"><FaFlask /> Fertilizer Recommendation for {result.crop_label}</h2>

//               <div className="fert-result__npk">
//                 {NUTRIENTS.map(({ key, label, icon: Icon, mod }) => (
//                   <div key={key} className={`fert-nutrient fert-nutrient--${mod}`}>
//                     <Icon className="fert-nutrient__icon" />
//                     <p className="fert-nutrient__label">{label}</p>
//                     <p className="fert-nutrient__value">{fmt(result.per_hectare[key])}</p>
//                     <p className="fert-nutrient__unit">kg/ha</p>
//                     <p className="fert-nutrient__total">{fmt(result.field_total[key])} kg for {fmt(result.area_ha)} ha</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="fert-panel">
//                 <h3 className="fert-panel__head"><FaCalendarAlt /> Application Schedule</h3>
//                 <div className="fert-panel__body">
//                   <p className="fert-panel__message">{result.stage_message}</p>
//                   <div className="fert-table-wrap">
//                     <table className="fert-table">
//                       <thead>
//                         <tr><th>Stage</th><th>Timing</th><th>N</th><th>P₂O₅</th><th>K₂O</th></tr>
//                       </thead>
//                       <tbody>
//                         {result.schedule.map((s) => (
//                           <tr key={s.stage} className={s.current ? 'fert-table__row--current' : ''}>
//                             <td>{s.stage_label}</td>
//                             <td>{s.timing}</td>
//                             <td>{fmt(s.n)}</td>
//                             <td>{fmt(s.p2o5)}</td>
//                             <td>{fmt(s.k2o)}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   <p className="fert-panel__unit">Amounts in kg/ha. Highlighted row = your current stage.</p>
//                 </div>
//               </div>

//               <div className="fert-panel">
//                 <h3 className="fert-panel__head">Fertilizer Products</h3>
//                 <div className="fert-panel__body">
//                   <div className="fert-table-wrap">
//                     <table className="fert-table">
//                       <thead>
//                         <tr><th>Product</th><th>Per hectare</th><th>For {fmt(result.area_ha)} ha</th></tr>
//                       </thead>
//                       <tbody>
//                         <tr><td>Urea (46% N)</td><td>{fmt(result.products.per_hectare.urea)} kg</td><td>{fmt(result.products.field_total.urea)} kg</td></tr>
//                         <tr><td>DAP (18-46-0)</td><td>{fmt(result.products.per_hectare.dap)} kg</td><td>{fmt(result.products.field_total.dap)} kg</td></tr>
//                         <tr><td>MOP (60% K₂O)</td><td>{fmt(result.products.per_hectare.mop)} kg</td><td>{fmt(result.products.field_total.mop)} kg</td></tr>
//                       </tbody>
//                     </table>
//                   </div>
//                   <p className="fert-panel__unit">DAP supplies all the phosphorus plus some nitrogen; urea covers the remaining nitrogen.</p>
//                 </div>
//               </div>

//               {result.adjustments.length > 0 && (
//                 <div className="fert-adjust">
//                   <h4>Adjustments applied</h4>
//                   <ul>{result.adjustments.map((a) => <li key={a}>{a}</li>)}</ul>
//                 </div>
//               )}

//               <div className="fert-notes">
//                 <h4><FiAlertTriangle /> Important Notes:</h4>
//                 <ul>{result.notes.map((n) => <li key={n}>{n}</li>)}</ul>
//               </div>
//             </section>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default FertilizerPage;

import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiAlertCircle, FiEdit2, FiInfo } from 'react-icons/fi';
import { FaFlask } from 'react-icons/fa';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import FertilizerResult from '../../components/results/FertilizerResult';
import { getFertilizerCrops, getFertilizerRecommendation } from '../../services/fertilizerService';

const SOIL_OPTIONS = [
  { value: 'clay', label: 'Clay Soil' },
  { value: 'sandy', label: 'Sandy Soil' },
  { value: 'loamy', label: 'Loamy Soil (Best for most crops)' },
  { value: 'silt', label: 'Silt Soil' },
  { value: 'red', label: 'Red Soil' },
  { value: 'black', label: 'Black Cotton Soil' },
  { value: 'alluvial', label: 'Alluvial Soil' },
];

const STAGE_OPTIONS = [
  { value: 'basal', label: 'Pre-planting / Basal' },
  { value: 'vegetative', label: 'Vegetative Growth' },
  { value: 'flowering', label: 'Flowering / Fruiting' },
  { value: 'maturity', label: 'Maturity / Grain filling' },
];

const PH_OPTIONS = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'acidic', label: 'Acidic (< 6.0)' },
  { value: 'slightly_acidic', label: 'Slightly Acidic (6.0-6.5)' },
  { value: 'neutral', label: 'Neutral (6.5-7.5) - Ideal' },
  { value: 'alkaline', label: 'Alkaline (> 7.5)' },
];

const NUMERIC_FIELDS = {
  rainfall: { label: 'Expected Annual Rainfall (mm)', required: true, min: 0, max: 5000, placeholder: 'e.g., 1200', hint: 'Enter expected or historical average rainfall' },
  area_ha: { label: 'Field Size (hectares)', required: false, min: 0.01, max: 10000, placeholder: '1.0', hint: 'Used to calculate total fertilizer quantities' },
};

const INITIAL = {
  crop: '', rainfall: '', soil_type: '', area_ha: '1.0', growth_stage: 'vegetative', ph_class: 'unknown',
};

const validateNumber = (field, value) => {
  if (value === '') return 'This field is required';
  const num = Number(value);
  if (!Number.isFinite(num)) return 'Enter a valid number';
  if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
  return '';
};

const FertilizerPage = () => {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [crops, setCrops] = useState([]);
  const [cropsLoading, setCropsLoading] = useState(true);
  const [cropsError, setCropsError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getFertilizerCrops()
      .then((list) => !cancelled && setCrops(list))
      .catch((err) => {
        if (!cancelled) {
          setCropsError(err.response?.data?.message || 'Could not load the crop list. Is the server running?');
        }
      })
      .finally(() => !cancelled && setCropsLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const errors = {
    crop: values.crop ? '' : 'Please select a crop',
    soil_type: values.soil_type ? '' : 'Please select a soil type',
    rainfall: validateNumber(NUMERIC_FIELDS.rainfall, values.rainfall),
    area_ha: validateNumber(NUMERIC_FIELDS.area_ha, values.area_ha),
  };

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ crop: true, rainfall: true, soil_type: true, area_ha: true });
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await getFertilizerRecommendation({
        crop: values.crop,
        rainfall: Number(values.rainfall),
        soil_type: values.soil_type,
        area_ha: Number(values.area_ha),
        growth_stage: values.growth_stage,
        ph_class: values.ph_class,
      });
      setResult(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
      );
    } finally {
      setLoading(false);
    }
  };

  const stateClass = (name) => {
    if (touched[name] && errors[name]) return ' crop-form__input--error';
    if (touched[name] && !errors[name]) return ' crop-form__input--valid';
    return '';
  };

  const renderSelect = (name, label, options, { required = false, placeholder, disabled = false } = {}) => (
    <div className="crop-form__group">
      <label className="crop-form__label" htmlFor={name}>{label}{required ? ' *' : ''}</label>
      <div className="crop-form__control">
        <select
          id={name}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`crop-form__input${required ? stateClass(name) : ''}`}
          aria-invalid={Boolean(required && touched[name] && errors[name])}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
      {required && touched[name] && errors[name] && <p className="crop-form__error">{errors[name]}</p>}
    </div>
  );

  const renderNumber = (name) => {
    const f = NUMERIC_FIELDS[name];
    const showError = touched[name] && errors[name];
    const valid = touched[name] && !errors[name];
    return (
      <div className="crop-form__group">
        <label className="crop-form__label" htmlFor={name}>{f.label}{f.required ? ' *' : ''}</label>
        <div className="crop-form__control">
          <input
            id={name}
            name={name}
            type="number"
            step="any"
            inputMode="decimal"
            placeholder={f.placeholder}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`crop-form__input${stateClass(name)}`}
            aria-invalid={Boolean(showError)}
          />
          {valid && <FiCheck className="crop-form__tick" />}
        </div>
        {showError ? <p className="crop-form__error">{errors[name]}</p> : <p className="crop-form__hint">{f.hint}</p>}
      </div>
    );
  };

  const formDisabled = loading || cropsLoading || Boolean(cropsError);

  return (
    <div className="crop-page">
      <div className="crop-page__top"><Navbar /></div>

      <main className="crop-page__main crop-page__main--narrow">
        <section className="crop-card-form">
          <h1 className="crop-card-form__title"><FaFlask /> Fertilizer Recommendation</h1>
          <p className="crop-card-form__subtitle">Get personalized NPK recommendations for optimal crop nutrition</p>

          <form className="crop-form" onSubmit={handleSubmit} noValidate>
            <div className="crop-form__grid">
              <div>
                {renderSelect('crop', 'Crop Type', crops, {
                  required: true,
                  placeholder: cropsLoading ? 'Loading crops...' : 'Select Crop',
                  disabled: cropsLoading || Boolean(cropsError),
                })}
                {cropsError && <p className="crop-form__error">{cropsError}</p>}
              </div>
              {renderNumber('rainfall')}
              {renderSelect('soil_type', 'Soil Type', SOIL_OPTIONS, { required: true, placeholder: 'Select Soil Type' })}
              {renderNumber('area_ha')}
              {renderSelect('growth_stage', 'Current Growth Stage', STAGE_OPTIONS)}
              {renderSelect('ph_class', 'Soil pH (if known)', PH_OPTIONS)}
            </div>

            <div className="crop-form__info">
              <FiInfo />
              <p><strong>Quick Tip:</strong> For best results, conduct a soil test to determine exact nutrient levels. These recommendations are general guidelines based on typical crop requirements.</p>
            </div>

            {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

            <button type="submit" className="crop-form__submit" disabled={formDisabled}>
              {loading ? (<><span className="crop-form__spinner" /> Calculating...</>) : (<><FiEdit2 /> Generate Recommendation</>)}
            </button>
          </form>

          {result && (
            <div ref={resultRef}>
              <FertilizerResult result={result} />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FertilizerPage;
