import React from "react";

const UserForm = (props) => {
  console.log("UserForm component has fired!");
  const {
    serverSuccess,
    serverFailure,
    formErrors,
    formValues,
    inputChange,
    postNewUser,
    disabled,
  } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    postNewUser();
    // submit function recieved from props
  };

  const onChange = (e) => {
    let { name, value, checked, type } = e.target;
    inputChange(name, (value = type === "checkbox" ? checked : value));
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit}>
        {serverSuccess && <h4 className="success">{serverSuccess}</h4>}
        {serverFailure && <h4 className="error">{serverFailure}</h4>}

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Type Username"
            value={formValues.username}
            onChange={onChange}
          />
          {formErrors.username && (
            <div className="validation">{formErrors.username}</div>
          )}
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input
                checked={formValues.favLanguage === "javascript"}
                onChange={onChange}
                type="radio"
                name="favLanguage"
                value="javascript"
              />
              JavaScript
            </label>
            <label>
              <input
                checked={formValues.favLanguage === "rust"}
                onChange={onChange}
                type="radio"
                name="favLanguage"
                value="rust"
              />
              Rust
            </label>
          </fieldset>
          {formErrors.favLanguage && (
            <div className="validation">{formErrors.favLanguage}</div>
          )}
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select
            value={formValues.favFood}
            onChange={onChange}
            id="favFood"
            name="favFood"
          >
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          {formErrors.favFood && (
            <div className="validation">{formErrors.favFood}</div>
          )}
        </div>

        <div className="inputGroup">
          <label>
            <input
              checked={formValues.agreement}
              onChange={onChange}
              id="agreement"
              type="checkbox"
              name="agreement"
            />
            Agree to our terms
          </label>
          {formErrors.agreement && (
            <div className="validation">{formErrors.agreement}</div>
          )}
        </div>

        <div>
          <input type="submit" disabled={!disabled} />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
