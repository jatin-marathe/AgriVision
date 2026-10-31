import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Generic bar-chart widget. Expects: [{ label, value }]
 * Feeds from Phase 5–9 data once shipped.
 */
const OverviewChart = ({ data, isLoading, title = 'Activity Overview' }) => (
  <DashboardCard
    title={title}
    icon={<FiBarChart2 />}
    isLoading={isLoading}
    isEmpty={!data || data.length === 0}
    emptyMessage="Charts populate automatically once farm and detection data starts coming in."
  >
    {data && (
      <div className="overview-chart">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="var(--color-text-light)" />
            <YAxis tick={{ fontSize: 12 }} stroke="var(--color-text-light)" allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                fontSize: 13,
              }}
            />
            <Bar dataKey="value" fill="#2f9e44" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
  </DashboardCard>
);

export default OverviewChart;
