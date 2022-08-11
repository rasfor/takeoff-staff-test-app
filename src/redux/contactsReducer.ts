import { contactsApi } from '../api/api';
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk';

const GET_CONTACTS = 'GET_CONTACTS';
const DELETE_CONTACT = 'DELETE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';


export type UserType = {
  userId: number,
  id: number,
  name: string,
  number: string
}

let ininitializeState = {
  contacts: [] as Array<UserType>
}

type InitialStateType = typeof ininitializeState

const contactsReducer = (state = ininitializeState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case GET_CONTACTS: {
      return {
        ...state,
        contacts: [...action.contacts]
      }
    }
    case UPDATE_CONTACT: {
      return {
        ...state
      }
    }
    default:
      return state;
  }

}

type setUserContactsActionType = {
  type: typeof GET_CONTACTS,
  contacts: Array<UserType>
}

type updateUSerContactActionType = {
  type: typeof UPDATE_CONTACT,
  data: UserType
}

type ActionTypes = setUserContactsActionType | updateUSerContactActionType;

export const setUserContacts = (contacts: Array<UserType>): setUserContactsActionType => {
  return {
    type: GET_CONTACTS,
    contacts

  }
}

export const updateUSerContact = (data: UserType): updateUSerContactActionType => {
  return {
    type: UPDATE_CONTACT,
    data
  }
}

export const getUserContacts = (): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    const response = await contactsApi.getUserContacts()
    if (response.data.length !== null) {
      dispatch(setUserContacts(response.data));
    }
  }
}

export const deleteContact = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    await contactsApi.deleteContact(id)
    const response = await contactsApi.getUserContacts()
    if (response.data.length !== null) {
      dispatch(setUserContacts(response.data));
    }
  }
}

export const addNewContact = (data: object): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
  return async (dispatch) => {
    const response = await contactsApi.addContact(data)
    if (response.data !== null) {
      const secondResponse = await contactsApi.getUserContacts()
      if (secondResponse.data.length !== null) dispatch(setUserContacts(secondResponse.data));
    }
  }
}


export default contactsReducer;