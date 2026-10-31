/**
 * Reusable labeled input with inline validation error display.
 * `registration` is the spread of react-hook-form's register(name, rules) return.
 */
const FormField = ({ id, label, type = 'text', registration, error, ...rest }) => (
  <div className="form-field">
    <label className="form__label" htmlFor={id}>
      {label}
    </label>
    <input id={id} type={type} className="form__input" {...registration} {...rest} />
    {error && <span className="form__error">{error.message}</span>}
  </div>
);

export default FormField;
