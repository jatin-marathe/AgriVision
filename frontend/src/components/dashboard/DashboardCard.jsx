/**
 * Shared shell for every dashboard widget. Handles the three states every
 * widget needs (loading / empty / populated) in one place.
 */
const DashboardCard = ({ icon, title, isLoading, isEmpty, emptyMessage, children }) => (
  <div className="dashboard-card">
    <div className="dashboard-card__header">
      {icon && <span className="dashboard-card__icon">{icon}</span>}
      <h3 className="dashboard-card__title">{title}</h3>
    </div>

    <div className="dashboard-card__body">
      {isLoading && <div className="dashboard-card__skeleton" />}
      {!isLoading && isEmpty && (
        <p className="dashboard-card__empty">{emptyMessage || 'Nothing to show yet.'}</p>
      )}
      {!isLoading && !isEmpty && children}
    </div>
  </div>
);

export default DashboardCard;
