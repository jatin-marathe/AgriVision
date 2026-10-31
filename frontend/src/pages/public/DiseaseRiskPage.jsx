// import { useEffect, useRef, useState } from 'react';
// import { FiInfo, FiCheck, FiAlertCircle, FiShield } from 'react-icons/fi';
// import { FaBug } from 'react-icons/fa';
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';
// import { getDiseaseCrops, assessDiseaseRisk } from '../../services/diseaseService';

// const NUMERIC_FIELDS = [
//   { name: 'rainfall', label: 'Recent Rainfall (mm)', min: 0, max: 1000, placeholder: 'e.g., 150', hint: 'Total rainfall over the last 7-14 days' },
//   { name: 'temperature', label: 'Average Temperature (°C)', min: -5, max: 50, placeholder: 'e.g., 28' },
//   { name: 'humidity', label: 'Humidity (%)', min: 0, max: 100, placeholder: 'e.g., 75' },
// ];

// const PESTICIDE_OPTIONS = [
//   { value: '0_7', label: '0-7 days (Recent)' },
//   { value: '8_14', label: '8-14 days' },
//   { value: '15_30', label: '15-30 days' },
//   { value: '30_plus', label: '30+ days (None/Very old)' },
// ];

// const SEASON_OPTIONS = [
//   { value: 'summer', label: 'Summer (March-May)' },
//   { value: 'monsoon', label: 'Monsoon (June-September)' },
//   { value: 'post_monsoon', label: 'Post-Monsoon (October-November)' },
//   { value: 'winter', label: 'Winter (December-February)' },
// ];

// const INITIAL = {
//   crop: '', rainfall: '', temperature: '', humidity: '', pesticide_days: '30_plus', season: 'monsoon',
// };

// const validate = (field, value) => {
//   if (value === '') return 'This field is required';
//   const num = Number(value);
//   if (!Number.isFinite(num)) return 'Enter a valid number';
//   if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
//   return '';
// };

// const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// const DiseaseRiskPage = () => {
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
//     getDiseaseCrops()
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

//   const errors = { crop: values.crop ? '' : 'Please select a crop' };
//   NUMERIC_FIELDS.forEach((f) => {
//     errors[f.name] = validate(f, values[f.name]);
//   });

//   const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ crop: true, rainfall: true, temperature: true, humidity: true });
//     if (Object.values(errors).some(Boolean)) return;

//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const data = await assessDiseaseRisk({
//         crop: values.crop,
//         rainfall: Number(values.rainfall),
//         temperature: Number(values.temperature),
//         humidity: Number(values.humidity),
//         pesticide_days: values.pesticide_days,
//         season: values.season,
//       });
//       setResult(data);
//       setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           (err.request ? 'Cannot reach the server. Please check your connection and try again.' : 'Something went wrong. Please try again.')
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fieldClass = (name) => {
//     if (touched[name] && errors[name]) return ' crop-form__input--error';
//     if (touched[name] && !errors[name]) return ' crop-form__input--valid';
//     return '';
//   };

//   const renderSelect = (name, label, options) => (
//     <div className="crop-form__group">
//       <label className="crop-form__label" htmlFor={name}>{label}</label>
//       <select id={name} name={name} value={values[name]} onChange={handleChange} className="crop-form__input">
//         {options.map((o) => (
//           <option key={o.value} value={o.value}>{o.label}</option>
//         ))}
//       </select>
//       {name === 'pesticide_days' && (
//         <p className="crop-form__hint">Counts protective fungicide/bactericide sprays only</p>
//       )}
//     </div>
//   );

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
//             className={`crop-form__input${fieldClass(f.name)}`}
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

//   return (
//     <div className="crop-page">
//       <div className="crop-page__top"><Navbar /></div>

//       <main className="crop-page__main crop-page__main--narrow">
//         <section className="crop-card-form">
//           <h1 className="crop-card-form__title"><FaBug /> Disease Risk Prediction</h1>
//           <p className="crop-card-form__subtitle">Assess disease risk for your crops based on environmental conditions</p>

//           <form className="crop-form" onSubmit={handleSubmit} noValidate>
//             <div className="crop-form__grid">
//               <div className="crop-form__group">
//                 <label className="crop-form__label" htmlFor="crop">Crop Type *</label>
//                 <div className="crop-form__control">
//                   <select
//                     id="crop"
//                     name="crop"
//                     value={values.crop}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     disabled={cropsLoading || Boolean(cropsError)}
//                     className={`crop-form__input${fieldClass('crop')}`}
//                     aria-invalid={Boolean(touched.crop && errors.crop)}
//                   >
//                     <option value="">{cropsLoading ? 'Loading crops...' : 'Select Crop'}</option>
//                     {crops.map((c) => (
//                       <option key={c.value} value={c.value}>{c.label}</option>
//                     ))}
//                   </select>
//                 </div>
//                 {cropsError && <p className="crop-form__error">{cropsError}</p>}
//                 {!cropsError && touched.crop && errors.crop && <p className="crop-form__error">{errors.crop}</p>}
//               </div>

//               {renderNumber(NUMERIC_FIELDS[0])}
//               {renderNumber(NUMERIC_FIELDS[1])}
//               {renderNumber(NUMERIC_FIELDS[2])}
//               {renderSelect('pesticide_days', 'Recent Pesticide Application (days ago)', PESTICIDE_OPTIONS)}
//               {renderSelect('season', 'Current Season', SEASON_OPTIONS)}
//             </div>

//             <div className="crop-form__info">
//               <FiInfo />
//               <p><strong>Tip:</strong> Higher humidity and moderate temperatures often increase disease risk. Regular monitoring is essential during monsoon season.</p>
//             </div>

//             {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

//             <button type="submit" className="crop-form__submit" disabled={loading || cropsLoading || Boolean(cropsError)}>
//               {loading ? (<><span className="crop-form__spinner" /> Assessing...</>) : (<><FiShield /> Assess Disease Risk</>)}
//             </button>
//           </form>

//           {result && (
//             <section className="disease-result" ref={resultRef}>
//               <h2 className="disease-result__title"><FaBug /> Disease Risk Assessment</h2>

//               <p className="disease-result__row">
//                 <strong>Risk Level:</strong>{' '}
//                 <span className={`risk-badge risk-badge--${result.risk_level}`}>{cap(result.risk_level)}</span>{' '}
//                 <span className="disease-result__muted">({result.risk_score}/100 for {result.crop_label})</span>
//               </p>
//               <p className="disease-result__row"><strong>Recommendation:</strong> {result.recommendation}</p>

//               <h3 className="disease-result__subtitle">Diseases to watch</h3>
//               <ul className="disease-result__threats">
//                 {result.threats.map((t, i) => (
//                   <li key={t.name} className="disease-result__threat">
//                     <div className="disease-result__threat-head">
//                       <span>{t.name}</span>
//                       <span className={`risk-badge risk-badge--${t.level}`}>{cap(t.level)} · {t.score}</span>
//                     </div>
//                     <p className="disease-result__tip">{t.tip}</p>
//                     {i === 0 && (
//                       <ul className="disease-result__factors">
//                         {t.factors.map((f) => (
//                           <li key={f.text} className={`disease-result__factor disease-result__factor--${f.status}`}>{f.text}</li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>

//               <p className="disease-result__note">
//                 Based on current environmental conditions and crop type. This is a rule-based risk index using approximate plant-pathology thresholds, not a trained model or a calibrated forecast.
//               </p>
//             </section>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default DiseaseRiskPage;


import { useEffect, useRef, useState } from 'react';
import { FiInfo, FiCheck, FiAlertCircle, FiShield } from 'react-icons/fi';
import { FaBug } from 'react-icons/fa';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import DiseaseResult from '../../components/results/DiseaseResult';
import { getDiseaseCrops, assessDiseaseRisk } from '../../services/diseaseService';

const NUMERIC_FIELDS = [
  { name: 'rainfall', label: 'Recent Rainfall (mm)', min: 0, max: 1000, placeholder: 'e.g., 150', hint: 'Total rainfall over the last 7-14 days' },
  { name: 'temperature', label: 'Average Temperature (°C)', min: -5, max: 50, placeholder: 'e.g., 28' },
  { name: 'humidity', label: 'Humidity (%)', min: 0, max: 100, placeholder: 'e.g., 75' },
];

const PESTICIDE_OPTIONS = [
  { value: '0_7', label: '0-7 days (Recent)' },
  { value: '8_14', label: '8-14 days' },
  { value: '15_30', label: '15-30 days' },
  { value: '30_plus', label: '30+ days (None/Very old)' },
];

const SEASON_OPTIONS = [
  { value: 'summer', label: 'Summer (March-May)' },
  { value: 'monsoon', label: 'Monsoon (June-September)' },
  { value: 'post_monsoon', label: 'Post-Monsoon (October-November)' },
  { value: 'winter', label: 'Winter (December-February)' },
];

const INITIAL = {
  crop: '', rainfall: '', temperature: '', humidity: '', pesticide_days: '30_plus', season: 'monsoon',
};

const validate = (field, value) => {
  if (value === '') return 'This field is required';
  const num = Number(value);
  if (!Number.isFinite(num)) return 'Enter a valid number';
  if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
  return '';
};

const DiseaseRiskPage = () => {
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
    getDiseaseCrops()
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

  const errors = { crop: values.crop ? '' : 'Please select a crop' };
  NUMERIC_FIELDS.forEach((f) => {
    errors[f.name] = validate(f, values[f.name]);
  });

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ crop: true, rainfall: true, temperature: true, humidity: true });
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await assessDiseaseRisk({
        crop: values.crop,
        rainfall: Number(values.rainfall),
        temperature: Number(values.temperature),
        humidity: Number(values.humidity),
        pesticide_days: values.pesticide_days,
        season: values.season,
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

  const fieldClass = (name) => {
    if (touched[name] && errors[name]) return ' crop-form__input--error';
    if (touched[name] && !errors[name]) return ' crop-form__input--valid';
    return '';
  };

  const renderSelect = (name, label, options) => (
    <div className="crop-form__group">
      <label className="crop-form__label" htmlFor={name}>{label}</label>
      <select id={name} name={name} value={values[name]} onChange={handleChange} className="crop-form__input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {name === 'pesticide_days' && (
        <p className="crop-form__hint">Counts protective fungicide/bactericide sprays only</p>
      )}
    </div>
  );

  const renderNumber = (f) => {
    const showError = touched[f.name] && errors[f.name];
    const valid = touched[f.name] && !errors[f.name];
    return (
      <div className="crop-form__group" key={f.name}>
        <label className="crop-form__label" htmlFor={f.name}>{f.label} *</label>
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
            className={`crop-form__input${fieldClass(f.name)}`}
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

  return (
    <div className="crop-page">
      <div className="crop-page__top"><Navbar /></div>

      <main className="crop-page__main crop-page__main--narrow">
        <section className="crop-card-form">
          <h1 className="crop-card-form__title"><FaBug /> Disease Risk Prediction</h1>
          <p className="crop-card-form__subtitle">Assess disease risk for your crops based on environmental conditions</p>

          <form className="crop-form" onSubmit={handleSubmit} noValidate>
            <div className="crop-form__grid">
              <div className="crop-form__group">
                <label className="crop-form__label" htmlFor="crop">Crop Type *</label>
                <div className="crop-form__control">
                  <select
                    id="crop"
                    name="crop"
                    value={values.crop}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={cropsLoading || Boolean(cropsError)}
                    className={`crop-form__input${fieldClass('crop')}`}
                    aria-invalid={Boolean(touched.crop && errors.crop)}
                  >
                    <option value="">{cropsLoading ? 'Loading crops...' : 'Select Crop'}</option>
                    {crops.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
                {cropsError && <p className="crop-form__error">{cropsError}</p>}
                {!cropsError && touched.crop && errors.crop && <p className="crop-form__error">{errors.crop}</p>}
              </div>

              {renderNumber(NUMERIC_FIELDS[0])}
              {renderNumber(NUMERIC_FIELDS[1])}
              {renderNumber(NUMERIC_FIELDS[2])}
              {renderSelect('pesticide_days', 'Recent Pesticide Application (days ago)', PESTICIDE_OPTIONS)}
              {renderSelect('season', 'Current Season', SEASON_OPTIONS)}
            </div>

            <div className="crop-form__info">
              <FiInfo />
              <p><strong>Tip:</strong> Higher humidity and moderate temperatures often increase disease risk. Regular monitoring is essential during monsoon season.</p>
            </div>

            {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

            <button type="submit" className="crop-form__submit" disabled={loading || cropsLoading || Boolean(cropsError)}>
              {loading ? (<><span className="crop-form__spinner" /> Assessing...</>) : (<><FiShield /> Assess Disease Risk</>)}
            </button>
          </form>

          {result && (
            <div ref={resultRef}>
              <DiseaseResult result={result} />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DiseaseRiskPage;
