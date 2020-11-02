// @ts-nocheck
import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from 'components/Misc/Card/Card';
import CardBody from 'components/Misc/Card/CardBody';
import CardHeader from 'components/Misc/Card/CardHeader';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

import customTabsStyles from './styles';

const useStyles = makeStyles(customTabsStyles);

interface ITab {
  tabName: string;
  tabIcon: OverridableComponent<SvgIconTypeMap>;
  tabContent: JSX.Element;
}

interface Props {
  headerColor: string;
  plainTabs?: boolean;
  title?: string;
  tabs: ITab[];
}

const CustomTab = (props: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: Event, index: number) => {
    setValue(index);
  };

  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
  });

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title ? <div className={cardTitle}>{title}</div> : undefined}
        <Tabs
          value={value}
          // @ts-ignore
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone,
          }}
          variant='fullWidth'
          scrollButtons='auto'
        >
          {tabs.map((tab) => {
            let icon = {};
            if (tab.tabIcon) {
              icon = {
                icon: <tab.tabIcon />,
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper,
                }}
                key={tab.tabName}
                label={tab.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((tab, key) => {
          if (key === value) {
            return <div key={tab.tabName}>{tab.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
};

export default CustomTab;
