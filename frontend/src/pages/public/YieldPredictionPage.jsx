// import { useEffect, useRef, useState } from 'react';
// import { FiTrendingUp, FiCheck, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';
// import { FaCalculator } from 'react-icons/fa';
// import Navbar from '../../components/home/Navbar';
// import Footer from '../../components/home/Footer';
// import { getYieldCrops, predictYield } from '../../services/yieldService';

// const FIELDS = [
//   { name: 'rainfall', label: 'Annual Rainfall (mm)', min: 0, max: 5000, placeholder: 'e.g., 800' },
//   { name: 'pesticides', label: 'Pesticide Usage (tonnes)', min: 0, max: 1000000, placeholder: 'e.g., 150', hint: 'Training data records national totals in tonnes' },
//   { name: 'temperature', label: 'Average Temperature (°C)', min: -10, max: 50, placeholder: 'e.g., 25' },
// ];

// const INITIAL = { crop: '', rainfall: '', pesticides: '', temperature: '' };

// const validate = (field, value) => {
//   if (value === '') return 'This field is required';
//   const num = Number(value);
//   if (!Number.isFinite(num)) return 'Enter a valid number';
//   if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
//   return '';
// };

// const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

// const YieldPredictionPage = () => {
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
//     getYieldCrops()
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
//   FIELDS.forEach((f) => {
//     errors[f.name] = validate(f, values[f.name]);
//   });

//   const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setTouched({ crop: true, rainfall: true, pesticides: true, temperature: true });
//     if (Object.values(errors).some(Boolean)) return;

//     setLoading(true);
//     setError('');
//     setResult(null);
//     try {
//       const data = await predictYield({
//         crop: values.crop,
//         rainfall: Number(values.rainfall),
//         pesticides: Number(values.pesticides),
//         temperature: Number(values.temperature),
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

//   const fieldClass = (name) => {
//     if (touched[name] && errors[name]) return ' crop-form__input--error';
//     if (touched[name] && !errors[name]) return ' crop-form__input--valid';
//     return '';
//   };

//   return (
//     <div className="crop-page">
//       <div className="crop-page__top"><Navbar /></div>

//       <main className="crop-page__main crop-page__main--narrow">
//         <section className="crop-card-form">
//           <h1 className="crop-card-form__title"><FiTrendingUp /> Crop Yield Prediction</h1>
//           <p className="crop-card-form__subtitle">Enter your farm conditions to get a yield estimate from a trained model</p>

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

//               {FIELDS.map((f) => {
//                 const showError = touched[f.name] && errors[f.name];
//                 const valid = touched[f.name] && !errors[f.name];
//                 return (
//                   <div className="crop-form__group" key={f.name}>
//                     <label className="crop-form__label" htmlFor={f.name}>{f.label} *</label>
//                     <div className="crop-form__control">
//                       <input
//                         id={f.name}
//                         name={f.name}
//                         type="number"
//                         step="any"
//                         inputMode="decimal"
//                         placeholder={f.placeholder}
//                         value={values[f.name]}
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         className={`crop-form__input${fieldClass(f.name)}`}
//                         aria-invalid={Boolean(showError)}
//                       />
//                       {valid && <FiCheck className="crop-form__tick" />}
//                     </div>
//                     {showError ? (
//                       <p className="crop-form__error">{errors[f.name]}</p>
//                     ) : (
//                       f.hint && <p className="crop-form__hint">{f.hint}</p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

//             <button type="submit" className="crop-form__submit" disabled={loading || cropsLoading || Boolean(cropsError)}>
//               {loading ? (<><span className="crop-form__spinner" /> Predicting...</>) : (<><FaCalculator /> Predict Yield</>)}
//             </button>
//           </form>

//           {result && (
//             <section className="yield-result" ref={resultRef}>
//               <h2 className="yield-result__title"><FiTrendingUp /> Yield Prediction Results</h2>

//               {result.warnings.length > 0 && (
//                 <div className="yield-result__warning">
//                   <FiAlertTriangle />
//                   <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
//                 </div>
//               )}

//               <p className="yield-result__row"><strong>Crop:</strong> {result.crop_label}</p>
//               <p className="yield-result__row">
//                 <strong>Predicted Yield:</strong>{' '}
//                 <span className="yield-result__value">{fmt(result.yield_hg_ha)} hg/ha</span>{' '}
//                 <span className="yield-result__muted">(≈ {fmt(result.yield_t_ha)} t/ha)</span>
//               </p>
//               <p className="yield-result__row">
//                 <strong>Likely Range:</strong> {fmt(result.low_hg_ha)} - {fmt(result.high_hg_ha)} hg/ha
//               </p>
//               <p className="yield-result__row">
//                 <strong>Typical for {result.crop_label}:</strong> {fmt(result.typical_hg_ha)} hg/ha
//               </p>
//               <p className={`yield-result__row yield-result__rating yield-result__rating--${result.rating}`}>
//                 <strong>Recommendation:</strong> {result.message}
//               </p>

//               <p className="yield-result__note">
//                 Estimate from a model trained on country-level historical data (R² {result.model.r2} on held-out rows, typical error about {fmt(result.model.mae_hg_ha)} hg/ha). It is not a farm-level guarantee.
//               </p>
//             </section>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default YieldPredictionPage;

import { useEffect, useRef, useState } from 'react';
import { FiTrendingUp, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';
import Navbar from '../../components/home/Navbar';
import Footer from '../../components/home/Footer';
import YieldResult from '../../components/results/YieldResult';
import { getYieldCrops, predictYield } from '../../services/yieldService';

const FIELDS = [
  { name: 'rainfall', label: 'Annual Rainfall (mm)', min: 0, max: 5000, placeholder: 'e.g., 800' },
  { name: 'pesticides', label: 'Pesticide Usage (tonnes)', min: 0, max: 1000000, placeholder: 'e.g., 150', hint: 'Training data records national totals in tonnes' },
  { name: 'temperature', label: 'Average Temperature (°C)', min: -10, max: 50, placeholder: 'e.g., 25' },
];

const INITIAL = { crop: '', rainfall: '', pesticides: '', temperature: '' };

const validate = (field, value) => {
  if (value === '') return 'This field is required';
  const num = Number(value);
  if (!Number.isFinite(num)) return 'Enter a valid number';
  if (num < field.min || num > field.max) return `Must be between ${field.min} and ${field.max}`;
  return '';
};

const YieldPredictionPage = () => {
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
    getYieldCrops()
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
  FIELDS.forEach((f) => {
    errors[f.name] = validate(f, values[f.name]);
  });

  const handleChange = (e) => setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleBlur = (e) => setTouched((prev) => ({ ...prev, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ crop: true, rainfall: true, pesticides: true, temperature: true });
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await predictYield({
        crop: values.crop,
        rainfall: Number(values.rainfall),
        pesticides: Number(values.pesticides),
        temperature: Number(values.temperature),
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

  return (
    <div className="crop-page">
      <div className="crop-page__top"><Navbar /></div>

      <main className="crop-page__main crop-page__main--narrow">
        <section className="crop-card-form">
          <h1 className="crop-card-form__title"><FiTrendingUp /> Crop Yield Prediction</h1>
          <p className="crop-card-form__subtitle">Enter your farm conditions to get a yield estimate from a trained model</p>

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

              {FIELDS.map((f) => {
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
              })}
            </div>

            {error && <div className="crop-form__alert" role="alert"><FiAlertCircle /> {error}</div>}

            <button type="submit" className="crop-form__submit" disabled={loading || cropsLoading || Boolean(cropsError)}>
              {loading ? (<><span className="crop-form__spinner" /> Predicting...</>) : (<><FaCalculator /> Predict Yield</>)}
            </button>
          </form>

          {result && (
            <div ref={resultRef}>
              <YieldResult result={result} />
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default YieldPredictionPage;
