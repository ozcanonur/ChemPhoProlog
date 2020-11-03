import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Search from '@material-ui/icons/Search';
import Healing from '@material-ui/icons/Healing';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PanoramaHorizontal from '@material-ui/icons/PanoramaHorizontal';
import TrendingDown from '@material-ui/icons/TrendingDown';

import { fetchFromApi } from 'utils/api';
import CustomInput from 'components/Misc/CustomInput/CustomInput';
import Button from 'components/Misc/CustomButton/Button';
import perturbagens from 'variables/perturbagens';
import { addSidebarRoute } from 'actions/main';
import { filterSearchResults } from './helpers';
import styles from './styles/globalSearch';

const useStyles = makeStyles(styles);

const ItemRenderer = ({ data, index, style }: any) => {
  const { setSearchOpen } = data;
  const item = data.data[index];
  const itemName = item[Object.keys(item)[0]];
  const itemType = Object.keys(item)[0];

  let redirectTo = `/${itemName}/description`;
  let itemIcon;
  if (itemType === 'kinase') itemIcon = <PanoramaHorizontal />;
  else if (itemType === 'perturbagen') itemIcon = <Healing />;
  else {
    itemIcon = <TrendingDown />;
    redirectTo = '#';
  }

  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch(addSidebarRoute(itemType, itemName));
    setSearchOpen(false);
  };

  return (
    <div style={style}>
      <Link to={redirectTo}>
        <ListItem button onClick={handleSelect} style={{ color: 'black' }}>
          <ListItemIcon>{itemIcon}</ListItemIcon>
          <ListItemText primary={itemName} />
        </ListItem>
      </Link>
    </div>
  );
};

interface SearchResult {
  [key: string]: string;
}

const GlobalSearch = () => {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  // Fetch the data on first focus
  const handleFocus = async () => {
    setSearchOpen(true);
    if (searchResults.length > 0) return;

    const apiResults = await Promise.all([fetchFromApi('/apiWeb/getAllKinases'), fetchFromApi('/apiWeb/getAllSubstrates')]);
    const perturbagenResults = perturbagens.map((perturbagen) => {
      return { perturbagen };
    });

    setSearchResults([...apiResults.flat(), ...perturbagenResults]);
  };

  const handleChange = (value: string) => {
    if (value === '') setSearchOpen(false);
    else {
      const filtered = filterSearchResults(searchResults, value);

      setFilteredSearchResults(filtered);
      setSearchOpen(true);
    }
  };

  // Hacky fix with timeout or doesn't fire the click inside
  const handleBlur = () => {
    setTimeout(() => {
      setSearchOpen(false);
    }, 100);
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
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
            onFocus: handleFocus,
            onBlur: handleBlur,
          },
        }}
      />
      <Button aria-label='edit' justIcon round className={classes.button}>
        <Search />
      </Button>
      {searchOpen && filteredSearchResults.length !== 0 ? (
        <FixedSizeList
          itemData={{ data: filteredSearchResults, setSearchOpen }}
          height={300}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          className={classes.fixedSizeList}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

export default GlobalSearch;
