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

import { ReactComponent as Loading } from 'assets/img/loading.svg';
import Cytoscape, { Core } from 'cytoscape';
import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedInputs, getPathwayData, removeAllInspectPaths, setElementsToAnimate } from 'actions/pathways';
import inputsStyles from './style';
import SelectMenu from './SelectMenu';

interface Props {
  cy: Core;
}

const useStyles = makeStyles(inputsStyles);

const Inputs = ({ cy }: Props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [error, setError] = useState('');
  const inputs = useSelector((state: RootState) => state.pathwayInputs);
  const data = useSelector((state: RootState) => state.pathwayData);

  const dispatch = useDispatch();

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
      <GridContainer direction='row' alignItems='center'>
        {['Cell Line', 'Perturbagen', 'Substrate'].map((inputType) => (
          <GridItem key={inputType}>
            <SelectMenu type={inputType} />
          </GridItem>
        ))}
        <GridItem>
          <Button onClick={onSubmit} className={classes.button}>
            <>
              {loading ? (
                <div>
                  <Loading style={{ height: '5rem', width: '10rem' }} />
                </div>
              ) : (
                <p>Get pathway</p>
              )}
              {error ? <div className={classes.error}>{error}</div> : undefined}
            </>
          </Button>
        </GridItem>
        <GridItem className={classes.switchContainer} style={{ display: 'none' }}>
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
