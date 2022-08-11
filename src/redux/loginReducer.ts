import { authApi } from '../api/api';
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk';
import { LocalStorage } from "ts-localstorage";


const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_AUTH_ERROR = 'SET_AUTH_ERROR';


type InitialStateType = {
  userId: number | null,
  email: string | null,
  isAuthorized: boolean,
  authError: string | null
}

let ininitializeState: InitialStateType = {
  userId: null,
  email: null,
  isAuthorized: false,
  authError: null
}

const authUserReducer = (state = ininitializeState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER: {
      return {
        ...state,
        ...action.data
      }
    }
    case SET_AUTH_ERROR: {
      return {
        ...state,
        authError: action.authError
      }
    }
    default:
      return state;
  }

}

type setAuthUserActionType = {
  type: typeof SET_AUTH_USER,
  data: {
    userId: number | null,
    email: string | null,
    isAuthorized: boolean
  }
}

type setAuthErrorActionType = {
  type: typeof SET_AUTH_ERROR,
  authError: string | null
}

type ActionTypes = setAuthUserActionType | setAuthErrorActionType;

export const setAuthUser = (userId: number | null, email: string | null, isAuthorized: boolean): setAuthUserActionType => {
  return {
    type: SET_AUTH_USER,
    data: {
      userId,
      email,
      isAuthorized
    }

  }
}

export const setAuthError = (authError: string | null): setAuthErrorActionType => {
  return {
    type: SET_AUTH_ERROR,
    authError

  }
}

export const login = (payload: object): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    try {
      const response = await authApi.login(payload)
      if (response.data !== null) {
        let { id, email } = response.data.user;
        dispatch(setAuthUser(id, email, true));
        localStorage.setItem("isAuth", 'true');
      }
    }
    catch {
      dispatch(setAuthError("Something was wrong! Try again!"));
    }
  }
}

export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(setAuthUser(null, null, false));
  }
}


export default authUserReducer;