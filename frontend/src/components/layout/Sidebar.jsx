import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [{ to: '/dashboard', label: 'Dashboard' }, { to: '/profile', label: 'Profile' }];

// Admin-only nav items (e.g. Admin Panel) are added once that route
// ships in Phase 11 — kept out for now to avoid linking to a dead route.
const Sidebar = () => {
  const items = NAV_ITEMS;

  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar__nav">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
