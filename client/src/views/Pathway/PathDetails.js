/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Table from 'components/Table/Table';

import phosphatases from 'views/Pathway/variables/phosphatases';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

// Should only work for KPa endings for now
const getExplanation = (path, observation, regulatory) => {
  const outputList = [];
  let prevBottomKPaActivity = 'inhibited';
  for (let i = 0; i < path.length; i += 2) {
    const topKPa = path[i];
    const midPhosphosite = path[i + 1];
    const bottomKPa = path[i + 2];

    const topKPaActivity = prevBottomKPaActivity;
    const topKPaFunction = phosphatases.includes(topKPa) ? 'dephosphorylates' : 'phosphorylates';

    const foldChange = observation[midPhosphosite].fold_change;
    const reg = regulatory[midPhosphosite];

    const bottomKPaActivated = (foldChange > 0 && reg === 'p_inc') || (foldChange < 0 && reg === 'p_dec');
    const bottomKPaInhibited = (foldChange > 0 && reg === 'p_dec') || (foldChange < 0 && reg === 'p_inc');
    const bottomKPaActivity = bottomKPaActivated ? 'activated' : bottomKPaInhibited ? 'inhibited' : 'conflicting';

    const topKPaOutput = `${topKPa} is ${topKPaActivity}, (${topKPaFunction})`;
    const midPhosphositeOutput = `${midPhosphosite}, fc: ${foldChange}, reg: ${reg}`;
    const bottomKPaOutput = `${bottomKPa} is ${bottomKPaActivity}`;

    const isEnd = i === path.length - 2;

    const output = isEnd
      ? [topKPaOutput, midPhosphositeOutput, '']
      : [topKPaOutput, midPhosphositeOutput, bottomKPaOutput];

    outputList.push(output);

    prevBottomKPaActivity = bottomKPaActivity;
  }

  return outputList;
};

const PathDetails = ({ data, selectedPath }) => {
  const classes = useStyles();

  const [currentPage, setCurrentPage] = useState(0);

  const reversedPath = selectedPath.slice().reverse();
  const explanation = getExplanation(reversedPath, data.observation, data.regulatory);

  // const StartExplanation = () => (selectedPath.length !== 0 ? <div>{`Torin inhibits ${reversedPath[0]}`}</div> : null);

  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Card style={{ height: 650 }}>
      <CardHeader color='info'>
        <h4 className={classes.cardTitleWhite}>Explanation</h4>
        <p className={classes.cardCategoryWhite}>Torin</p>
      </CardHeader>
      <CardBody>
        <Table
          className='my-node'
          tableHeaderColor='warning'
          tableHead={['Start', 'Phosphosite', 'End']}
          tableData={explanation}
          rowsPerPage={8}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
        />
      </CardBody>
    </Card>
  );
};

export default PathDetails;
