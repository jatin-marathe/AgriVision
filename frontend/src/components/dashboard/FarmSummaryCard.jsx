import { FiMapPin, FiPlus } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: { totalFarms, totalFields, totalAreaAcres }
 * Real data ships in Phase 5 (Farm & Field Management).
 */
const FarmSummaryCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Farm Summary"
    icon={<FiMapPin />}
    isLoading={isLoading}
    isEmpty={!data}
    emptyMessage="You haven't added any farms yet. Farm management ships in Phase 5."
  >
    {data && (
      <div className="farm-summary">
        <div className="farm-summary__stat">
          <span className="farm-summary__value">{data.totalFarms}</span>
          <span className="farm-summary__label">Farms</span>
        </div>
        <div className="farm-summary__stat">
          <span className="farm-summary__value">{data.totalFields}</span>
          <span className="farm-summary__label">Fields</span>
        </div>
        <div className="farm-summary__stat">
          <span className="farm-summary__value">{data.totalAreaAcres}</span>
          <span className="farm-summary__label">Acres</span>
        </div>
      </div>
    )}
    {!data && !isLoading && (
      <span className="dashboard-card__cta dashboard-card__cta--disabled">
        <FiPlus size={14} /> Add Farm (available in Phase 5)
      </span>
    )}
  </DashboardCard>
);

export default FarmSummaryCard;
