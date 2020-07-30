import React, { useEffect, useState } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Typography from '@material-ui/core/Typography';
import PerturbagenListLeftPanel from 'views/Lists/PerturbagenList/PerturbagenListLeftPanel';
import PerturbagenListRightPanel from 'views/Lists/PerturbagenList/PerturbagenListRightPanel';

import CallApi from 'api/api';

export default function PerturbagenList() {
  // List of the data to be displayed on kinase table
  const [perturbagenData, setperturbagenData] = useState([]);
  // Selected kinase info and description dictionary per Uniprot ID
  const [perturbagenInfo, setperturbagenInfo] = useState('');
  // Right panel open or not
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  // Only run on first mount
  // Gets the kinases and details and sets the states for them
  useEffect(() => {
    let needCleanUp = true;

    const apiQuery = 'select * from Perturbagen group by name order by name';

    // Get all kinases from DB
    CallApi(apiQuery).then((res) => {
      if (needCleanUp) {
        // Set the main table body data

        setperturbagenData(res);
      }
    });

    // Clean-up
    return () => (needCleanUp = false);
  }, []);

  const handleSelection = (selection) => {
    setRightPanelOpen(true);
    const selectedPerturbagenDesc = perturbagenData.filter(
      (item) => item['name'] === selection
    );

    setperturbagenInfo(selectedPerturbagenDesc[0]);
  };

  const tableData = perturbagenData.map(Object.values);

  return (
    <div>
      <GridContainer
        direction='column'
        justify='space-between'
        style={{ padding: '2em' }}
      >
        <GridItem md>
          <Card>
            <CardBody>
              <Typography variant='body1'>
                ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff. ChemPhoPro provides a compendium of results and related information
                obtained from chemical phosphoproteomics experiments. And some other
                stuff.
              </Typography>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem md>
          <GridContainer direction='row'>
            <GridItem md>
              <PerturbagenListLeftPanel
                perturbagenTableData={tableData}
                handleSelection={handleSelection}
              />
            </GridItem>
            <GridItem md>
              {rightPanelOpen ? (
                <PerturbagenListRightPanel perturbagenInfo={perturbagenInfo} />
              ) : undefined}
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
