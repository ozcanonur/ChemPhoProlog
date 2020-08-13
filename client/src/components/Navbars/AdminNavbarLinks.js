import React, { useState, useEffect, useCallback } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
// core components
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { FixedSizeList } from 'react-window';

import { CallApi } from 'api/api';

const useStyles = makeStyles(styles);

const ItemRenderer = ({ data, index, style }) => {
  const item = data[index];

  return (
    <div style={style}>
      <ListItem button>
        <ListItemText primary={item} />
      </ListItem>
    </div>
  );
};

export default function AdminNavbarLinks() {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const query =
      'select distinct substrate_id as item from substrate UNION ' +
      'select distinct kinase_name as item from protein where kinase_name not null UNION ' +
      'select distinct name as item from perturbagen';

    CallApi(query).then((res) => {
      setSearchResults(res.map((e) => e.item));
    });
  }, []);

  const handleChange = useCallback((value) => {
    if (value === '') setSearchOpen(false);
    else {
      const filteredSearchResults = searchResults.filter((e) => new RegExp(value, 'i').test(e));
      setFilteredSearchResults(filteredSearchResults);
      setSearchOpen(true);
    }
  });

  return (
    <div>
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
          onBlur={() => setSearchOpen(false)}
        />
        <Button color='white' aria-label='edit' justIcon round>
          <Search />
        </Button>
        {searchOpen ? (
          <FixedSizeList
            dense
            itemData={filteredSearchResults}
            height={300}
            width={200}
            itemSize={46}
            itemCount={filteredSearchResults.length}
            style={{ backgroundColor: 'white', color: 'black' }}>
            {ItemRenderer}
          </FixedSizeList>
        ) : null}
      </div>
    </div>
  );
}
