import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-home">
      <h1 className="dashboard-home__title">Welcome, {user?.name}</h1>
      <p className="dashboard-home__role">
        Logged in as <strong>{user?.role}</strong>
      </p>
      <p className="dashboard-home__placeholder-note">
        Farm summaries, weather, market prices, and disease detection history will appear here
        starting Phase 4.
      </p>
    </div>
  );
};

export default DashboardHome;
