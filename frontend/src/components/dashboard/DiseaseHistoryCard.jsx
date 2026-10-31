import { FiActivity } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: [{ id, cropType, disease, confidence, date }]
 * Real data ships in Phase 7 (AI Disease Detection).
 */
const DiseaseHistoryCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Disease Detection History"
    icon={<FiActivity />}
    isLoading={isLoading}
    isEmpty={!data || data.length === 0}
    emptyMessage="No scans yet — AI disease detection ships in Phase 7."
  >
    {data && (
      <ul className="disease-history__list">
        {data.map((item) => (
          <li key={item.id} className="disease-history__item">
            <div>
              <span className="disease-history__disease">{item.disease}</span>
              <span className="disease-history__crop">{item.cropType}</span>
            </div>
            <span className="disease-history__date">
              {new Date(item.date).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    )}
  </DashboardCard>
);

export default DiseaseHistoryCard;
