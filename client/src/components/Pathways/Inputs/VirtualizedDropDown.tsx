/* eslint-disable react/display-name */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { store } from 'index';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

import { fetchFromApi } from 'utils/api';
import perturbagens from 'variables/perturbagens';
import { setSelectedInputs } from 'actions/pathways';

import ListboxComponent from 'components/Pathways/Inputs/ListBoxComponent';

const renderGroup = (params: any) => [
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

interface Props {
  type: string;
}

const Virtualize = ({ type }: Props) => {
  const classes = useStyles();

  const [data, setData] = useState<string[]>([]);
  const inputs = store.getState().pathwayInputs;

  useEffect(() => {
    let mounted = true;

    if (type === 'Substrate') {
      fetchFromApi('/apiWeb/validObservation', {
        cellLine: inputs.cellLine,
        perturbagen: inputs.perturbagen,
      }).then((res) => {
        if (mounted && res) setData(res);
      });
    } else if (type === 'Perturbagen') setData(perturbagens);
    else if (type === 'Cell Line') setData(['MCF-7', 'HL-60', 'NTERA-2 clone D1']);

    return () => {
      mounted = false;
    };
  }, [type, inputs.cellLine, inputs.perturbagen]);

  const dispatch = useDispatch();
  const onInputChange = (value: string) => {
    let newInputs;
    if (type === 'Substrate') newInputs = { ...inputs, substrate: value };
    else if (type === 'Perturbagen') newInputs = { ...inputs, perturbagen: value };
    else if (type === 'Cell Line') newInputs = { ...inputs, cellLine: value };

    if (!newInputs) return;
    dispatch(setSelectedInputs(newInputs));
  };

  const getLabel = () => {
    if (type === 'Substrate') return `${data.length} Substrates`;
    return type;
  };

  return (
    <Autocomplete
      id={type}
      style={{ width: 300 }}
      disableListWrap
      classes={classes}
      // @ts-ignore
      ListboxComponent={ListboxComponent}
      renderGroup={renderGroup}
      options={data}
      renderInput={(params) => <TextField {...params} variant='outlined' label={getLabel()} />}
      renderOption={(option) => <Typography noWrap>{option}</Typography>}
      onInputChange={(_e, value) => onInputChange(value.split(',')[0])}
    />
  );
};

export default Virtualize;
