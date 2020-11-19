import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPathExplanation } from 'actions/pathways';

import HelperPopup from 'components/Misc/HelperPopup/HelperPopup';
import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';

const PathDetails = () => {
  const { perturbagen } = useSelector((state: RootState) => state.pathwayInputs);
  const selectedPath = useSelector((state: RootState) => state.selectedPath);
  const pathExplanation = useSelector((state: RootState) => state.pathExplanation);
  const [helpersOpen, setHelpersOpen] = useState(false);

  const toggleHelpers = () => {
    setHelpersOpen(!helpersOpen);
  };

  const helpers = {
    helpers: [
      {
        position: { row: 0, column: 1 },
        component: (
          <HelperPopup style={{ top: '-1.4rem' }}>
            <div>Explanation for the currently animated path</div>
          </HelperPopup>
        ),
      },
    ],
    helpersOpen,
    toggleHelpers,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPathExplanation(selectedPath));
  }, [dispatch, selectedPath]);

  return (
    <CardGeneric
      color='primary'
      cardTitle='Explanation'
      cardSubtitle={perturbagen}
      style={{ opacity: selectedPath.length === 0 ? 0.5 : 1, minHeight: '16rem' }}
    >
      <Table
        id='pathDetails'
        tableHead={['Start', 'Phosphosite', 'End']}
        tableData={pathExplanation.length > 1 ? pathExplanation : []}
        searchIndex={0}
        helpers={helpers}
      />
    </CardGeneric>
  );
};

export default PathDetails;
