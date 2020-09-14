/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from 'redux/store';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import getApi from 'api/api';
import perturbagens from 'variables/perturbagens';
import setSelectedInputs from 'redux/actions/Pathway/setSelectedInputs';

import ListboxComponent from 'views/Pathway/Inputs/ListBoxComponent';

const renderGroup = (params) => [
  <ListSubheader key={params.key} component='div'>
    {params.group}
  </ListSubheader>,
  params.children,
];

const useStyles = makeStyles({
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export default function Virtualize({ type }) {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const inputs = store.getState().pathwayInputs;

  useEffect(() => {
    if (type === 'Substrate') {
      const route = '/getValidObservations';
      const params = { cell_line: 'MCF-7', perturbagen: inputs.perturbagen };

      getApi(route, params).then((res) => {
        setData(res);
      });
    } else if (type === 'Perturbagen') setData(perturbagens);
    else if (type === 'Cell Line') setData(['MCF7', 'HL60', 'NTERA']);
  }, [type, inputs.perturbagen]);

  const dispatch = useDispatch();
  const onInputChange = (value) => {
    let newInputs;
    if (type === 'Substrate') newInputs = { ...inputs, substrate: value };
    else if (type === 'Perturbagen') newInputs = { ...inputs, perturbagen: value };
    else if (type === 'Cell Line') newInputs = { ...inputs, cellLine: value };

    dispatch(setSelectedInputs(newInputs));
  };

  const getLabel = (type) => {
    if (type === 'Cell Line') return 'MCF-7';
    if (type === 'Substrate') return `${data.length} Substrates`;
    return type;
  };

  return (
    <Autocomplete
      id={type}
      style={{ width: 300 }}
      disabled={type === 'Cell Line'}
      disableListWrap
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={data}
      renderInput={(params) => <TextField {...params} variant='outlined' label={getLabel(type)} />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onInputChange={(_e, value) => onInputChange(value.split(',')[0])}
    />
  );
}
