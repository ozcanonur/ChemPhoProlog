import React from 'react';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import Code from '@material-ui/icons/Code';

import CustomTabs from 'components/Misc/CustomTabs/CustomTabs';
import PDTs from 'components/KinaseDetails/Substrates/PDTs/PDTs';
import KnownSubstrates from 'components/KinaseDetails/Substrates/KnownSubstrates';

const Substrates = () => {
  return (
    <div style={{ padding: '2em' }}>
      <CustomTabs
        headerColor='success'
        tabs={[
          {
            tabName: 'Known Substrates',
            tabIcon: TrendingDownIcon,
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
