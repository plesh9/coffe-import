import { authApi } from "../../api/authApi";

const SET_USER = "SET_USER";
const SET_AUTH = "SET_AUTH";
const SET_LOADING = "SET_LOADING";

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user
      };
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.state
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.state
      };

    default:
      return state;
  }
};

const setUser = (user) => {
    return {type: SET_USER, user}
}

const setAuth = (state) => {
    return {type: SET_AUTH, state}
}

export const setLoading = (state) => {
  return {type: SET_LOADING, state}
}

export const login = (email, password) =>{
    return dispatch => authApi.login(email, password).then((response) => {
      if (!response.data) return
      
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
      dispatch(setAuth(true))
    }) 
}

export const registration = (email, password, firstname, lastname) =>{
  return dispatch => authApi.registration(email, password, firstname, lastname).then((response) => {
    if (!response.data) return

    localStorage.setItem('token', response.data.accessToken)
    dispatch(setUser(response.data.user))
    dispatch(setAuth(true))
  }) 
}

export const logout = (email, password) =>{
  return dispatch => authApi.logout(email, password).then((response) => {
    localStorage.removeItem('token')
    dispatch(setUser(null))
    dispatch(setAuth(false))
  }) 
}

export const checkAuth = () => {
    return dispatch => authApi.checkAuth().then((response) => {
      if (!response?.data) return
      
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
      dispatch(setAuth(true))
    }) 
    .catch((error) => {
      alert(error?.response?.data?.message)
      if (localStorage.getItem('token')){
        localStorage.removeItem('token')
      }
    })
}

export const update = ({id, email, firstname, lastname, oldPassword, newPassword}) =>{
  console.log(email, firstname, lastname, id);
  return dispatch => authApi.update(id, email, firstname, lastname, oldPassword, newPassword).then((response) => {
    if (!response.data) return

    dispatch(setUser(response.data.user))
  }) 
}

export default authReducer;
