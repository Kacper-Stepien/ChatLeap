import classes from "./../pages/Register.module.scss";

type FormInputProps = {
  id: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  isInvalid: boolean;
  value: string;
  hasError: boolean;
  isTouched: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  placeholder,
  errorMessage,
  isInvalid,
  hasError,
  ...props
}) => {
  return (
    <div className={classes.inputControl}>
      <input id={id} type={type} placeholder={placeholder} {...props} />
      {hasError && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
