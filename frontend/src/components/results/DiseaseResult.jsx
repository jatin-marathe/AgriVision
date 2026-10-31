import { FaBug } from 'react-icons/fa';

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const DiseaseResult = ({ result }) => (
  <section className="disease-result">
    <h2 className="disease-result__title"><FaBug /> Disease Risk Assessment</h2>

    {result.recordSaved === false && (
      <p className="save-warning">This result could not be saved to your history.</p>
    )}

    <p className="disease-result__row">
      <strong>Risk Level:</strong>{' '}
      <span className={`risk-badge risk-badge--${result.risk_level}`}>{cap(result.risk_level)}</span>{' '}
      <span className="disease-result__muted">({result.risk_score}/100 for {result.crop_label})</span>
    </p>
    <p className="disease-result__row"><strong>Recommendation:</strong> {result.recommendation}</p>

    <h3 className="disease-result__subtitle">Diseases to watch</h3>
    <ul className="disease-result__threats">
      {result.threats.map((t, i) => (
        <li key={t.name} className="disease-result__threat">
          <div className="disease-result__threat-head">
            <span>{t.name}</span>
            <span className={`risk-badge risk-badge--${t.level}`}>{cap(t.level)} · {t.score}</span>
          </div>
          <p className="disease-result__tip">{t.tip}</p>
          {i === 0 && (
            <ul className="disease-result__factors">
              {t.factors.map((f) => (
                <li key={f.text} className={`disease-result__factor disease-result__factor--${f.status}`}>{f.text}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>

    <p className="disease-result__note">
      Based on current environmental conditions and crop type. This is a rule-based risk index using approximate plant-pathology thresholds, not a trained model or a calibrated forecast.
    </p>
  </section>
);

export default DiseaseResult;
