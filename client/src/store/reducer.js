// store/reducers.js

import { combineReducers } from 'redux';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
    // Add other reducers here
});

export default rootReducer;
