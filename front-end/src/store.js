import { createStore } from 'redux';
import { userReducer } from './Reducers/userReducer';

// Deprecated, Developers indicating to use redux-toolkit
const store = createStore(userReducer);

export default store;