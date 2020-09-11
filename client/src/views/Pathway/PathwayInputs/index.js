/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Switch from '@material-ui/core/Switch';
import VirtualizedDropDown from 'views/Pathway/PathwayInputs/VirtualizedDropDown';
import { useSelector, useDispatch } from 'react-redux';
import setSelectedInputs from 'actions/Pathway/setSelectedInputs';
import getPathwayData from 'actions/Pathway/getPathwayData';

export default function Inputs() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const inputs = useSelector((state) => state.pathwayInputs);

  const dispatch = useDispatch();
  // Testing purposes, giving std values to inputs
  useEffect(() => {
    const initInputs = {
      cellLine: 'MCF7',
      perturbagen: 'Torin',
      substrate: 'AKT1(S473)',
      onlyKinaseEnds: false,
    };
    dispatch(setSelectedInputs(initInputs));
  }, [dispatch]);

  const handleSwitch = () => {
    setSwitchChecked(!switchChecked);
    const newInputs = { ...inputs, onlyKinaseEnds: !switchChecked };
    dispatch(setSelectedInputs(newInputs));
  };

  const onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { cellLine, perturbagen, substrate } = inputs;
    dispatch(getPathwayData('MCF-7', perturbagen, substrate, switchChecked));
  };

  console.log(inputs);

  const inputTypeList = ['Cell Line', 'Perturbagens', 'Substrate'];

  return (
    <CardGeneric color='primary' cardTitle='Select inputs' cardSubtitle='Cell Line / Perturbagen / Substrate'>
      <GridContainer direction='row'>
        {inputTypeList.map((inputType, key) => (
          <GridItem key={key}>
            <VirtualizedDropDown type={inputType} />
          </GridItem>
        ))}
        <GridItem>
          <Button
            onClick={() => {
              onSubmit();
            }}
            style={{
              width: '200px',
              backgroundColor: 'rgba(229,173,6)',
              color: 'white',
              height: '50px',
            }}
          >
            Get pathway
          </Button>
        </GridItem>
        <GridItem style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch checked={switchChecked} onChange={handleSwitch} name='onlyKinaseEnds' color='primary' />
            }
            label='Only paths ending with a KPa'
          />
        </GridItem>
      </GridContainer>
    </CardGeneric>
  );
}