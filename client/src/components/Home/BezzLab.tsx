import React from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import bezzLab from 'assets/img/bezzlab_twitter.png';

const BezzLab = () => {
  return (
    <CardGeneric color='primary' cardTitle='BezzLab'>
      <img alt='bezzlab twitter' src={bezzLab} />
    </CardGeneric>
  );
};

export default BezzLab;
