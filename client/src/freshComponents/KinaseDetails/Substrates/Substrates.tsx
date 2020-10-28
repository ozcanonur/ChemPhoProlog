import React from 'react';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

import CustomTabs from 'components/CustomTabs/CustomTabs';
import PDTs from 'freshComponents/KinaseDetails/Substrates/PDTs/';
import KnownSubstrates from 'freshComponents/KinaseDetails/Substrates/KnownSubstrates';

const Substrates = (): JSX.Element => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='success'
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
