import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';

import spiral from 'assets/img/spiral.gif';
import flipCardStyles from './styles';

const useStyles = makeStyles(flipCardStyles);

interface Content {
  title: string;
  frontTexts: string[];
}

interface Props {
  content: Content;
}

const FlipCard = ({ content, ...rest }: Props) => {
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
          <img src={spiral} alt='Card back' className={classes.img} />
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
