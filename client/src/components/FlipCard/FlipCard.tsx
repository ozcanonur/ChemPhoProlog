import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';

import spiral from 'assets/img/spiral.gif';

const useStyles = makeStyles({
  card: {
    perspective: '150rem',
    '-moz-perspective': '150rem',
    position: 'relative',
    height: '20rem',
    '&:hover': {
      '& $card_side_front': {
        transform: 'rotateY(-180deg)',
      },
      '& $card_side_back': {
        transform: 'rotateY(0)',
      },
    },
  },
  card_side: {
    height: '20rem',
    transition: 'all 0.8s ease',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    'backface-visibility': 'hidden',
    'border-radius': '3px',
    overflow: 'hidden',
    'box-shadow': '0 1.5rem 4rem rgba($color-black, 0.15)',
  },
  card_side_front: {
    'background-color': '#fff',
  },
  card_side_back: {
    transform: 'rotateY(180deg)',
    backgroundImage: 'linear-gradient(60deg, #2D4159, rgba(6,119,161, 0))',
  },
  card_picture: {
    'background-size': 'cover',
    height: '5rem',
    'background-blend-mode': 'color',
    '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    'clip-path': 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
    'border-top-left-radius': '3px',
    'border-top-right-radius': '3px',

    backgroundImage: 'linear-gradient(60deg, #2D4159, rgba(6,119,161, 0))',
  },
  card_heading: {
    'font-size': '1rem',
    'text-align': 'left',
    color: '#fff',
    position: 'absolute',
    top: 0,
    left: '2rem',
    width: '100%',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    minHeight: 'auto',
    fontWeight: 300,
    textDecoration: 'none',
    '& small': {
      color: '#999',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  card_details: {
    padding: '2rem',
  },
  ul: {
    'list-style': 'none',
    width: '100%',
    margin: '0 auto',
    padding: '2rem',
  },
  li: {
    'text-align': 'center',
    'font-size': '1rem',
    padding: '0.4rem',
  },
  card_cta: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    'text-align': 'center',
  },
  card_price_box: {
    'text-align': 'center',
    color: '#fff',
    'margin-bottom': '8rem',
  },
  card_price_only: {
    'font-size': '1.4rem',
    'text-transform': 'uppercase',
  },
  card_price_value: {
    'font-size': '6rem',
    'font-weight': 100,
  },
});

interface Content {
  title: string;
  frontTexts: string[];
}

interface Props {
  content: Content;
}

const FlipCard = ({ content, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  const { title, frontTexts } = content;
  const [frontText1, frontText2] = frontTexts;

  return (
    <div className={classes.card} {...rest}>
      <div className={`${classes.card_side} ${classes.card_side_front}`}>
        <div className={classes.card_picture} />
        <h4 className={classes.card_heading}>
          <span>{title}</span>
        </h4>
        <div className={classes.card_details}>
          <ul className={classes.ul}>
            <li className={classes.li}>{frontText1}</li>
            <Divider />
            <li className={classes.li}>{frontText2}</li>
            <Divider />
            <li className={classes.li}>See more</li>
          </ul>
        </div>
      </div>
      <div className={`${classes.card_side} ${classes.card_side_back}`}>
        <div className={classes.card_cta}>
          <img
            src={spiral}
            alt='Card back'
            style={{ width: '50rem', height: '20rem', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
