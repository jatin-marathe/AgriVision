import { useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleHome = async () => {
    navigate('/');
  };
  return (
    <header className="header">
      <span className="header__brand">AgriVision</span>
      <div className="header__actions">
        <button
          type="button"
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>

        <span className="header__user">
          {user?.name} <span className="header__role-badge">{user?.role}</span>
        </span>

        <button className="button button--secondary header__logout" onClick={handleHome}>
          <FiLogOut size={16} />
          <span>Home</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
