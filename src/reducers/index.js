import { combineReducers } from 'redux';
import stockReducer from './stockReducer';

const appReducer = combineReducers({
  stockReducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;