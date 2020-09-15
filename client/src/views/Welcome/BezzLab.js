import React from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import bezzLab from 'assets/img/bezzlab_twitter.PNG';

const BezzLab = () => {
  return (
    <CardGeneric color='primary' cardTitle='BezzLab'>
      <img alt='bezzlab twitter' src={bezzLab} />
    </CardGeneric>
  );
};

export default BezzLab;
