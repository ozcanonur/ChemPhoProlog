import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import getPathwayData from 'actions/Pathway/getPathwayData';
import { getApi } from 'api/api';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TrendingDown from '@material-ui/icons/TrendingDown';
import GestureSharp from '@material-ui/icons/GestureSharp';
import Healing from '@material-ui/icons/Healing';
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
  const { handleBlur, handleSelect } = data;

  const onClick = () => {
    handleCellLineChange(item);
    handleBlur();
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
  const [selected, setSelected] = useState('AKT1(S473)');

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
    setSelected(value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOpen(!searchOpen);
    }, 100);
  };

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <Button aria-label='edit' justIcon round style={{ background: 'rgba(229,173,6)', color: 'white' }}>
        <TrendingDown />
      </Button>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Substrate',
          inputProps: {
            'aria-label': 'Search',
            onFocus: () => setSearchOpen(true),
            onChange: (e) => handleChange(e.target.value),
            onBlur: () => handleBlur(),
            style: { marginLeft: '10px' },
          },
          value: selected,
        }}
      />
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{ data: filteredSearchResults, onClick: handleSubstrateChange, handleBlur, handleSelect }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{
            backgroundColor: 'white',
            color: 'black',
            position: 'absolute',
            left: '41px',
            zIndex: 5000,
          }}
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
  const [selected, setSelected] = useState('Torin');

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

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOpen(!searchOpen);
    }, 100);
  };

  const handleSelect = (value) => {
    setSelected(value);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <Button aria-label='edit' justIcon round style={{ background: 'rgba(229,173,6)', color: 'white' }}>
        <Healing />
      </Button>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Perturbagen',
          inputProps: {
            'aria-label': 'Search',
            onFocus: () => setSearchOpen(true),
            onChange: (e) => handleChange(e.target.value),
            onBlur: () => handleBlur(),
            style: { marginLeft: '10px' },
          },
          value: selected,
        }}
      />
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{
            data: filteredSearchResults,
            onClick: handlePerturbagenChange,
            handleBlur,
            handleSelect,
          }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={filteredSearchResults.length}
          style={{
            backgroundColor: 'white',
            color: 'black',
            position: 'absolute',
            left: '41px',
            zIndex: 5000,
          }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

const InputCellLine = ({ handleCellLineChange }) => {
  const classes = useStyles();

  const [searchResults, setSearchResults] = useState(['MCF7', 'HL60', 'NTERA']);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selected, setSelected] = useState('MCF7');

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleSelect = (value) => {
    setSelected(value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setSearchOpen(!searchOpen);
    }, 100);
  };

  return (
    <div className={classes.searchWrapper} style={{ position: 'relative' }}>
      <Button aria-label='edit' justIcon round style={{ background: 'rgba(229,173,6)', color: 'white' }}>
        <GestureSharp />
      </Button>
      <CustomInput
        formControlProps={{
          className: `${classes.margin} ${classes.search}`,
        }}
        inputProps={{
          placeholder: 'Cell Line',
          inputProps: {
            'aria-label': 'Search',
            onFocus: () => setSearchOpen(true),
            onChange: (e) => handleChange(e.target.value),
            onBlur: () => handleBlur(),
            style: { marginLeft: '10px' },
          },
          value: selected,
        }}
      />
      {searchOpen ? (
        <FixedSizeList
          dense
          itemData={{
            data: searchResults,
            onClick: handleCellLineChange,
            handleBlur,
            handleSelect,
          }}
          height={200}
          width='20em'
          itemSize={46}
          itemCount={3}
          style={{
            backgroundColor: 'white',
            color: 'black',
            position: 'absolute',
            left: '41px',
            zIndex: 5000,
          }}
        >
          {ItemRenderer}
        </FixedSizeList>
      ) : null}
    </div>
  );
};

const PathwayInputs = () => {
  const [inputs, setInputs] = useState({
    cellLine: 'MCF7',
    perturbagen: 'Torin',
    substrate: 'AKT1(S473)',
  });

  const [switchChecked, setSwitchChecked] = useState(false);

  const dispatch = useDispatch();
  const onGetPathwaySubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { cellLine, perturbagen, substrate } = inputs;
    dispatch(getPathwayData('MCF-7', perturbagen, substrate, switchChecked));
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

  const handleSwitch = () => {
    setSwitchChecked(!switchChecked);
  };

  return (
    <CardGeneric color='primary' cardTitle='Select inputs' cardSubtitle='Cell Line / Perturbagen / Substrate'>
      <GridContainer direction='row' justify='center'>
        <GridItem>
          <CardGeneric color='warning' cardTitle='Cell Line' headerStyle={{ padding: '0.7rem 1rem' }}>
            <InputCellLine handleCellLineChange={handleCellLineChange} />
          </CardGeneric>
        </GridItem>
        <GridItem>
          <CardGeneric color='warning' cardTitle='Perturbagen' headerStyle={{ padding: '0.7rem 1rem' }}>
            <InputPerturbagen handlePerturbagenChange={handlePerturbagenChange} />
          </CardGeneric>
        </GridItem>
        <GridItem>
          <CardGeneric color='warning' cardTitle='Substrate' headerStyle={{ padding: '0.7rem 1rem' }}>
            <InputSubstrate handleSubstrateChange={handleSubstrateChange} />
          </CardGeneric>
        </GridItem>
      </GridContainer>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onClick={() => onGetPathwaySubmit()}
          style={{
            width: '200px',
            backgroundColor: 'rgba(229,173,6)',
            color: 'white',
            height: '50px',
          }}
        >
          Get pathway
        </Button>
        <FormControlLabel
          control={
            <Switch checked={switchChecked} onChange={handleSwitch} name='onlyKinaseEnds' color='primary' />
          }
          label='Kinase ends only'
          style={{ marginLeft: '10px' }}
        />
      </div>
    </CardGeneric>
  );
};

export default PathwayInputs;
