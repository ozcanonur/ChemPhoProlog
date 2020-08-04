import React from 'react';

import CustomTabs from 'components/CustomTabs/CustomTabs.js';

import PDTs from 'views/KinaseDetails/KnownSubstrates/PDTs';
import KnownSubstratesTable from 'views/KinaseDetails/KnownSubstrates/KnownSubstratesTable';

import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';

const KnownPerturbagens = ({ match }) => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='rose'
        tabs={[
          {
            tabName: 'Known Substrates',
            tabIcon: BugReport,
            tabContent: <KnownSubstratesTable match={match} />,
          },
          {
            tabName: 'PDTs',
            tabIcon: Code,
            tabContent: <PDTs match={match} />,
          },
        ]}
      />
    </div>
  );
};

export default KnownPerturbagens;
