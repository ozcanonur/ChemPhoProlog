import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import LayersIcon from '@material-ui/icons/Layers';
import Healing from '@material-ui/icons/Healing';

import perturbagens from 'variables/perturbagens';
import { fetchFromApi } from 'utils/api';
import { setSelectedInputs } from 'actions/pathways';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '15rem',
    },
    list: {
      maxHeight: '30rem',
    },
    inputLabel: {
      display: 'flex',
      alignItems: 'center',

      '& > svg': {
        width: '0.85em',
        height: '0.85em',
      },
    },
    labelText: {
      marginLeft: '0.5rem',
    },
  })
);

interface Props {
  type: string;
}

const convertTypeToVariableName = (type: string) => {
  if (type === 'Substrate') return 'substrate';
  if (type === 'Perturbagen') return 'perturbagen';
  if (type === 'Cell Line') return 'cellLine';
  return '';
};

const SelectMenu = ({ type }: Props) => {
  const classes = useStyles();

  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const inputs = useSelector((state: RootState) => state.pathwayInputs);

  const variableName = convertTypeToVariableName(type);

  useEffect(() => {
    let mounted = true;

    if (type === 'Substrate' && inputs.cellLine) {
      fetchFromApi('/apiWeb/validObservation', {
        cellLine: inputs.cellLine,
        perturbagen: inputs.perturbagen,
      }).then((res) => {
        console.log(res);
        if (mounted && res) setData(res);
      });
    } else if (type === 'Perturbagen') {
      if (mounted) setData(perturbagens);
    } else if (type === 'Cell Line') {
      if (mounted) setData(['MCF-7', 'HL-60', 'NTERA-2 clone D1']);
    }

    return () => {
      mounted = false;
    };
  }, [type, inputs.cellLine, inputs.perturbagen]);

  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newInputs = { ...inputs, [variableName]: e.target.value };
    dispatch(setSelectedInputs(newInputs));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const menuData = type === 'Substrate' ? Object.keys(data) : data;

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>
          {type === 'Cell Line' ? (
            <LayersIcon />
          ) : type === 'Perturbagen' ? (
            <Healing />
          ) : type === 'Substrate' ? (
            <TrendingDownIcon />
          ) : null}
          <div className={classes.labelText}>{`${type} (${menuData.length.toString()})`}</div>
        </InputLabel>
        <Select
          MenuProps={{ className: classes.list }}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={variableName ? inputs[variableName] : ''}
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {type === 'Substrate'
            ? menuData.map((e: string) => (
                <MenuItem key={e} value={e}>
                  {`${e}, fc: ${data[e].foldChange}, c: ${data[e].pathCount}`}
                </MenuItem>
              ))
            : menuData.map((e: string) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectMenu;
