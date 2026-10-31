import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/common/FormField';
import AuthLayout from '../../components/layout/AuthLayout';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (formData) => {
    setServerError('');
    try {
      const { confirmPassword: _confirmPassword, ...payload } = formData;
      await registerUser(payload);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Grow smarter"
      subtitle="Create your free AgriVision account to start tracking farms, weather, and crop health."
    >
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="auth-page__title">Create your account</h1>

        {serverError && <p className="auth-page__error">{serverError}</p>}

        <FormField
          id="name"
          label="Full Name"
          error={errors.name}
          registration={register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Minimum 2 characters' },
          })}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          registration={register('email', { required: 'Email is required' })}
        />
        <FormField
          id="phone"
          label="Phone (optional)"
          type="tel"
          error={errors.phone}
          registration={register('phone')}
        />
        <FormField
          id="location"
          label="Location (optional)"
          error={errors.location}
          registration={register('location')}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          error={errors.password}
          registration={register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
        />
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword}
          registration={register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
        />

        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Register'}
        </button>

        <p className="auth-page__switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
