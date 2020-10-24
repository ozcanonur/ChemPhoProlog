/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPathExplanation } from 'actions/pathways';

import CardGeneric from 'components/Card/CardGeneric';
import Table from 'components/Table/Table';

const PathDetails = () => {
  const { perturbagen } = useSelector((state) => state.pathwayInputs);
  const selectedPath = useSelector((state) => state.selectedPath);
  const pathExplanation = useSelector((state) => state.pathExplanation);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPathExplanation(selectedPath));
  }, [dispatch, selectedPath]);

  const [currentPage, setCurrentPage] = useState(0);
  const handleChangePage = (_event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <CardGeneric
      color='primary'
      cardTitle='Explanation'
      cardSubtitle={perturbagen}
      style={{ opacity: selectedPath.length === 0 ? 0.5 : 1 }}
    >
      <Table
        className='my-node'
        tableHeaderColor='primary'
        tableHead={['Start', 'Phosphosite', 'End']}
        tableData={pathExplanation.length > 1 ? pathExplanation : []}
        rowsPerPage={10}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />
    </CardGeneric>
  );
};

export default PathDetails;
