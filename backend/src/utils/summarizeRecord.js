const num = (n, digits = 1) => Number(n).toLocaleString('en-US', { maximumFractionDigits: digits });
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

/**
 * One-line headline of a service result, stored with the record so the
 * history list never has to load the full result.
 */
const summarize = (service, result) => {
  try {
    switch (service) {
      case 'crop': {
        const top = result.recommendations[0];
        return `Top pick: ${top.name} (${num(top.confidence)}% match)`;
      }
      case 'yield':
        return `${result.crop_label}: ${num(result.yield_hg_ha, 0)} hg/ha (about ${num(result.yield_t_ha, 2)} t/ha)`;
      case 'disease':
        return `${result.crop_label}: ${cap(result.risk_level)} risk (${result.risk_score}/100)`;
      case 'fertilizer': {
        const p = result.per_hectare;
        return `${result.crop_label}: N ${num(p.n, 0)} · P2O5 ${num(p.p2o5, 0)} · K2O ${num(p.k2o, 0)} kg/ha`;
      }
      default:
        return '';
    }
  } catch {
    return '';
  }
};

module.exports = summarize;
