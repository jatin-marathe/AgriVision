/**
 * Shared shell for all auth pages (login, register, forgot/reset password).
 * Renders a branding panel alongside the form on larger screens; the
 * branding panel collapses away on mobile via SCSS (see _auth.scss).
 */
const AuthLayout = ({ title, subtitle, children }) => (
  <div className="auth-page">
    <div className="auth-page__brand">
      <span className="auth-page__brand-logo">AgriVision</span>
      <h2 className="auth-page__brand-title">{title}</h2>
      <p className="auth-page__brand-subtitle">{subtitle}</p>
    </div>
    <div className="auth-page__form-panel">{children}</div>
  </div>
);

export default AuthLayout;
