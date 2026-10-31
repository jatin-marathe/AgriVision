// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FiHome, FiUsers, FiInfo, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
// // import { GiPlantSeed } from 'react-icons/gi';

// // const AI_SERVICES = [
// //   { label: 'Crop Recommendation', to: '/login' },
// //   { label: 'Disease Detection', to: '/login' },
// //   { label: 'Fertilizer Guide', to: '/login' },
// // ];

// // const Navbar = () => {
// //   const [isServicesOpen, setIsServicesOpen] = useState(false);
// //   const [isMobileOpen, setIsMobileOpen] = useState(false);

// //   return (
// //     <nav className="navbar">
// //       <Link to="/" className="navbar__brand">
// //         <GiPlantSeed size={22} />
// //         <span>AgriVision</span>
// //       </Link>

// //       <button
// //         type="button"
// //         className="navbar__toggle"
// //         onClick={() => setIsMobileOpen((prev) => !prev)}
// //         aria-label="Toggle menu"
// //       >
// //         {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
// //       </button>

// //       <div className={`navbar__links${isMobileOpen ? ' navbar__links--open' : ''}`}>
// //         <Link to="/" className="navbar__link">
// //           <FiHome size={16} /> Home
// //         </Link>

// //         <div
// //           className="navbar__dropdown"
// //           onMouseEnter={() => setIsServicesOpen(true)}
// //           onMouseLeave={() => setIsServicesOpen(false)}
// //         >
// //           <button type="button" className="navbar__link navbar__link--button">
// //             AI Services <FiChevronDown size={14} />
// //           </button>
// //           {isServicesOpen && (
// //             <div className="navbar__dropdown-menu">
// //               {AI_SERVICES.map((item) => (
// //                 <Link key={item.label} to={item.to} className="navbar__dropdown-item">
// //                   {item.label}
// //                 </Link>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         <Link to="/register" className="navbar__link">
// //           <FiUsers size={16} /> Farmer Connect
// //         </Link>
// //         <Link to="/login" className="navbar__link">
// //           <FiInfo size={16} /> About
// //         </Link>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FiHome, FiUsers, FiInfo, FiChevronDown, FiMenu, FiX, FiZoomIn, FiTrendingUp } from 'react-icons/fi';
// import { FaBrain, FaBug, FaFlask, FaCloudSun } from 'react-icons/fa';
// import { GiPlantSeed } from 'react-icons/gi';

// // Only Crop Recommendation is built so far; the others point to their future
// // routes (they currently fall through to the app's catch-all redirect).
// const AI_SERVICES = [
//   { label: 'Crop Recommendation', to: '/crop-recommendation', icon: FiZoomIn },
//   { label: 'Yield Prediction', to: '/yield-prediction', icon: FiTrendingUp },
//   { label: 'Disease Prediction', to: '/disease-detection', icon: FaBug },
//   { label: 'Fertilizer Guide', to: '/fertilizer-guide', icon: FaFlask },
//   { label: 'Weather Forecast', to: '/weather', icon: FaCloudSun },
// ];

// const Navbar = () => {
//   const [isServicesOpen, setIsServicesOpen] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   const closeMenus = () => {
//     setIsServicesOpen(false);
//     setIsMobileOpen(false);
//   };

//   return (
//     <nav className="navbar">
//       <Link to="/" className="navbar__brand" onClick={closeMenus}>
//         <GiPlantSeed size={22} />
//         <span>AgriVision</span>
//       </Link>

//       <button
//         type="button"
//         className="navbar__toggle"
//         onClick={() => setIsMobileOpen((prev) => !prev)}
//         aria-label="Toggle menu"
//         aria-expanded={isMobileOpen}
//       >
//         {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//       </button>

//       <div className={`navbar__links${isMobileOpen ? ' navbar__links--open' : ''}`}>
//         <Link to="/" className="navbar__link" onClick={closeMenus}>
//           <FiHome size={16} /> Home
//         </Link>


//         <div className="navbar__dropdown">
//           <button
//             type="button"
//             className="navbar__link navbar__link--button"
//             onClick={() => setIsServicesOpen((prev) => !prev)}
//             aria-haspopup="true"
//             aria-expanded={isServicesOpen}
//           >
//             <FaBrain size={16} /> AI Services <FiChevronDown size={14} />
//           </button>
//           {isServicesOpen && (
//             <div className="navbar__dropdown-menu">
//               {AI_SERVICES.map(({ label, to, icon: Icon }) => (
//                 <Link key={label} to={to} className="navbar__dropdown-item" onClick={closeMenus}>
//                   <Icon size={16} /> {label}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>

//         <Link to="/register" className="navbar__link" onClick={closeMenus}>
//           <FiUsers size={16} /> Farmer Connect
//         </Link>
//         <Link to="/about" className="navbar__link" onClick={closeMenus}>
//           <FiInfo size={16} /> About
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHome, FiUsers, FiInfo, FiChevronDown, FiMenu, FiX, FiZoomIn, FiTrendingUp,
  FiUser, FiGrid, FiLogIn, FiLogOut,
} from 'react-icons/fi';
import { FaBrain, FaBug, FaFlask, FaCloudSun } from 'react-icons/fa';
import { GiPlantSeed } from 'react-icons/gi';
import { useAuth } from '../../context/AuthContext';

const AI_SERVICES = [
  { label: 'Crop Recommendation', to: '/crop-recommendation', icon: FiZoomIn },
  { label: 'Yield Prediction', to: '/yield-prediction', icon: FiTrendingUp },
  { label: 'Disease Prediction', to: '/disease-detection', icon: FaBug },
  { label: 'Fertilizer Guide', to: '/fertilizer-guide', icon: FaFlask },
  { label: 'Weather Forecast', to: '/weather', icon: FaCloudSun },
];

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const profileRef = useRef(null);

  const closeMenus = () => {
    setIsServicesOpen(false);
    setIsProfileOpen(false);
    setIsMobileOpen(false);
  };

  // Close the Profile dropdown on outside click or Escape
  useEffect(() => {
    if (!isProfileOpen) return undefined;
    const onPointerDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsProfileOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isProfileOpen]);

  const toggleProfile = () => {
    setLogoutError('');
    setIsServicesOpen(false);
    setIsProfileOpen((prev) => !prev);
  };

  // logout() (AuthContext) calls the API and clears the token + user
  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError('');
    try {
      await logout();
      closeMenus();
      navigate('/', { replace: true });
    } catch {
      setLogoutError('Logout failed. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand" onClick={closeMenus}>
        <GiPlantSeed size={22} />
        <span>AgriVision</span>
      </Link>

      <button
        type="button"
        className="navbar__toggle"
        onClick={() => setIsMobileOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <div className={`navbar__links${isMobileOpen ? ' navbar__links--open' : ''}`}>
        <Link to="/" className="navbar__link" onClick={closeMenus}>
          <FiHome size={16} /> Home
        </Link>

        <div className="navbar__dropdown">
          <button
            type="button"
            className="navbar__link navbar__link--button"
            onClick={() => setIsServicesOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isServicesOpen}
          >
            <FaBrain size={16} /> AI Services <FiChevronDown size={14} />
          </button>
          {isServicesOpen && (
            <div className="navbar__dropdown-menu">
              {AI_SERVICES.map(({ label, to, icon: Icon }) => (
                <Link key={label} to={to} className="navbar__dropdown-item" onClick={closeMenus}>
                  <Icon size={16} /> {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/register" className="navbar__link" onClick={closeMenus}>
          <FiUsers size={16} /> Farmer Connect
        </Link>
        <Link to="/about" className="navbar__link" onClick={closeMenus}>
          <FiInfo size={16} /> About
        </Link>

        {/* Auth slot: nothing while the session is restoring, to avoid a Login/Profile flicker */}
        {!isLoading &&
          (user ? (
            <div className="navbar__dropdown" ref={profileRef}>
              <button
                type="button"
                className="navbar__link navbar__link--button"
                onClick={toggleProfile}
                aria-haspopup="true"
                aria-expanded={isProfileOpen}
              >
                <FiUser size={16} /> Profile <FiChevronDown size={14} />
              </button>
              {isProfileOpen && (
                <div className="navbar__dropdown-menu navbar__dropdown-menu--right">
                  <Link to="/dashboard" className="navbar__dropdown-item" onClick={closeMenus}>
                    <FiGrid size={16} /> Dashboard
                  </Link>
                  <button
                    type="button"
                    className="navbar__dropdown-item navbar__dropdown-item--button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <FiLogOut size={16} /> {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                  {logoutError && (
                    <p className="navbar__dropdown-note" role="alert">{logoutError}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="navbar__link" onClick={closeMenus}>
              <FiLogIn size={16} /> Login
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;