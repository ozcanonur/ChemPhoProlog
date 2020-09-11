/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { getApi } from 'api/api';
import perturbagens from 'views/KinaseDetails/Description/variables/perturbagens';
import setSelectedInputs from 'actions/Pathway/setSelectedInputs';

import ListboxComponent from 'views/Pathway/PathwayInputs/ListBoxComponent';

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
  const inputs = useSelector((state) => state.pathwayInputs);

  useEffect(() => {
    if (type === 'Substrate') {
      getApi('/getAllSubstrates').then((res) => {
        setData(res.map((e) => Object.values(e)[0]));
      });
    } else if (type === 'Perturbagen') setData(perturbagens);
    else if (type === 'Cell Line') setData(['MCF7', 'HL60', 'NTERA']);
  }, [type]);

  const dispatch = useDispatch();
  const onInputChange = (value) => {
    let newInputs;
    if (type === 'Substrate') newInputs = { ...inputs, substrate: value };
    else if (type === 'Perturbagen') newInputs = { ...inputs, perturbagen: value };
    else if (type === 'Cell Line') newInputs = { ...inputs, cellLine: value };

    dispatch(setSelectedInputs(newInputs));
  };

  return (
    <Autocomplete
      id={type}
      style={{ width: 300 }}
      disableListWrap
      classes={classes}
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={data}
      renderInput={(params) => <TextField {...params} variant='outlined' label={type} />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onInputChange={(_e, value) => onInputChange(value)}
    />
  );
}