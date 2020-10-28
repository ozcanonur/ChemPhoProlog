import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import sidebarStyles from './sidebarStyles';

const useStyles = makeStyles(sidebarStyles);

interface Props {
  title: string;
  logo: string;
}

const SidebarTitle = ({ title, logo }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.logo}>
      <a href='# ' className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt='logo' className={classes.img} />
        </div>
        {title}
      </a>
    </div>
  );
};

export default SidebarTitle;
