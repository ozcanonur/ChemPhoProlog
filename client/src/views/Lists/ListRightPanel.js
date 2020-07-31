import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

import { Typography } from '@material-ui/core';
import Button from 'components/CustomButtons/Button';

const useStyles = makeStyles(styles);

const ListRightPanel = (props) => {
  const classes = useStyles();

  const {
    topHeaderTitle,
    topHeaderSubTitle,
    selectedEleTitle,
    selectedEleDetailsBody,
    selectedEleDetailsBottomBody,
  } = props;

  return (
    <Card>
      <CardHeader color='primary'>
        <h4 className={classes.cardTitleWhite}>{topHeaderTitle}</h4>
        <p className={classes.cardCategoryWhite}>{topHeaderSubTitle}</p>
      </CardHeader>
      <CardBody>
        <GridContainer direction='column'>
          <GridItem>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>{selectedEleTitle}</h4>
              </CardHeader>
              <CardBody>{selectedEleDetailsBody}</CardBody>
            </Card>
          </GridItem>
          <GridItem>{selectedEleDetailsBottomBody}</GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default ListRightPanel;
