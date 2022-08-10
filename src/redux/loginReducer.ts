import { authApi } from '../api/api';
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk';

const SET_AUTH_USER = 'SET_AUTH_USER';

type InitialStateType = {
  userId: number | null,
  email: string | null,
  isAuthorized: boolean
}

let ininitializeState: InitialStateType = {
  userId: null,
  email: null,
  isAuthorized: false
}

const authUserReducer = (state = ininitializeState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER: {
      return {
        ...state,
        ...action.data
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

type ActionTypes = setAuthUserActionType;

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

export const login = (payload: object): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    const response = await authApi.login(payload)
    if (response.data.accessToken !== null) {
      let { id, email } = response.data.user;
      dispatch(setAuthUser(id, email, true))
    }
    else {
      debugger;
    }
    // else {
    //   let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    //   dispatch(stopSubmit("login", { _error: message }));
    // }
  }
}

export const logout = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    const response = await authApi.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUser(null, null, false));
    }
  }
}


export default authUserReducer;