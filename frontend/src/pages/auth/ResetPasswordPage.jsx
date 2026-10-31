import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/common/FormField';
import AuthLayout from '../../components/layout/AuthLayout';

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefillEmail = location.state?.email || '';

  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: prefillEmail } });

  const newPassword = watch('newPassword');

  const onSubmit = async ({ email, otp, newPassword: pwd }) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const message = await resetPassword({ email, otp, newPassword: pwd });
      setSuccessMessage(message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Reset failed. Please check your code.');
    }
  };

  return (
    <AuthLayout
      title="Enter your reset code"
      subtitle="Check your email for the 6-digit code, then choose a new password."
    >
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="auth-page__title">Set a new password</h1>

        {serverError && <p className="auth-page__error">{serverError}</p>}
        {successMessage && <p className="auth-page__info">{successMessage}</p>}

        <FormField
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          registration={register('email', { required: 'Email is required' })}
        />
        <FormField
          id="otp"
          label="6-Digit Code"
          inputMode="numeric"
          maxLength={6}
          error={errors.otp}
          registration={register('otp', {
            required: 'Code is required',
            pattern: { value: /^\d{6}$/, message: 'Code must be 6 digits' },
          })}
        />
        <FormField
          id="newPassword"
          label="New Password"
          type="password"
          error={errors.newPassword}
          registration={register('newPassword', {
            required: 'New password is required',
            minLength: { value: 8, message: 'Minimum 8 characters' },
          })}
        />
        <FormField
          id="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          error={errors.confirmNewPassword}
          registration={register('confirmNewPassword', {
            required: 'Please confirm your new password',
            validate: (value) => value === newPassword || 'Passwords do not match',
          })}
        />

        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting...' : 'Reset Password'}
        </button>

        <p className="auth-page__switch">
          Didn&apos;t get a code? <Link to="/forgot-password">Request a new one</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
