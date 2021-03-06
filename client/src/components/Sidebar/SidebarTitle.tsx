import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import sidebarStyles from './styles/sidebarStyles';

const useStyles = makeStyles(sidebarStyles);

interface Props {
  title: string;
  logo: string;
}

const SidebarTitle = ({ title, logo }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.logo}>
      <div className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {title}
      </div>
    </div>
  );
};

export default SidebarTitle;
