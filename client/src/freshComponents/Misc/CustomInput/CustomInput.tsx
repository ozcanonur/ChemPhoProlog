/* eslint-disable no-nested-ternary */
import React from 'react';
import classNames from 'classnames';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  disabled: {
    '&:before': {
      backgroundColor: 'transparent !important',
    },
  },
  underline: {
    '&:hover:not($disabled):before,&:before': {
      borderColor: `#D2D2D2 !important`,
      borderWidth: '1px !important',
    },
    '&:after': {
      borderColor: '#001233',
    },
  },
  underlineError: {
    '&:after': {
      borderColor: '#001233',
    },
  },
  underlineSuccess: {
    '&:after': {
      borderColor: '#2D4159',
    },
  },
  labelRoot: {
    color: `#AAAAAA !important`,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.42857',
    letterSpacing: 'unset',
  },
  labelRootSuccess: {
    color: '#2D4159',
  },
  feedback: {
    position: 'absolute',
    top: '18px',
    right: '0',
    zIndex: 2,
    display: 'block',
    width: '24px',
    height: '24px',
    textAlign: 'center',
  },
  marginTop: {
    marginTop: '16px',
  },
  formControl: {
    paddingBottom: '10px',
    margin: '27px 0 0 0',
    position: 'relative',
    verticalAlign: 'unset',
  },
});

const CustomInput = (props): JSX.Element => {
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

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: error,
    [` ${classes.labelRootSuccess}`]: success && !error,
  });

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
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
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

      {error ? (
        <Clear className={`${classes.feedback} ${classes.labelRootError}`} />
      ) : success ? (
        <Check className={`${classes.feedback} ${classes.labelRootSuccess}`} />
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
