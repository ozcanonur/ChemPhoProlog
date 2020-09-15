/* eslint-disable react/self-closing-comp */
import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';

import styles from 'components/FlipCard/style';
import spiral from 'assets/img/spiral.gif';

const useStyles = makeStyles(styles);

const FlipCard = ({ content, ...rest }) => {
  const classes = useStyles();

  const { title, frontTexts } = content;
  const [frontText_1, frontText_2] = frontTexts;

  return (
    <div className={classes.card} {...rest}>
      <div className={`${classes.card_side} ${classes.card_side_front}`}>
        <div className={classes.card_picture}></div>
        <h4 className={classes.card_heading}>
          <span className={classes.card_heading_span}>{title}</span>
        </h4>
        <div className={classes.card_details}>
          <ul className={classes.ul}>
            <li className={classes.li}>{frontText_1}</li>
            <Divider />
            <li className={classes.li}>{frontText_2}</li>
            <Divider />
            <li className={classes.li}>See more</li>
          </ul>
        </div>
      </div>
      <div className={`${classes.card_side} ${classes.card_side_back}`}>
        <div className={classes.card_cta}>
          <img src={spiral} alt='Card back' style={{ width: '50rem', height: '20rem', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
