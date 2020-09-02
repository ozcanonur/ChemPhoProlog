import { combineReducers } from 'redux';

import kinaseDataReducer from 'reducers/KinaseList/kinaseDataReducer';
import selectedKinaseReducer from 'reducers/KinaseList/selectedKinaseReducer';
import currentPageKinaseReducer from 'reducers/KinaseList/currentPageKinaseReducer';
import perturbagenDataReducer from 'reducers/PerturbagenList/perturbagenDataReducer';
import selectedPerturbagenReducer from 'reducers/PerturbagenList/selectedPerturbagenReducer';
import currentPagePerturbagenReducer from 'reducers/PerturbagenList/currentPagePerturbagenReducer';
import sidebarRoutesReducer from 'reducers/Sidebar/sidebarRoutesReducer';
import inspectReducer from 'reducers/Pathway/inspectReducer';
import selectedPathReducer from 'reducers/Pathway/selectedPathReducer';
import pathwayDataReducer from 'reducers/Pathway/pathwayDataReducer';

export default combineReducers({
  kinaseData: kinaseDataReducer,
  selectedKinase: selectedKinaseReducer,
  currentPageKinase: currentPageKinaseReducer,
  perturbagenData: perturbagenDataReducer,
  selectedPerturbagen: selectedPerturbagenReducer,
  currentPagePerturbagen: currentPagePerturbagenReducer,
  sidebarRoutes: sidebarRoutesReducer,
  pathsInspectList: inspectReducer,
  selectedPath: selectedPathReducer,
  pathwayData: pathwayDataReducer,
});
