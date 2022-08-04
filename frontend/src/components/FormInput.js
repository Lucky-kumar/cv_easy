import { useState } from "react";
import "./styles/FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="fi_label">{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        id={inputProps.name}
        focused={focused.toString()}
        className="fi_input"
      />
      <span className="fi_span">{errorMessage}</span>
    </div>
  );
};

export default FormInput;