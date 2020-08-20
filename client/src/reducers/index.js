import { combineReducers } from 'redux';
import kinaseDataReducer from 'reducers/kinaseDataReducer';

export default combineReducers({
  kinaseData: kinaseDataReducer,
});
