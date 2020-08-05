import React, { useEffect, useState } from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';

import BugReport from '@material-ui/icons/BugReport';

import PDTTable from 'views/KinaseDetails/KnownSubstrates/PDTTable';
import { CallApi } from 'api/api';

import { pick } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const PDTs = ({ match }) => {
  const classes = useStyles();

  const kinase = match.url.split('/')[2];

  const [knownSubstrateData, setKnownSubstrateData] = useState([]);

  useEffect(() => {
    let mounted = true;

    const kinaseQuery = `select substrate, source, cell_line, confidence from KS_relationship where kinase="${kinase}" and source="PDT" order by substrate`;

    CallApi(kinaseQuery).then((res) => {
      if (mounted) {
        setKnownSubstrateData(res);
      }
    });

    return function cleanUp() {
      mounted = false;
    };
  }, [kinase]);

  const createTableDataByCellLine = (data, cell_line) => {
    const dataByCellLine = data.filter((e) => e.cell_line === cell_line);
    return dataByCellLine
      .map((e) => pick(e, ['substrate', 'source', 'confidence']))
      .map(Object.values);
  };

  const tableData_MCF7 = createTableDataByCellLine(knownSubstrateData, 'MCF-7');
  const tableData_HL60 = createTableDataByCellLine(knownSubstrateData, 'HL-60');
  const tableData_NTERA = createTableDataByCellLine(knownSubstrateData, 'NTERA-2 clone D1');

  return (
    <CustomTabs
      headerColor='rose'
      tabs={[
        {
          tabName: `MCF-7 (${tableData_MCF7.length})`,
          tabIcon: BugReport,
          tabContent: <PDTTable tableData={tableData_MCF7} />,
        },
        {
          tabName: `HL-60 (${tableData_HL60.length})`,
          tabIcon: BugReport,
          tabContent: <PDTTable tableData={tableData_HL60} />,
        },
        {
          tabName: `NTERA-2 clone (${tableData_NTERA.length})`,
          tabIcon: BugReport,
          tabContent: <PDTTable tableData={tableData_NTERA} />,
        },
      ]}
    />
  );
};

export default PDTs;
