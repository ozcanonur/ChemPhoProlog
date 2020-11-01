/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import Button from 'components/Misc/CustomButton/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Cytoscape from 'cytoscape';
import loading_thin from 'assets/img/loading_thin.gif';
import Switch from '@material-ui/core/Switch';
import VirtualizedDropDown from 'components/Pathways/Inputs/VirtualizedDropDown';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedInputs,
  getPathwayData,
  removeAllInspectPaths,
  setElementsToAnimate,
} from 'actions/pathways';

const Inputs = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [error, setError] = useState('');
  const inputs = useSelector((state: RootState) => state.pathwayInputs);
  const data = useSelector((state: RootState) => state.pathwayData);
  const cy = useSelector((state: RootState) => state.cy);

  const dispatch = useDispatch();
  // Testing purposes, giving std values to inputs
  // useEffect(() => {
  //   const initInputs = {
  //     cellLine: 'MCF-7',
  //     perturbagen: 'Torin',
  //     substrate: 'AKT1(S473)',
  //     onlyKinaseEnds: false,
  //   };
  //   dispatch(setSelectedInputs(initInputs));
  // }, [dispatch]);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const handleSwitch = () => {
    setSwitchChecked(!switchChecked);
    const newInputs = { ...inputs, onlyKinaseEnds: !switchChecked };
    dispatch(setSelectedInputs(newInputs));
  };

  const onSubmit = () => {
    if (!cy) return;
    const { cellLine, perturbagen, substrate } = inputs;
    if (!cellLine) return setError(`Cell Line can't be empty`);
    if (!perturbagen) return setError(`Perturbagen can't be empty`);
    if (!substrate) return setError(`Substrate can't be empty`);
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
    setError('');
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle='Select inputs'
      cardSubtitle='Cell Line / Perturbagen / Substrate'
    >
      <GridContainer direction='row' alignItems='center' justify='center'>
        {['Cell Line', 'Perturbagen', 'Substrate'].map((inputType, key) => (
          <GridItem key={key}>
            <VirtualizedDropDown type={inputType} />
          </GridItem>
        ))}
        <GridItem>
          <Button
            onClick={onSubmit}
            style={{
              width: '200px',
              backgroundColor: 'rgba(229,173,6)',
              color: 'white',
              height: '50px',
              position: 'relative',
            }}
          >
            <>
              {loading ? (
                <div>
                  <p>Loading...</p>
                  <img
                    src={loading_thin}
                    alt='Loading thin'
                    style={{ marginTop: '-17px', marginBottom: '5px' }}
                  />
                </div>
              ) : (
                <p>Get pathway</p>
              )}
              {error ? (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-20px',
                    color: 'red',
                  }}
                >
                  {error}
                </div>
              ) : undefined}
            </>
          </Button>
        </GridItem>
        <GridItem
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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
};

export default Inputs;
