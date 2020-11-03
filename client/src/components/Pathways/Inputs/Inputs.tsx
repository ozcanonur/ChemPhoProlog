/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import GridItem from 'components/Misc/CustomGrid/GridItem';
import GridContainer from 'components/Misc/CustomGrid/GridContainer';
import Button from 'components/Misc/CustomButton/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Cytoscape, { Core } from 'cytoscape';
import loading_thin from 'assets/img/loading_thin.gif';
import Switch from '@material-ui/core/Switch';
import VirtualizedDropDown from 'components/Pathways/Inputs/VirtualizedDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedInputs, getPathwayData, removeAllInspectPaths, setElementsToAnimate } from 'actions/pathways';
import inputsStyles from './style';

interface Props {
  cy: Core;
}

const useStyles = makeStyles(inputsStyles);

const Inputs = ({ cy }: Props): JSX.Element => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [error, setError] = useState('');
  const inputs = useSelector((state: RootState) => state.pathwayInputs);
  const data = useSelector((state: RootState) => state.pathwayData);

  console.log(inputs);
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
    <CardGeneric color='primary' cardTitle='Select inputs' cardSubtitle='Cell Line / Perturbagen / Substrate'>
      <GridContainer direction='row' alignItems='center' justify='center'>
        {['Cell Line', 'Perturbagen', 'Substrate'].map((inputType, key) => (
          <GridItem key={key}>
            <VirtualizedDropDown type={inputType} />
          </GridItem>
        ))}
        <GridItem>
          <Button onClick={onSubmit} className={classes.button}>
            <>
              {loading ? (
                <div>
                  <p>Loading...</p>
                  <img src={loading_thin} alt='Loading thin' className={classes.img} />
                </div>
              ) : (
                <p>Get pathway</p>
              )}
              {error ? <div className={classes.error}>{error}</div> : undefined}
            </>
          </Button>
        </GridItem>
        <GridItem className={classes.switchContainer}>
          <FormControlLabel
            control={<Switch checked={switchChecked} onChange={handleSwitch} name='onlyKinaseEnds' color='primary' />}
            label='Only paths ending with a KPa'
          />
        </GridItem>
      </GridContainer>
    </CardGeneric>
  );
};

export default Inputs;
