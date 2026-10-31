import { FiSun } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: [{ crop, confidence }]
 * Real data ships in Phase 8 (Crop Recommendation - Random Forest model).
 * Needs soil input (N-P-K, pH) from the farmer first, so the empty state
 * doubles as the entry point once that page exists.
 */
const RecommendedCropsCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Recommended Crops"
    icon={<FiSun />}
    isLoading={isLoading}
    isEmpty={!data || data.length === 0}
    emptyMessage="Get a personalized crop recommendation once the Crop Recommendation tool ships in Phase 8."
  >
    {data && (
      <ul className="recommended-crops__list">
        {data.map((item) => (
          <li key={item.crop} className="recommended-crops__item">
            <span className="recommended-crops__name">{item.crop}</span>
            <span className="recommended-crops__confidence">{item.confidence}% match</span>
          </li>
        ))}
      </ul>
    )}
  </DashboardCard>
);

export default RecommendedCropsCard;
