import classes from "./../pages/Register.module.scss";

type FormInputProps = {
  //   id: string;
  //   type: string;
  //   placeholder: string;
  //   value: string;
  //   isValid: boolean;
  //   isTouched: boolean;
  //   hasError: boolean;
  //   errorMessage: string;
  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
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
  //   id,
  //   type,
  //   placeholder,
  //   value,
  //   isValid,
  //   isTouched,
  //   hasError,
  //   errorMessage,
  //   onChange,
  //   onBlur,
  id,
  type,
  placeholder,
  errorMessage,
  isInvalid,
  ...props
}) => {
  return (
    <div className={classes.inputControl}>
      <input id={id} type={type} placeholder={placeholder} {...props} />
      {props.hasError && <p>{errorMessage}</p>}
    </div>
  );
};

export default FormInput;
