import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Table from 'components/Table/Table';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';

import { Typography } from '@material-ui/core';

const useStyles = makeStyles(styles);

const PDTTable = ({ tableData }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <GridContainer direction='row'>
      <GridItem md>
        <Card>
          <CardHeader color='warning'>
            <h4 className={classes.cardTitleWhite}>Putative Downstream Targets</h4>
            <p className={classes.cardCategoryWhite}>Select a substrate</p>
          </CardHeader>
          <CardBody>
            <Table
              className='my-node'
              tableHeaderColor='warning'
              tableHead={['Substrate', 'Source', 'Confidence', '']}
              tableData={tableData}
              rowsPerPage={10}
              rowEndArrow={true}
              currentPage={currentPage}
              handleChangePage={handleChangePage}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem md>
        <Card>
          <CardHeader color='primary'>
            <h4 className={classes.cardTitleWhite}>Substrate specification</h4>
            <p className={classes.cardCategoryWhite}>Details</p>
          </CardHeader>
          <CardBody>
            <Typography variant='body1'>
              The diverse and highly complex nature of modern phosphoproteomics research produces a
              high volume of data. Chemical phosphoproteomics especially, is amenable to a variety
              of analytical approaches. In this study we propose novel logic-based algorithms that
              overcome the limitations of existing tools used for analysis of these types of
              datasets. Initially we developed a first order deductive, logic-based model and
              populated it with a scoring system, with which we were able to expand from its
              initially Boolean nature. This allowed us to identify 16 previously unreported
              inhibitor-kinase relationships which could offer novel therapeutic targets for further
              investigation. We also present the model and its findings in a human readable and 18
              explanation-integrated manner. This offers an open-source model blueprint to act as a
              resource 19 for its application in more and diverse data sets.
            </Typography>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default PDTTable;
