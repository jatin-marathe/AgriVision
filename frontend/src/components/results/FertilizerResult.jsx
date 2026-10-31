import { FiAlertTriangle } from 'react-icons/fi';
import { FaFlask, FaLeaf, FaSeedling, FaTint, FaCalendarAlt } from 'react-icons/fa';

const NUTRIENTS = [
  { key: 'n', label: 'Nitrogen (N)', icon: FaLeaf, mod: 'n' },
  { key: 'p2o5', label: 'Phosphorus (P₂O₅)', icon: FaSeedling, mod: 'p' },
  { key: 'k2o', label: 'Potassium (K₂O)', icon: FaTint, mod: 'k' },
];

const fmt = (n) => Number(n).toLocaleString(undefined, { maximumFractionDigits: 1 });

const FertilizerResult = ({ result }) => (
  <section className="fert-result">
    <h2 className="fert-result__title"><FaFlask /> Fertilizer Recommendation for {result.crop_label}</h2>

    {result.recordSaved === false && (
      <p className="save-warning">This result could not be saved to your history.</p>
    )}

    <div className="fert-result__npk">
      {NUTRIENTS.map(({ key, label, icon: Icon, mod }) => (
        <div key={key} className={`fert-nutrient fert-nutrient--${mod}`}>
          <Icon className="fert-nutrient__icon" />
          <p className="fert-nutrient__label">{label}</p>
          <p className="fert-nutrient__value">{fmt(result.per_hectare[key])}</p>
          <p className="fert-nutrient__unit">kg/ha</p>
          <p className="fert-nutrient__total">{fmt(result.field_total[key])} kg for {fmt(result.area_ha)} ha</p>
        </div>
      ))}
    </div>

    <div className="fert-panel">
      <h3 className="fert-panel__head"><FaCalendarAlt /> Application Schedule</h3>
      <div className="fert-panel__body">
        <p className="fert-panel__message">{result.stage_message}</p>
        <div className="fert-table-wrap">
          <table className="fert-table">
            <thead>
              <tr><th>Stage</th><th>Timing</th><th>N</th><th>P₂O₅</th><th>K₂O</th></tr>
            </thead>
            <tbody>
              {result.schedule.map((s) => (
                <tr key={s.stage} className={s.current ? 'fert-table__row--current' : ''}>
                  <td>{s.stage_label}</td>
                  <td>{s.timing}</td>
                  <td>{fmt(s.n)}</td>
                  <td>{fmt(s.p2o5)}</td>
                  <td>{fmt(s.k2o)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="fert-panel__unit">Amounts in kg/ha. Highlighted row = your current stage.</p>
      </div>
    </div>

    <div className="fert-panel">
      <h3 className="fert-panel__head">Fertilizer Products</h3>
      <div className="fert-panel__body">
        <div className="fert-table-wrap">
          <table className="fert-table">
            <thead>
              <tr><th>Product</th><th>Per hectare</th><th>For {fmt(result.area_ha)} ha</th></tr>
            </thead>
            <tbody>
              <tr><td>Urea (46% N)</td><td>{fmt(result.products.per_hectare.urea)} kg</td><td>{fmt(result.products.field_total.urea)} kg</td></tr>
              <tr><td>DAP (18-46-0)</td><td>{fmt(result.products.per_hectare.dap)} kg</td><td>{fmt(result.products.field_total.dap)} kg</td></tr>
              <tr><td>MOP (60% K₂O)</td><td>{fmt(result.products.per_hectare.mop)} kg</td><td>{fmt(result.products.field_total.mop)} kg</td></tr>
            </tbody>
          </table>
        </div>
        <p className="fert-panel__unit">DAP supplies all the phosphorus plus some nitrogen; urea covers the remaining nitrogen.</p>
      </div>
    </div>

    {result.adjustments.length > 0 && (
      <div className="fert-adjust">
        <h4>Adjustments applied</h4>
        <ul>{result.adjustments.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>
    )}

    <div className="fert-notes">
      <h4><FiAlertTriangle /> Important Notes:</h4>
      <ul>{result.notes.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  </section>
);

export default FertilizerResult;
