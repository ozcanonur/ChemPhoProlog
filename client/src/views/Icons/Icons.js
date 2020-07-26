/*eslint-disable*/
import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
// core components
import GridItem from 'views/Welcome/node_modules/components/Grid/GridItem.js.js';
import GridContainer from 'views/Welcome/node_modules/components/Grid/GridContainer.js.js';
import Card from 'views/Welcome/node_modules/components/Card/Card.js.js';
import CardHeader from 'views/Welcome/node_modules/components/Card/CardHeader.js.js';
import CardBody from 'views/Welcome/node_modules/components/Card/CardBody.js.js';

import styles from 'assets/jss/material-dashboard-react/views/iconsStyle.js';

const useStyles = makeStyles(styles);

export default function Icons() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color='primary'>
            <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
            <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{' '}
              <a href='https://design.google.com/icons/?ref=creativetime' target='_blank'>
                Google
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <Hidden only={['sm', 'xs']}>
              <iframe
                className={classes.iframe}
                src='https://material.io/icons/'
                title='Icons iframe'
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={['lg', 'md']}>
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since the iframe
                  is not working on Mobile and Tablets please visit the icons on their
                  original page on Google. Check the
                  <a
                    href='https://design.google.com/icons/?ref=creativetime'
                    target='_blank'
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
