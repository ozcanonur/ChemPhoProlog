import React from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Typography from '@material-ui/core/Typography';

const TopText = () => {
  return (
    <CardGeneric color='primary' cardTitle='What is ChemPhoProlog?'>
      <Typography variant='body1'>
        We apply logic modelling to automatically interpret the results of large
        scale chemical phosphoproteomics experiments. This web site allows you
        to browse the findings from this work, and the experimental data and
        background knowledge used to derive these findings. See the panels below
        for more information about what you can do here.
      </Typography>
    </CardGeneric>
  );
};

export default TopText;
