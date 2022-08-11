import { applyMiddleware, combineReducers, createStore } from 'redux';
import loginReducer from './loginReducer';
import thunkMiddleWare from 'redux-thunk';
import contactsReducer from './contactsReducer';


let rootReducer = combineReducers({
  login: loginReducer,
  contacts: contactsReducer
})

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));




