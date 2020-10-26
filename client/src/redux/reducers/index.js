import { combineReducers } from 'redux';
import auth from './auth';
import loginPage from './loginPage';
import registerPage from './registerPage';
import editPages from './editPages';

const rootReducer = combineReducers({
   auth,
   loginPage,
   registerPage,
   editPages,
});

export default rootReducer;
