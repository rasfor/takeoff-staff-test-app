import { applyMiddleware, combineReducers, createStore } from 'redux';
import loginReducer from './loginReducer';
import thunkMiddleWare from 'redux-thunk';


let rootReducer = combineReducers({
  login: loginReducer,
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));




