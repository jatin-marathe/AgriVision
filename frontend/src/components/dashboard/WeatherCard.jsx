import { FiCloudRain, FiWind, FiDroplet } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: { location, temperature, condition, humidity, windSpeed }
 * Real data ships in Phase 6 (OpenWeather integration).
 */
const WeatherCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Weather"
    icon={<FiCloudRain />}
    isLoading={isLoading}
    isEmpty={!data}
    emptyMessage="Weather forecasting connects to your farm location starting Phase 6."
  >
    {data && (
      <div className="weather-card">
        <div className="weather-card__main">
          <span className="weather-card__temp">{data.temperature}°C</span>
          <span className="weather-card__condition">{data.condition}</span>
        </div>
        <span className="weather-card__location">{data.location}</span>
        <div className="weather-card__meta">
          <span>
            <FiDroplet size={14} /> {data.humidity}% humidity
          </span>
          <span>
            <FiWind size={14} /> {data.windSpeed} km/h
          </span>
        </div>
      </div>
    )}
  </DashboardCard>
);

export default WeatherCard;
