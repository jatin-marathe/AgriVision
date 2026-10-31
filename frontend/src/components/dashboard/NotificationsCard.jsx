import { FiBell } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: [{ id, message, type, read, createdAt }]
 * Real data ships in Phase 10 (Notifications / Reminder System).
 */
const NotificationsCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Notifications"
    icon={<FiBell />}
    isLoading={isLoading}
    isEmpty={!data || data.length === 0}
    emptyMessage="You're all caught up. Reminders and alerts ship in Phase 10."
  >
    {data && (
      <ul className="notifications__list">
        {data.map((item) => (
          <li
            key={item.id}
            className={`notifications__item${item.read ? '' : ' notifications__item--unread'}`}
          >
            <span className="notifications__message">{item.message}</span>
            <span className="notifications__time">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    )}
  </DashboardCard>
);

export default NotificationsCard;
