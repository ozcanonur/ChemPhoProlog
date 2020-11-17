import React from 'react';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Code from '@material-ui/icons/Code';

import CustomTabs from 'components/Misc/CustomTabs/CustomTabs';
import PDTs from 'components/KinaseDetails/Substrates/PDTs';
import KnownSubstrates from './KnownSubstrates';

const Substrates = () => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='success'
        tabs={[
          {
            tabName: 'PDTs',
            tabIcon: Code,
            tabContent: <PDTs />,
          },
          {
            tabName: 'Known Substrates',
            tabIcon: TrendingDownIcon,
            tabContent: <KnownSubstrates />,
          },
        ]}
      />
    </div>
  );
};

export default Substrates;
