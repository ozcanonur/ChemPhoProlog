/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Card/CardGeneric';
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import Button from 'components/CustomButtons/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Cytoscape from 'cytoscape';
import loading_thin from 'assets/img/loading_thin.gif';
import Switch from '@material-ui/core/Switch';
import VirtualizedDropDown from 'views/Pathway/Inputs/VirtualizedDropDown';
import { useSelector, useDispatch } from 'react-redux';
import setSelectedInputs from 'actions/Pathway/setSelectedInputs';
import removeAllInspectPaths from 'actions/Pathway/removeAllInspectPaths';
import getPathwayData from 'actions/Pathway/getPathwayData';
import setElementsToAnimate from 'actions/Pathway/setElementsToAnimate';
// eslint-disable-next-line no-unused-vars

export default function Inputs() {
  const [loading, setLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const inputs = useSelector((state) => state.pathwayInputs);
  const data = useSelector((state) => state.pathwayData);

  // cellLine: 'MCF7',
  //     perturbagen: 'Trametinib',
  //     substrate: 'MYC(S62)',
  //     onlyKinaseEnds: false,

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
    getPathwayData({ ...initInputs });
  }, [dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const handleSwitch = () => {
    setSwitchChecked(!switchChecked);
    const newInputs = { ...inputs, onlyKinaseEnds: !switchChecked };
    dispatch(setSelectedInputs(newInputs));
  };

  const onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { cellLine, perturbagen, substrate } = inputs;
    dispatch(getPathwayData('MCF-7', perturbagen, substrate, switchChecked));
    dispatch(removeAllInspectPaths());
    dispatch(
      setElementsToAnimate({
        elementsToShow: Cytoscape().collection(),
        elementsToFade: Cytoscape().collection(),
      })
    );
    setLoading(true);
  };

  const inputTypeList = ['Cell Line', 'Perturbagen', 'Substrate'];

  const ButtonText = () => {
    if (loading)
      return (
        <div>
          <p>Loading...</p>
          <img src={loading_thin} alt='Loading thin' style={{ marginTop: '-17px', marginBottom: '5px' }} />
        </div>
      );
    if (data && data.paths.length === 0) return 'No paths, try again';
    return 'Get pathway';
  };

  return (
    <CardGeneric color='primary' cardTitle='Select inputs' cardSubtitle='Cell Line / Perturbagen / Substrate'>
      <GridContainer direction='row' alignItems='center'>
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
            <ButtonText />
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
