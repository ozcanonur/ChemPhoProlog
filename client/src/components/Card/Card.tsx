import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  card: {
    border: '0',
    marginBottom: '15px',
    marginTop: '30px',
    borderRadius: '6px',
    color: `rgba(0,0,0, 0.87)`,
    background: '#fff',
    width: '100%',
    boxShadow: `0 1px 4px 0 rgba(0,0,0, 0.14)`,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
  },
});

interface Props {
  [x: string]: any;
}

const Card = (props: Props): JSX.Element => {
  const classes = useStyles();

  const { children, ...rest } = props;

  return (
    <div className={classes.card} {...rest}>
      {children}
    </div>
  );
};

export default Card;
