import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/common/FormField';
import AuthLayout from '../../components/layout/AuthLayout';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setServerError('');
    setInfoMessage('');
    try {
      const message = await forgotPassword(email);
      setInfoMessage(message);
      // Move to the reset step after a short pause so the user sees the confirmation
      setTimeout(() => navigate('/reset-password', { state: { email } }), 1200);
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter the email linked to your account and we'll send you a 6-digit reset code."
    >
      <form className="auth-page__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className="auth-page__title">Reset your password</h1>

        {serverError && <p className="auth-page__error">{serverError}</p>}
        {infoMessage && <p className="auth-page__info">{infoMessage}</p>}

        <FormField
          id="email"
          label="Email"
          type="email"
          error={errors.email}
          registration={register('email', { required: 'Email is required' })}
        />

        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {isSubmitting ? 'Sending code...' : 'Send Reset Code'}
        </button>

        <p className="auth-page__switch">
          Already have a code?{' '}
          <Link to="/reset-password" state={{ email: getValues('email') }}>
            Enter it here
          </Link>
        </p>
        <p className="auth-page__switch">
          Remembered your password? <Link to="/login">Back to login</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
