import React, { useState } from 'react';

import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  cardTitle: {
    float: 'left',
    padding: '10px 10px 10px 0px',
    lineHeight: '24px',
  },
  displayNone: {
    display: 'none !important',
  },
  tabsRoot: {
    minHeight: 'unset !important',
    overflowX: 'visible',
    '& $tabRootButton': {
      fontSize: '0.875rem',
    },
  },
  tabRootButton: {
    minHeight: 'unset !important',
    minWidth: 'unset !important',
    width: 'unset !important',
    height: 'unset !important',
    maxWidth: 'unset !important',
    maxHeight: 'unset !important',
    padding: '10px 15px',
    borderRadius: '3px',
    lineHeight: '24px',
    border: '0 !important',
    color: `#fff !important`,
    marginLeft: '4px',
    '&:last-child': {
      marginLeft: '0px',
    },
  },
  tabSelected: {
    backgroundColor: 'rgba(229,173,6, 1)',
    transition: '0.2s background-color 0.1s',
  },
  tabWrapper: {
    display: 'inline-block',
    minHeight: 'unset !important',
    minWidth: 'unset !important',
    width: 'unset !important',
    height: 'unset !important',
    maxWidth: 'unset !important',
    maxHeight: 'unset !important',
    fontWeight: 500,
    fontSize: '12px',
    marginTop: '1px',
    '& > svg,& > .material-icons': {
      verticalAlign: 'middle',
      margin: '-1px 5px 0 0 !important',
    },
  },
});

const CustomTabs = (props): JSX.Element => {
  const [value, setValue] = useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? <div className={cardTitle}>{title}</div> : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant='fullWidth'
          scrollButtons='auto'
        >
          {tabs.map((prop, key) => {
            let icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
};

export default CustomTabs;
