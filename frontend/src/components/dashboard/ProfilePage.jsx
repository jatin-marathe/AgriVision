import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import FormField from '../../components/common/FormField';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      location: user?.location || '',
    },
  });

  const onSubmit = async (formData) => {
    setServerError('');
    setSuccessMessage('');
    try {
      await updateProfile(formData);
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setServerError(err?.response?.data?.message || 'Update failed. Please try again.');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-page__header">
        <h1>My Profile</h1>
        <span className={`profile-page__role-badge profile-page__role-badge--${user?.role}`}>
          {user?.role === 'admin' ? 'Administrator' : 'Farmer'}
        </span>
      </div>

      <div className="card profile-page__card">
        <div className="profile-page__readonly">
          <div>
            <span className="profile-page__readonly-label">Email</span>
            <span className="profile-page__readonly-value">{user?.email}</span>
          </div>
          <div>
            <span className="profile-page__readonly-label">Member since</span>
            <span className="profile-page__readonly-value">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {serverError && <p className="auth-page__error">{serverError}</p>}
          {successMessage && <p className="auth-page__info">{successMessage}</p>}

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
            id="phone"
            label="Phone"
            type="tel"
            error={errors.phone}
            registration={register('phone')}
          />
          <FormField
            id="location"
            label="Location"
            error={errors.location}
            registration={register('location')}
          />

          {user?.role === 'admin' && (
            <p className="profile-page__admin-note">
              Admin-specific tools (user management, platform analytics) are available from the
              Admin Panel.
            </p>
          )}

          <button
            type="submit"
            className="button button--primary"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
