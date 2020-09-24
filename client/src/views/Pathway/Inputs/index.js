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
import setSelectedInputs from 'redux/actions/Pathway/setSelectedInputs';
import getPathwayData from 'redux/actions/Pathway/getPathwayData';
import removeAllInspectPaths from 'redux/actions/Pathway/removeAllInspectPaths';
import setElementsToAnimate from 'redux/actions/Pathway/setElementsToAnimate';
// eslint-disable-next-line no-unused-vars

export default function Inputs() {
  const [loading, setLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const inputs = useSelector((state) => state.pathwayInputs);
  const data = useSelector((state) => state.pathwayData);
  const cy = useSelector((state) => state.cy);

  // cellLine: 'MCF7',
  //     perturbagen: 'Trametinib',
  //     substrate: 'MYC(S62)',
  //     onlyKinaseEnds: false,

  const dispatch = useDispatch();
  // Testing purposes, giving std values to inputs
  useEffect(() => {
    const initInputs = {
      cellLine: 'MCF-7',
      perturbagen: 'Torin',
      substrate: 'AKT1(S473)',
      onlyKinaseEnds: false,
    };
    dispatch(setSelectedInputs(initInputs));
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
    // Have to move starting phosphosite out of the parent
    // Or cytoscape diff crashes again, same issue with @cxtmenuOptions/submitPathwayFromSelectedEle
    cy.$(`[id='${substrate}']`).move({ parent: null });
    dispatch(getPathwayData(cellLine, perturbagen, substrate, switchChecked));
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
          <img
            src={loading_thin}
            alt='Loading thin'
            style={{ marginTop: '-17px', marginBottom: '5px' }}
          />
        </div>
      );
    if (data && data.paths.length === 1) return 'No paths, try another';
    return 'Get pathway';
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle='Select inputs'
      cardSubtitle='Cell Line / Perturbagen / Substrate'
    >
      <GridContainer direction='row' alignItems='center' justify='center'>
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
              <Switch
                checked={switchChecked}
                onChange={handleSwitch}
                name='onlyKinaseEnds'
                color='primary'
              />
            }
            label='Only paths ending with a KPa'
          />
        </GridItem>
      </GridContainer>
    </CardGeneric>
  );
}
