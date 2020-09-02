import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Search from '@material-ui/icons/Search';
import Healing from '@material-ui/icons/Healing';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import TrendingDown from '@material-ui/icons/TrendingDown';

import CustomInput from 'components/CustomInput/CustomInput';
import Button from 'components/CustomButtons/Button';

import { CallApi } from 'api/api';
import addSidebarRouteKinase from 'actions/Sidebar/addSidebarRouteKinase';
import addSidebarRoutePerturbagen from 'actions/Sidebar/addSidebarRoutePerturbagen';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);

const ItemRenderer = ({ data, index, style }) => {
  const item = data[index];
  const itemName = item[Object.keys(item)[0]];
  const itemType = Object.keys(item)[0];

  let redirectTo = `/home/${itemName}/description`;
  let itemIcon;
  if (itemType === 'kinase') {
    itemIcon = <PanoramaHorizontal />;
  } else if (itemType === 'perturbagen') {
    itemIcon = <Healing />;
  } else {
    itemIcon = <TrendingDown />;
    redirectTo = '#';
  }

  const dispatch = useDispatch();
  const handleSelect = () => {
    if (itemType === 'kinase') dispatch(addSidebarRouteKinase(itemName));
    else if (itemType === 'perturbagen') dispatch(addSidebarRoutePerturbagen(itemName));
  };

  // TODO POINTER EVENTS DOESNT WORK (ONCLICK BECAUSE OF ONBLUR FALSE OR SMTH)
  return (
    <div style={style}>
      <Link to={redirectTo}>
        <ListItem button onClick={() => handleSelect()} style={{ color: 'black' }}>
          <ListItemIcon>{itemIcon}</ListItemIcon>
          <ListItemText primary={itemName} />
        </ListItem>
      </Link>
    </div>
  );
};

const AdminNavbarLinks = () => {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleChange = (value) => {
    if (value === '') setSearchOpen(false);
    else {
      const filteredSearchResults = searchResults.filter(
        (e) => e[Object.keys(e)[0]].toString().toLowerCase().indexOf(value.toLowerCase()) === 0
      );

      setFilteredSearchResults(filteredSearchResults);
      setSearchOpen(true);
    }
  };

  const handleFocus = () => {
    setSearchOpen(true);

    // Load the data on first focus
    if (searchResults.length === 0) {
      const perturbagenQuery = 'select distinct name as perturbagen from perturbagen';
      const kinaseQuery = 'select distinct kinase_name as kinase from protein where kinase_name not null';
      const substrateQuery = 'select distinct substrate_id as substrate from substrate';

      (async () => {
        const results = await Promise.all([CallApi(perturbagenQuery), CallApi(kinaseQuery), CallApi(substrateQuery)]);
        setSearchResults(results.flat());
      })();
    }
  };

  return (
    <div className={classes.searchWrapper}>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: searchOpen && searchResults.length === 0 ? 'Loading...' : 'Search',
          inputProps: {
            'aria-label': 'Search',
          },
        }}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => handleFocus()}
        onBlur={() => setSearchOpen(false)}
      />
      <Button aria-label='edit' justIcon round style={{ background: 'rgba(229,173,6)', color: 'white' }}>
        <Search />
      </Button>
      {searchOpen && filteredSearchResults.length !== 0 ? (
        <FixedSizeList
          dense
          itemData={filteredSearchResults}
          height={300}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

export default AdminNavbarLinks;
