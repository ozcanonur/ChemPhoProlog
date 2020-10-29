import React from 'react';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

import CustomTabs from 'components/Misc/CustomTab/CustomTabs';
import PDTs from 'components/KinaseDetails/Substrates/PDTs/';
import KnownSubstrates from 'components/KinaseDetails/Substrates/KnownSubstrates';

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
