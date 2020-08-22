import React, { useState, useEffect } from 'react';
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

import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';

import { CallApi } from 'api/api';
import { addSidebarRouteKinase } from 'actions/Sidebar/addSidebarRouteKinase';
import { addSidebarRoutePerturbagen } from 'actions/Sidebar/addSidebarRoutePerturbagen';

import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { makeStyles } from '@material-ui/core/styles';
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

export default function AdminNavbarLinks() {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const perturbagenQuery = 'select distinct name as perturbagen from perturbagen';
    const kinaseQuery =
      'select distinct kinase_name as kinase from protein where kinase_name not null';
    const substrateQuery = 'select distinct substrate_id as substrate from substrate';

    Promise.all([CallApi(perturbagenQuery), CallApi(kinaseQuery), CallApi(substrateQuery)]).then(
      (results) => {
        setSearchResults(results.flat());
      }
    );
  }, []);

  const handleChange = (value) => {
    if (value === '') setSearchOpen(false);
    else {
      const filteredSearchResults = searchResults.filter((e) => {
        return e[Object.keys(e)[0]].toString().toLowerCase().indexOf(value.toLowerCase()) === 0;
      });

      setFilteredSearchResults(filteredSearchResults);
      setSearchOpen(true);
    }
  };

  return (
    <div className={classes.searchWrapper}>
      <CustomInput
        formControlProps={{
          className: classes.margin + ' ' + classes.search,
        }}
        inputProps={{
          placeholder: 'Search',
          inputProps: {
            'aria-label': 'Search',
          },
        }}
        onChange={(e) => handleChange(e.target.value)}
        //onBlur={() => setSearchOpen(false)}
      />
      <Button color='white' aria-label='edit' justIcon round>
        <Search />
      </Button>
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={filteredSearchResults}
          height={300}
          width={'20em'}
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{ backgroundColor: 'white', color: 'black' }}>
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
}
