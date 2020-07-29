import React, { useEffect, useState } from 'react';

import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Typography from '@material-ui/core/Typography';
import PerturbagenListLeftPanel from './PerturbagenListLeftPanel';

import CallApi from 'api/api';

export default function PerturbagenList() {
  const [perturbagenTableData, setPerturbagenTableData] = useState([]);

  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  const query = 'Select * from Perturbagen group by name order by name';
  useEffect(() => {
    let needCleanUp = true;

    CallApi(query).then((res) => {
      if (needCleanUp) {
        setPerturbagenTableData(res.map(Object.values));
      }
    });

    return () => (needCleanUp = false);
  }, []);

  const handleSelection = (selection) => {
    setRightPanelOpen(true);
    console.log(selection);

    //setKinaseInfo(selectedKinaseDesc[0]);
  };

  return (
    <div>
      <GridContainer
        direction='column'
        justify='space-between'
        style={{ padding: '2em' }}
      >
        <GridItem>
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
        <GridContainer direction='row'>
          <GridItem md>
            <PerturbagenListLeftPanel
              perturbagenTableData={perturbagenTableData}
              handleSelection={handleSelection}
            />
          </GridItem>
          <GridItem md></GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}
