import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

  const [data, setData] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const inputs = useSelector((state: RootState) => state.pathwayInputs);

  const variableName = convertTypeToVariableName(type);

  useEffect(() => {
    let mounted = true;

    if (type === 'Substrate' && inputs.cellLine && inputs.perturbagen) {
      fetchFromApi('/apiWeb/validObservation', {
        cellLine: inputs.cellLine,
        perturbagen: inputs.perturbagen,
      }).then((res) => {
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

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>{type}</InputLabel>
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
          {data.map((e) => (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMenu;
