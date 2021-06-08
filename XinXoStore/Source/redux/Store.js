import { createStore } from 'redux';
import RootReducer from './reducer/RootReducer.js';

const Store = createStore(RootReducer);

export default Store;