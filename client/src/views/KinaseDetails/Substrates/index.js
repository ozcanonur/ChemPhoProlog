import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs';

import PDTs from 'views/KinaseDetails/Substrates/PDTs/';
import KnownSubstrates from 'views/KinaseDetails/Substrates/KnownSubstrates/';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

const Substrates = () => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='danger'
        tabs={[
          {
            tabName: 'Known Substrates',
            tabIcon: BugReport,
            tabContent: <KnownSubstrates />,
          },
          {
            tabName: 'PDTs',
            tabIcon: Code,
            tabContent: <PDTs />,
          },
        ]}
      />
    </div>
  );
};

export default Substrates;
