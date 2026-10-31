// // // // import { Routes, Route, Navigate } from 'react-router-dom';
// // // // import PrivateRoute from './PrivateRoute';
// // // // import DashboardLayout from '../components/layout/DashboardLayout';
// // // // import HomePage from '../pages/public/HomePage';
// // // // import LoginPage from '../pages/auth/LoginPage';
// // // // import RegisterPage from '../pages/auth/RegisterPage';
// // // // import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// // // // import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
// // // // import DashboardHome from '../pages/dashboard/DashboardHome';
// // // // import ProfilePage from '../pages/dashboard/ProfilePage';

// // // // const AppRoutes = () => (
// // // //   <Routes>
// // // //     <Route path="/" element={<HomePage />} />
// // // //     <Route path="/login" element={<LoginPage />} />
// // // //     <Route path="/register" element={<RegisterPage />} />
// // // //     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
// // // //     <Route path="/reset-password" element={<ResetPasswordPage />} />

// // // //     <Route element={<PrivateRoute />}>
// // // //       <Route element={<DashboardLayout />}>
// // // //         <Route path="/dashboard" element={<DashboardHome />} />
// // // //         <Route path="/profile" element={<ProfilePage />} />
// // // //       </Route>
// // // //     </Route>

// // // //     {/* Admin-only routes are added in Phase 11, gated the same way:
// // // //         <Route element={<PrivateRoute allowedRoles={['admin']} />}> ... */}

// // // //     <Route path="*" element={<Navigate to="/login" replace />} />
// // // //   </Routes>
// // // // );

// // // // export default AppRoutes;
// // // import { Routes, Route, Navigate } from 'react-router-dom';
// // // import PrivateRoute from './PrivateRoute';
// // // import DashboardLayout from '../components/layout/DashboardLayout';
// // // import HomePage from '../pages/public/HomePage';
// // // import CropRecommendationPage from '../pages/public/CropRecommendationPage';
// // // import LoginPage from '../pages/auth/LoginPage';
// // // import RegisterPage from '../pages/auth/RegisterPage';
// // // import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// // // import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
// // // import DashboardHome from '../pages/dashboard/DashboardHome';
// // // import ProfilePage from '../pages/dashboard/ProfilePage';

// // // const AppRoutes = () => (
// // //   <Routes>
// // //     <Route path="/" element={<HomePage />} />
// // //     <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
// // //     <Route path="/login" element={<LoginPage />} />
// // //     <Route path="/register" element={<RegisterPage />} />
// // //     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
// // //     <Route path="/reset-password" element={<ResetPasswordPage />} />

// // //     <Route element={<PrivateRoute />}>
// // //       <Route element={<DashboardLayout />}>
// // //         <Route path="/dashboard" element={<DashboardHome />} />
// // //         <Route path="/profile" element={<ProfilePage />} />
// // //       </Route>
// // //     </Route>

// // //     {/* Admin-only routes are added in Phase 11, gated the same way:
// // //         <Route element={<PrivateRoute allowedRoles={['admin']} />}> ... */}

// // //     <Route path="*" element={<Navigate to="/login" replace />} />
// // //   </Routes>
// // // );

// // // export default AppRoutes;


// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import PrivateRoute from './PrivateRoute';
// // import DashboardLayout from '../components/layout/DashboardLayout';
// // import HomePage from '../pages/public/HomePage';
// // import CropRecommendationPage from '../pages/public/CropRecommendationPage';
// // import YieldPredictionPage from '../pages/public/YieldPredictionPage';
// // import LoginPage from '../pages/auth/LoginPage';
// // import RegisterPage from '../pages/auth/RegisterPage';
// // import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// // import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
// // import DashboardHome from '../pages/dashboard/DashboardHome';
// // import ProfilePage from '../pages/dashboard/ProfilePage';

// // const AppRoutes = () => (
// //   <Routes>
// //     <Route path="/" element={<HomePage />} />
// //     <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
// //     <Route path="/yield-prediction" element={<YieldPredictionPage />} />
// //     <Route path="/login" element={<LoginPage />} />
// //     <Route path="/register" element={<RegisterPage />} />
// //     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
// //     <Route path="/reset-password" element={<ResetPasswordPage />} />

// //     <Route element={<PrivateRoute />}>
// //       <Route element={<DashboardLayout />}>
// //         <Route path="/dashboard" element={<DashboardHome />} />
// //         <Route path="/profile" element={<ProfilePage />} />
// //       </Route>
// //     </Route>

// //     {/* Admin-only routes are added in Phase 11, gated the same way:
// //         <Route element={<PrivateRoute allowedRoles={['admin']} />}> ... */}

// //     <Route path="*" element={<Navigate to="/login" replace />} />
// //   </Routes>
// // );

// // export default AppRoutes;

// import { Routes, Route, Navigate } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import DashboardLayout from '../components/layout/DashboardLayout';
// import HomePage from '../pages/public/HomePage';
// import CropRecommendationPage from '../pages/public/CropRecommendationPage';
// import YieldPredictionPage from '../pages/public/YieldPredictionPage';
// import DiseaseRiskPage from '../pages/public/DiseaseRiskPage';
// import LoginPage from '../pages/auth/LoginPage';
// import RegisterPage from '../pages/auth/RegisterPage';
// import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
// import DashboardHome from '../pages/dashboard/DashboardHome';
// import ProfilePage from '../pages/dashboard/ProfilePage';

// const AppRoutes = () => (
//   <Routes>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
//     <Route path="/yield-prediction" element={<YieldPredictionPage />} />
//     <Route path="/disease-detection" element={<DiseaseRiskPage />} />
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/register" element={<RegisterPage />} />
//     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//     <Route path="/reset-password" element={<ResetPasswordPage />} />

//     <Route element={<PrivateRoute />}>
//       <Route element={<DashboardLayout />}>
//         <Route path="/dashboard" element={<DashboardHome />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Route>
//     </Route>

//     {/* Admin-only routes are added in Phase 11, gated the same way:
//         <Route element={<PrivateRoute allowedRoles={['admin']} />}> ... */}

//     <Route path="*" element={<Navigate to="/login" replace />} />
//   </Routes>
// );

// export default AppRoutes;

// import { Routes, Route, Navigate } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import DashboardLayout from '../components/layout/DashboardLayout';
// import HomePage from '../pages/public/HomePage';
// import CropRecommendationPage from '../pages/public/CropRecommendationPage';
// import YieldPredictionPage from '../pages/public/YieldPredictionPage';
// import DiseaseRiskPage from '../pages/public/DiseaseRiskPage';
// import FertilizerPage from '../pages/public/FertilizerPage';
// import LoginPage from '../pages/auth/LoginPage';
// import RegisterPage from '../pages/auth/RegisterPage';
// import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
// import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
// import DashboardHome from '../pages/dashboard/DashboardHome';
// import ProfilePage from '../pages/dashboard/ProfilePage';
// import About from '../pages/public/About';

// const AppRoutes = () => (
//   <Routes>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/about" element={<About />} />
//     <Route path="/login" element={<LoginPage />} />
//     <Route path="/register" element={<RegisterPage />} />
//     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//     <Route path="/reset-password" element={<ResetPasswordPage />} />
//     <Route element={<PrivateRoute />}>
//       <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
//       <Route path="/yield-prediction" element={<YieldPredictionPage />} />
//       <Route path="/disease-detection" element={<DiseaseRiskPage />} />
//       <Route path="/fertilizer-guide" element={<FertilizerPage />} />
//       <Route element={<DashboardLayout />}>
//         <Route path="/dashboard" element={<DashboardHome />} />
//         <Route path="/profile" element={<ProfilePage />} />
//       </Route>
//     </Route>

//     <Route path="*" element={<Navigate to="/login" replace />} />
//   </Routes>
// );

// export default AppRoutes;

import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../components/layout/DashboardLayout';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CropRecommendationPage from '../pages/public/CropRecommendationPage';
import YieldPredictionPage from '../pages/public/YieldPredictionPage';
import DiseaseRiskPage from '../pages/public/DiseaseRiskPage';
import FertilizerPage from '../pages/public/FertilizerPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import DashboardHome from '../pages/dashboard/DashboardHome';
import ProfilePage from '../pages/dashboard/ProfilePage';

const AppRoutes = () => (
  <Routes>
    {/* Public — no login required */}
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />

    <Route element={<PrivateRoute />}>
      <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
      <Route path="/yield-prediction" element={<YieldPredictionPage />} />
      <Route path="/disease-detection" element={<DiseaseRiskPage />} />
      <Route path="/fertilizer-guide" element={<FertilizerPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRoutes;