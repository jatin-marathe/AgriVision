import { FiTrendingUp, FiAlertTriangle } from 'react-icons/fi';

const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 });

const YieldResult = ({ result }) => (
  <section className="yield-result">
    <h2 className="yield-result__title"><FiTrendingUp /> Yield Prediction Results</h2>

    {result.recordSaved === false && (
      <p className="save-warning">This result could not be saved to your history.</p>
    )}

    {result.warnings.length > 0 && (
      <div className="yield-result__warning">
        <FiAlertTriangle />
        <ul>{result.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
    )}

    <p className="yield-result__row"><strong>Crop:</strong> {result.crop_label}</p>
    <p className="yield-result__row">
      <strong>Predicted Yield:</strong>{' '}
      <span className="yield-result__value">{fmt(result.yield_hg_ha)} hg/ha</span>{' '}
      <span className="yield-result__muted">(≈ {fmt(result.yield_t_ha)} t/ha)</span>
    </p>
    <p className="yield-result__row">
      <strong>Likely Range:</strong> {fmt(result.low_hg_ha)} - {fmt(result.high_hg_ha)} hg/ha
    </p>
    <p className="yield-result__row">
      <strong>Typical for {result.crop_label}:</strong> {fmt(result.typical_hg_ha)} hg/ha
    </p>
    <p className={`yield-result__row yield-result__rating yield-result__rating--${result.rating}`}>
      <strong>Recommendation:</strong> {result.message}
    </p>

    <p className="yield-result__note">
      Estimate from a model trained on country-level historical data (R² {result.model.r2} on held-out rows, typical error about {fmt(result.model.mae_hg_ha)} hg/ha). It is not a farm-level guarantee.
    </p>
  </section>
);

export default YieldResult;
