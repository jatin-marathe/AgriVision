import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const DashboardLayout = () => (
  <div className="app-shell">
    <Header />
    <div className="app-shell__body">
      <Sidebar />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default DashboardLayout;
