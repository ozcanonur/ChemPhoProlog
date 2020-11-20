import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPathExplanation } from 'actions/pathways';

import CardGeneric from 'components/Misc/Card/CardGeneric';
import Table from 'components/Misc/CustomTable/Table';

const PathDetails = () => {
  const { perturbagen } = useSelector((state: RootState) => state.pathwayInputs);
  const selectedPath = useSelector((state: RootState) => state.selectedPath);
  const pathExplanation = useSelector((state: RootState) => state.pathExplanation);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPathExplanation(selectedPath));
  }, [dispatch, selectedPath]);

  return (
    <CardGeneric
      color='primary'
      cardTitle='Explanation for the currently animated path'
      cardSubtitle={perturbagen}
      style={{ opacity: selectedPath.length === 0 ? 0.5 : 1, minHeight: '16rem' }}
    >
      <Table
        id='pathDetails'
        tableHead={['Start', 'Phosphosite', 'End']}
        tableData={pathExplanation.length > 1 ? pathExplanation : []}
        searchIndex={0}
      />
    </CardGeneric>
  );
};

export default PathDetails;
