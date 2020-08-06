import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';
import BugReport from '@material-ui/icons/BugReport';

import PDTTabContent from 'views/KinaseDetails/Substrates/PDTs/PDTTabContent';

const PDTs = () => {
  return (
    <CustomTabs
      headerColor='rose'
      tabs={[
        {
          tabName: `MCF-7`,
          tabIcon: BugReport,
          tabContent: <PDTTabContent cell_line={'MCF-7'} />,
        },
        {
          tabName: `HL-60`,
          tabIcon: BugReport,
          tabContent: <PDTTabContent cell_line={'HL-60'} />,
        },
        {
          tabName: `NTERA-2 clone D1`,
          tabIcon: BugReport,
          tabContent: <PDTTabContent cell_line={'NTERA-2 clone D1'} />,
        },
      ]}
    />
  );
};

export default PDTs;
