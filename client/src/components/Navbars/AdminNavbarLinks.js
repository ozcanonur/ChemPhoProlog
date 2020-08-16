import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import { Healing, PanoramaHorizontal, TrendingDown } from '@material-ui/icons';

import { CallApi } from 'api/api';
import { AppContext } from 'views/App';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

const ItemRenderer = ({ data, index, style }) => {
  const item = data[index];
  const itemName = item[Object.keys(item)[0]];
  const itemType = Object.keys(item)[0];

  const context = useContext(AppContext);

  let redirectTo = `/home/${itemName}/description`;
  let selectCallBack = null;
  let itemIcon;
  if (itemType === 'kinase') {
    itemIcon = <PanoramaHorizontal />;
    selectCallBack = context.kinaseListContext.handleAdd;
  } else if (itemType === 'perturbagen') {
    itemIcon = <Healing />;
    selectCallBack = context.perturbagenListContext.handleAdd;
  } else {
    itemIcon = <TrendingDown />;
    redirectTo = '#';
  }

  const handleSelect = () => {
    if (itemType === 'kinase' || itemType === 'perturbagen') {
      selectCallBack(itemName);
    }
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
