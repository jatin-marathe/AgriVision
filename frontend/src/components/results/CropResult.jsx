// import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
// import { GiPlantSeed } from 'react-icons/gi';

// const CropResult = ({ result, inputs = {} }) => (
//   <section className="crop-results">
//     <h2 className="crop-results__title"><GiPlantSeed /> Crop Recommendations for Your Farm</h2>

//     {result.recordSaved === false && (
//       <p className="save-warning">This result could not be saved to your history.</p>
//     )}

//     <div className="crop-results__params">
//       <strong>Analysis Parameters:</strong> Rainfall: {inputs.rainfall}mm, Temperature: {inputs.temperature}°C, Humidity: {inputs.humidity}%, pH: {inputs.ph}, N-P-K: {inputs.N}-{inputs.P}-{inputs.K}
//     </div>

//     {result.warnings?.length > 0 && (
//       <div className="crop-results__warning">
//         <FiAlertTriangle />
//         <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
//       </div>
//     )}

//     <div className="crop-results__grid">
//       {result.recommendations.map((r) => (
//         <article className="crop-card" key={r.crop}>
//           <header className="crop-card__head">
//             <h3>{r.name}</h3>
//             <span className="crop-card__badge">{r.confidence}% Match</span>
//           </header>
//           <div className="crop-card__body">
//             <p className={`crop-card__level crop-card__level--${r.level}`}>{r.recommendation}</p>
//             <dl className="crop-card__meta">
//               <div><dt>Duration</dt><dd>{r.duration || '-'}</dd></div>
//               <div><dt>Water Need</dt><dd>{r.water_need || '-'}</dd></div>
//             </dl>
//             <h4 className="crop-card__subtitle">Suitability Analysis:</h4>
//             <ul className="crop-card__checks">
//               {r.checks.map((c) => (
//                 <li key={c.text} className={`crop-card__check crop-card__check--${c.status}`}>
//                   {c.status === 'ok' ? <FiCheck /> : <FiAlertTriangle />} {c.text}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </article>
//       ))}
//     </div>

//     <div className="crop-results__notes">
//       <h4><FiAlertTriangle /> Important Notes:</h4>
//       <ul>
//         <li>Predictions come from a model trained on a public dataset (hold-out accuracy {result.model.accuracy}%) and are not a guarantee.</li>
//         <li>&quot;Match&quot; is the model&apos;s confidence, not expected profit or yield.</li>
//         <li>Consult local agricultural extension officers for region-specific advice.</li>
//         <li>Soil testing is recommended for precise nutrient management.</li>
//       </ul>
//     </div>
//   </section>
// );

// export default CropResult;

import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { GiPlantSeed } from 'react-icons/gi';

const WATER_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };
const EXPERIENCE_LABELS = { beginner: 'Beginner', intermediate: 'Intermediate', experienced: 'Experienced' };
const MARKET_LABELS = { food: 'Food crops', cash: 'Cash crops', mixed: 'Mixed farming' };

const CropResult = ({ result, inputs = {} }) => (
  <section className="crop-results">
    <h2 className="crop-results__title"><GiPlantSeed /> Crop Recommendations for Your Farm</h2>

    {result.recordSaved === false && (
      <p className="save-warning">This result could not be saved to your history.</p>
    )}

    <div className="crop-results__params">
      <strong>Analysis Parameters:</strong> Rainfall: {inputs.rainfall}mm, Temperature: {inputs.temperature}°C, Humidity: {inputs.humidity}%, pH: {inputs.ph}, N-P-K: {inputs.N}-{inputs.P}-{inputs.K}
      {inputs.area_ha !== undefined && <>, Farm size: {inputs.area_ha} ha</>}
      {inputs.water_availability && <>, Water: {WATER_LABELS[inputs.water_availability]}</>}
      {inputs.farming_experience && <>, Experience: {EXPERIENCE_LABELS[inputs.farming_experience]}</>}
      {inputs.market_preference && <>, Market: {MARKET_LABELS[inputs.market_preference]}</>}
    </div>

    {result.warnings?.length > 0 && (
      <div className="crop-results__warning">
        <FiAlertTriangle />
        <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
    )}

    <div className="crop-results__grid">
      {result.recommendations.map((r) => (
        <article className="crop-card" key={r.crop}>
          <header className="crop-card__head">
            <h3>{r.name}</h3>
            <span className="crop-card__badge">{r.confidence}% Match</span>
          </header>
          <div className="crop-card__body">
            <p className={`crop-card__level crop-card__level--${r.level}`}>{r.recommendation}</p>
            <dl className="crop-card__meta">
              <div><dt>Duration</dt><dd>{r.duration || '-'}</dd></div>
              <div><dt>Water Need</dt><dd>{r.water_need || '-'}</dd></div>
              {r.market_type && <div><dt>Market Type</dt><dd>{r.market_type}</dd></div>}
            </dl>
            <h4 className="crop-card__subtitle">Suitability Analysis:</h4>
            <ul className="crop-card__checks">
              {r.checks.map((c) => (
                <li key={c.text} className={`crop-card__check crop-card__check--${c.status}`}>
                  {c.status === 'ok' ? <FiCheck /> : <FiAlertTriangle />} {c.text}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>

    <div className="crop-results__notes">
      <h4><FiAlertTriangle /> Important Notes:</h4>
      <ul>
        <li>Predictions come from a model trained on a public dataset (hold-out accuracy {result.model.accuracy}%) and are not a guarantee.</li>
        <li>&quot;Match&quot; is the model&apos;s confidence, not expected profit or yield.</li>
        {result.fit_applied && (
          <li>Water availability, experience, market preference and farm size are not model inputs: they scale the model&apos;s confidence with fixed, approximate rules (shown under each crop).</li>
        )}
        <li>Consult local agricultural extension officers for region-specific advice.</li>
        <li>Soil testing is recommended for precise nutrient management.</li>
      </ul>
    </div>
  </section>
);

export default CropResult;

