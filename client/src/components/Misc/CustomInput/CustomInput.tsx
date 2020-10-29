/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import customInputStyles from './styles';

const useStyles = makeStyles(customInputStyles);

interface Props {
  formControlProps?: any;
  labelText?: string;
  id?: string;
  labelProps?: any;
  inputProps?: any;
  error?: boolean;
  success?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

const CustomInput = (props: Props): JSX.Element => {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });

  return (
    <FormControl
      {...formControlProps}
      className={`${formControlProps.className} ${classes.formControl}`}
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
