import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs.js';

import PDTs from 'views/KinaseDetails/Substrates/PDTs/PDTs';
import KnownSubstrates from 'views/KinaseDetails/Substrates/KnownSubstrates/KnownSubstrates';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

const Substrates = ({ match }) => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='rose'
        tabs={[
          {
            tabName: 'Known Substrates',
            tabIcon: BugReport,
            tabContent: <KnownSubstrates match={match} />,
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
