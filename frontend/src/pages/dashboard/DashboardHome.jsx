// import { useEffect, useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import {
//   getFarmSummary,
//   getWeatherSnapshot,
//   getMarketPrices,
//   getDiseaseHistory,
//   getNotifications,
//   getRecommendedCrops,
// } from '../../services/dashboardService';
// import WeatherCard from '../../components/dashboard/WeatherCard';
// import FarmSummaryCard from '../../components/dashboard/FarmSummaryCard';
// import RecommendedCropsCard from '../../components/dashboard/RecommendedCropsCard';
// import MarketPricesCard from '../../components/dashboard/MarketPricesCard';
// import DiseaseHistoryCard from '../../components/dashboard/DiseaseHistoryCard';
// import NotificationsCard from '../../components/dashboard/NotificationsCard';
// import OverviewChart from '../../components/dashboard/OverviewChart';

// const INITIAL_WIDGETS = {
//   farmSummary: null,
//   weather: null,
//   marketPrices: null,
//   diseaseHistory: null,
//   notifications: null,
//   recommendedCrops: null,
// };

// const DashboardHome = () => {
//   const { user } = useAuth();
//   const [widgets, setWidgets] = useState(INITIAL_WIDGETS);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     // Each widget's data is fetched independently and in parallel — one
//     // module not being built yet (see dashboardService.js) never blocks
//     // or slows down the others.
//     const loadDashboard = async () => {
//       const [farmSummary, weather, marketPrices, diseaseHistory, notifications, recommendedCrops] =
//         await Promise.all([
//           getFarmSummary(),
//           getWeatherSnapshot(),
//           getMarketPrices(),
//           getDiseaseHistory(),
//           getNotifications(),
//           getRecommendedCrops(),
//         ]);

//       if (!isMounted) return;

//       setWidgets({ farmSummary, weather, marketPrices, diseaseHistory, notifications, recommendedCrops });
//       setIsLoading(false);
//     };

//     loadDashboard();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const chartData =
//     widgets.diseaseHistory && widgets.diseaseHistory.length > 0 ? widgets.diseaseHistory : null;

//   return (
//     <div className="dashboard-home">
//       <div className="dashboard-home__intro">
//         <h1 className="dashboard-home__title">Welcome, {user?.name}</h1>
//         <p className="dashboard-home__role">
//           Logged in as <strong>{user?.role}</strong>
//         </p>
//       </div>

//       <div className="dashboard-grid">
//         <WeatherCard data={widgets.weather} isLoading={isLoading} />
//         <FarmSummaryCard data={widgets.farmSummary} isLoading={isLoading} />
//         <RecommendedCropsCard data={widgets.recommendedCrops} isLoading={isLoading} />
//         <MarketPricesCard data={widgets.marketPrices} isLoading={isLoading} />
//         <DiseaseHistoryCard data={widgets.diseaseHistory} isLoading={isLoading} />
//         <NotificationsCard data={widgets.notifications} isLoading={isLoading} />
//         <div className="dashboard-grid__wide">
//           <OverviewChart data={chartData} isLoading={isLoading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getHistory } from '../../services/historyService';
import { SERVICES, SERVICE_LABELS, formatInputs, formatDate } from '../../components/history/historyMeta';
import HistoryDetail from '../../components/history/HistoryDetail';

const SERVICE_LINKS = [
  { to: '/crop-recommendation', label: 'Crop Recommendation' },
  { to: '/yield-prediction', label: 'Yield Prediction' },
  { to: '/disease-detection', label: 'Disease Prediction' },
  { to: '/fertilizer-guide', label: 'Fertilizer Guide' },
];

const DashboardHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const recordId = searchParams.get('record');

  const [service, setService] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError('');

    getHistory({ page, service })
      .then((result) => !cancelled && setData(result))
      .catch((err) => {
        if (!cancelled) setError(err.response?.data?.message || 'Could not load your history. Please try again.');
      })
      .finally(() => !cancelled && setIsLoading(false));

    return () => {
      cancelled = true;
    };
  }, [page, service, attempt]);

  const changeService = (value) => {
    setService(value);
    setPage(1);
  };

  if (recordId) {
    return (
      <div className="dashboard-home history">
        <HistoryDetail id={recordId} onBack={() => setSearchParams({})} />
      </div>
    );
  }

  const items = data?.items || [];
  const isEmpty = !isLoading && !error && items.length === 0;

  return (
    <div className="dashboard-home history">
      <h1 className="dashboard-home__title">My History</h1>
      <p className="dashboard-home__role">Your past results from AgriVision services. Open any entry to view it again.</p>

      <div className="history__filters" role="group" aria-label="Filter by service">
        <button
          type="button"
          className={`history__filter${service === '' ? ' history__filter--active' : ''}`}
          onClick={() => changeService('')}
        >
          All
        </button>
        {SERVICES.map((s) => (
          <button
            key={s.value}
            type="button"
            className={`history__filter${service === s.value ? ' history__filter--active' : ''}`}
            onClick={() => changeService(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="history__status">Loading your history...</p>}

      {error && (
        <div className="history__error" role="alert">
          <p>{error}</p>
          <button type="button" className="button button--secondary" onClick={() => setAttempt((n) => n + 1)}>
            Try again
          </button>
        </div>
      )}

      {isEmpty && (
        <div className="history__empty">
          <p>{service ? 'No saved results for this service yet.' : 'No saved results yet. Run a service and it will appear here.'}</p>
          <div className="history__empty-links">
            {SERVICE_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="button button--secondary">{l.label}</Link>
            ))}
          </div>
        </div>
      )}

      {!error && items.length > 0 && (
        <ul className="history__list">
          {items.map((item) => (
            <li key={item._id}>
              <Link to={`/dashboard?record=${item._id}`} className="history-item">
                <div className="history-item__top">
                  <span className={`history-badge history-badge--${item.service}`}>{SERVICE_LABELS[item.service]}</span>
                  <span className="history-item__date">{formatDate(item.createdAt)}</span>
                </div>
                {item.summary && <p className="history-item__summary">{item.summary}</p>}
                <div className="history-item__inputs">
                  {formatInputs(item.inputs).map((i) => (
                    <span key={i.key} className="history-item__chip">{i.label}: {i.value}</span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {data && data.totalPages > 1 && !error && (
        <div className="history__pager">
          <button
            type="button"
            className="button button--secondary"
            disabled={page <= 1 || isLoading}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>Page {data.page} of {data.totalPages}</span>
          <button
            type="button"
            className="button button--secondary"
            disabled={page >= data.totalPages || isLoading}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
