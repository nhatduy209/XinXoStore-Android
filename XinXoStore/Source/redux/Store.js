import { createStore , applyMiddleware} from 'redux';
import RootReducer from './reducer/RootReducer';
import { createEpicMiddleware } from 'redux-observable';
import RootEpic from './epics /Epics';


const epicMiddleware = createEpicMiddleware();
const enhaner = applyMiddleware(epicMiddleware);
const Store = createStore(RootReducer,enhaner);
epicMiddleware.run(RootEpic);
export default Store;