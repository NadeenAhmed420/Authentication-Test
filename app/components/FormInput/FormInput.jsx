import {TextField } from "@mui/material";
import styles from "./FormInput.module.css";

function FormInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  label,
  placeholder,
  size,
  shrink,
  type = "text",
  disabled = false,
  error,
  helperText,
  isInvalid,
}) {

  return (
    <TextField
      id={id}
      name={name}
      type={type}
      label={label}
      value={value || ""}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      size={size}
      fullWidth
      disabled={disabled}
      error={isInvalid || error}
      helperText={helperText}
      className={` ${styles.formControl}  position-relateive mb-1`}
      InputProps={{
        classes: {
          root: styles.inputRoot,
          input: styles.inputText,
        },
      }}
      InputLabelProps={{
        shrink: shrink,
        className: styles.inputLabel,
      }}
      placeholder={placeholder}
      FormHelperTextProps={{
        className: styles.helperText
      }}
    />
  );
}

export default FormInput;
