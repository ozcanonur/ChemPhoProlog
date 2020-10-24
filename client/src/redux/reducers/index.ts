import { combineReducers } from 'redux';

import kinaseDataReducer from 'redux/reducers/KinaseList/kinaseDataReducer';
import selectedKinaseReducer from 'redux/reducers/KinaseList/selectedKinaseReducer';
import currentPageKinaseReducer from 'redux/reducers/KinaseList/currentPageKinaseReducer';
import perturbagenDataReducer from 'redux/reducers/PerturbagenList/perturbagenDataReducer';
import selectedPerturbagenReducer from 'redux/reducers/PerturbagenList/selectedPerturbagenReducer';
import currentPagePerturbagenReducer from 'redux/reducers/PerturbagenList/currentPagePerturbagenReducer';
import sidebarRoutesReducer from 'redux/reducers/Sidebar/sidebarRoutesReducer';
import inspectReducer from 'redux/reducers/Pathway/inspectReducer';
import selectedPathReducer from 'redux/reducers/Pathway/selectedPathReducer';
import pathwayDataReducer from 'redux/reducers/Pathway/pathwayDataReducer';
import inputsReducer from 'redux/reducers/Pathway/inputsReducer';
import cyReducer from 'redux/reducers/Pathway/cyReducer';
import elementsToAnimateReducer from 'redux/reducers/Pathway/elementsToAnimateReducer';
import cxtMenuReducer from 'redux/reducers/Pathway/cxtMenuReducer';
import pathExplanationReducer from 'redux/reducers/Pathway/pathExplanationReducer';

export default combineReducers({
  kinaseData: kinaseDataReducer,
  selectedKinase: selectedKinaseReducer,
  currentPageKinase: currentPageKinaseReducer,
  perturbagenData: perturbagenDataReducer,
  selectedPerturbagen: selectedPerturbagenReducer,
  currentPagePerturbagen: currentPagePerturbagenReducer,
  extraSidebarRoutes: sidebarRoutesReducer,
  pathsInspectList: inspectReducer,
  selectedPath: selectedPathReducer,
  pathwayData: pathwayDataReducer,
  pathwayInputs: inputsReducer,
  cy: cyReducer,
  elementsToAnimate: elementsToAnimateReducer,
  cxtMenu: cxtMenuReducer,
  pathExplanation: pathExplanationReducer,
});
