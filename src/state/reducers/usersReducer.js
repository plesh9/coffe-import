import { usersApi } from "../../api/usersApi";

const SET_USERS = "SET_USERS";
const SET_USERS_LOADING = "SET_USERS_LOADING";

const initialState = {
  users: null,
  usersIsLoading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.users
      };
    case SET_USERS_LOADING:
    return {
        ...state,
        usersIsLoading: action.state
    };
    default:
      return state;
  }
};

const setUsers = (users) => {
    return {type: SET_USERS, users}
}

export const setUsersLoading = (state) => {
    return {type: SET_USERS_LOADING, state}
}

export const getUsers = () =>{
    return async dispatch => usersApi.getUsers()
    .then((response) => {
      if (!response.data) return
      
      dispatch(setUsers(response.data))
    })
  }

export default usersReducer;
