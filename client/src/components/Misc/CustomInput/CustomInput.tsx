import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';

import customInputStyles from './styles';

const useStyles = makeStyles(customInputStyles);

interface Props {
  formControlProps?: FormControlProps;
  labelText?: string;
  id?: string;
  labelProps?: InputLabelProps;
  inputProps?: InputProps;
  error?: boolean;
  success?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const CustomInput = (props: Props) => {
  const classes = useStyles();
  const { formControlProps, labelText, id, labelProps, inputProps, error, success, onChange, onBlur, onFocus } = props;

  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });

  const formControlClassName = formControlProps?.className
    ? `${formControlProps.className} ${classes.formControl}`
    : classes.formControl;

  return (
    <FormControl
      {...formControlProps}
      className={formControlClassName}
      style={{ marginLeft: '0.5em', marginTop: 0, marginBottom: 0 }}
    >
      {labelText !== undefined ? (
        <InputLabel className={classes.labelRoot} htmlFor={id} {...labelProps}>
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        id={id}
        {...inputProps}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </FormControl>
  );
};

export default CustomInput;
