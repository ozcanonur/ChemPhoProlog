import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import getPathwayData from 'actions/Pathway/getPathwayData';
import { getApi } from 'api/api';

import Button from 'components/CustomButtons/Button';
import CustomInput from 'components/CustomInput/CustomInput';
import CardGeneric from 'components/Card/CardGeneric';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import perturbagens from 'views/KinaseDetails/Description/variables/perturbagens';

import makeStyles from '@material-ui/core/styles/makeStyles';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle';

const useStyles = makeStyles(styles);

const ItemRenderer = ({ data, index, style }) => {
  const item = data.data[index];

  const handleCellLineChange = data.onClick;
  const { onBlur, handleSelect } = data;

  const onClick = () => {
    handleCellLineChange(item);
    onBlur();
    handleSelect(item);
  };

  return (
    <div style={style}>
      <ListItem button style={{ color: 'black' }} onClick={() => onClick()}>
        <ListItemText primary={item} />
      </ListItem>
    </div>
  );
};

const InputSubstrate = ({ handleSubstrateChange }) => {
  const classes = useStyles();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);

  useEffect(() => {
    getApi('/getAllSubstrates').then((res) => {
      const values = res.map((e) => Object.values(e)[0]);
      setSearchResults(values);
      setFilteredSearchResults(values);
    });
  }, []);

  const handleChange = (value) => {
    if (value === '') setSearchOpen(false);
    else {
      const filteredSearchResults = searchResults.filter(
        (e) => e.toLowerCase().indexOf(value.toLowerCase()) === 0
      );

      setFilteredSearchResults(filteredSearchResults);
      setSearchOpen(true);
    }
  };

  const onBlur = () => {
    setSearchOpen(false);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Substrate',
          inputProps: {
            'aria-label': 'Search',
          },
          // defaultValue: 'AKT1(S473)',
        }}
        onFocus={() => setSearchOpen(true)}
        onChange={(e) => handleChange(e.target.value)}
      />
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{ data: filteredSearchResults, onClick: handleSubstrateChange, onBlur }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{ backgroundColor: 'white', color: 'black', position: 'absolute', zIndex: 5000 }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

const InputPerturbagen = ({ handlePerturbagenChange }) => {
  const classes = useStyles();

  const [searchOpen, setSearchOpen] = useState(false);
  const [filteredSearchResults, setFilteredSearchResults] = useState(perturbagens);
  const [selected, setSelected] = useState('');

  const handleChange = (value) => {
    if (value === '') setSearchOpen(false);
    else {
      const filteredSearchResults = perturbagens.filter(
        (e) => e.toLowerCase().indexOf(value.toLowerCase()) === 0
      );

      setFilteredSearchResults(filteredSearchResults);
      setSearchOpen(true);
    }
    setSelected(value);
  };

  const onBlur = () => {
    setSearchOpen(false);
  };

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Perturbagen',
          inputProps: {
            'aria-label': 'Search',
          },
          value: selected,
        }}
        onFocus={() => setSearchOpen(true)}
        onChange={(e) => handleChange(e.target.value)}
      />

      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{ data: filteredSearchResults, onClick: handlePerturbagenChange, onBlur, handleSelect }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{ backgroundColor: 'white', color: 'black', position: 'absolute', zIndex: 5000 }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

const InputCellLine = ({ handleCellLineChange }) => {
  const classes = useStyles();

  const [searchOpen, setSearchOpen] = useState(false);

  const onBlur = () => {
    setSearchOpen(false);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Cell Line',
          inputProps: {
            'aria-label': 'Search',
          },
          defaultValue: 'MCF7',
        }}
        onFocus={() => setSearchOpen(true)}
      />
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{ data: ['MCF7', 'HL60', 'NTERA'], onClick: handleCellLineChange, onBlur }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={3}
          style={{ backgroundColor: 'white', color: 'black', position: 'absolute', zIndex: 5000 }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

const PathwayInputs = () => {
  const [inputs, setInputs] = useState({ cellLine: 'MCF7', perturbagen: 'Torin', substrate: 'AKT1(S473)' });

  const dispatch = useDispatch();
  const onGetPathwaySubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { cellLine, perturbagen, substrate } = inputs;
    dispatch(getPathwayData('MCF-7', perturbagen, substrate));
  };

  const handleCellLineChange = (selection) => {
    const newInputs = { ...inputs };
    newInputs.cellLine = selection;
    setInputs(newInputs);
  };

  const handlePerturbagenChange = (selection) => {
    const newInputs = { ...inputs };
    newInputs.perturbagen = selection;
    setInputs(newInputs);
  };

  const handleSubstrateChange = (selection) => {
    const newInputs = { ...inputs };
    newInputs.substrate = selection;
    setInputs(newInputs);
  };

  console.log(inputs);

  return (
    <CardGeneric color='primary' cardTitle='Select inputs' cardSubtitle='Cell Line / Perturbagen / Substrate'>
      <GridContainer direction='row'>
        <GridItem>
          <InputCellLine handleCellLineChange={handleCellLineChange} />
          <InputPerturbagen handlePerturbagenChange={handlePerturbagenChange} />
          <InputSubstrate handleSubstrateChange={handleSubstrateChange} />
        </GridItem>
        <GridItem>
          <Button
            onClick={() => onGetPathwaySubmit()}
            style={{
              width: '100px',
              backgroundColor: 'rgba(45,65,89, 0.7)',
            }}
          >
            Get pathway
          </Button>
        </GridItem>
      </GridContainer>
    </CardGeneric>
  );
};

export default PathwayInputs;
