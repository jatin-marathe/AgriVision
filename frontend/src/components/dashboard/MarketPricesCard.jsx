import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import DashboardCard from './DashboardCard';

/**
 * Expects: [{ crop, price, unit, trend }] where trend is 'up'|'down'|'flat'.
 * Real data ships in Phase 9.
 */
const MarketPricesCard = ({ data, isLoading }) => (
  <DashboardCard
    title="Market Prices"
    icon={<FiTrendingUp />}
    isLoading={isLoading}
    isEmpty={!data || data.length === 0}
    emptyMessage="Live market price tracking ships in Phase 9."
  >
    {data && (
      <table className="table market-prices-table">
        <thead>
          <tr>
            <th>Crop</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.crop}>
              <td>{item.crop}</td>
              <td>
                ₹{item.price} / {item.unit}
              </td>
              <td>
                {item.trend === 'up' && (
                  <FiTrendingUp className="market-prices-table__trend market-prices-table__trend--up" />
                )}
                {item.trend === 'down' && (
                  <FiTrendingDown className="market-prices-table__trend market-prices-table__trend--down" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </DashboardCard>
);

export default MarketPricesCard;
