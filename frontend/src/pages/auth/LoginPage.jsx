// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../../context/AuthContext';
// import FormField from '../../components/common/FormField';
// import AuthLayout from '../../components/layout/AuthLayout';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [serverError, setServerError] = useState('');
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (formData) => {
//     setServerError('');
//     try {
//       await login(formData.email, formData.password);
//       navigate('/dashboard');
//     } catch (err) {
//       setServerError(err?.response?.data?.message || 'Login failed. Please try again.');
//     }
//   };

//   return (
//     <AuthLayout
//       title="Welcome back"
//       subtitle="Log in to access your farm dashboard, AI tools, and market insights."
//     >
//       <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
//         <h1 className="auth-page__title">Login to AgriVision</h1>

//         {serverError && <p className="auth-page__error">{serverError}</p>}

//         <FormField
//           id="email"
//           label="Email"
//           type="email"
//           error={errors.email}
//           registration={register('email', { required: 'Email is required' })}
//         />
//         <FormField
//           id="password"
//           label="Password"
//           type="password"
//           error={errors.password}
//           registration={register('password', { required: 'Password is required' })}
//         />

//         <div className="auth-page__forgot">
//           <Link to="/forgot-password">Forgot password?</Link>
//         </div>

//         <button type="submit" className="button button--primary" disabled={isSubmitting}>
//           {isSubmitting ? 'Logging in...' : 'Login'}
//         </button>

//         <p className="auth-page__switch">
//           Don&apos;t have an account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// };

// export default LoginPage;


import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/common/FormField';
import AuthLayout from '../../components/layout/AuthLayout';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // If PrivateRoute redirected here, it left the originally-requested
  // page in location.state.from — send the user back there.
  const redirectTo = location.state?.from
    ? `${location.state.from.pathname}${location.state.from.search || ''}`
    : '/';

  const onSubmit = async (formData) => {
    setServerError('');
    try {
      await login(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to access your farm dashboard, AI tools, and market insights."
    >
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="auth-page__title">Login to AgriVision</h1>

        {serverError && <p className="auth-page__error">{serverError}</p>}

        <FormField
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          registration={register('email', { required: 'Email is required' })}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          error={errors.password}
          registration={register('password', { required: 'Password is required' })}
        />

        <div className="auth-page__forgot">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-page__switch">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;