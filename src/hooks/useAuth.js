import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {scrollLock, scrollUnlock} from '../tools/subFunctions'
import { login, registration, logout, setLoading, update, checkAuth, addSeller, addAdmin } from "../state/reducers/authReducer";

export const useAuth = () => {
  const { isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    scrollLock();
    dispatch(setLoading(true));

    try {
      await dispatch(login(email, password));
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  };

  const onRegister = async ({ email, password, firstname, lastname }) => {
    scrollLock();
    dispatch(setLoading(true));

    try {
      await dispatch(registration(email, password, firstname, lastname));
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  };

  const onLogout = async (e) => {
    scrollLock();
    dispatch(setLoading(true));
    
    try {
      await dispatch(logout());
      navigate("/");
    } catch (error) {
        console.log(error)
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  };

  const onUpdate = async (newUser) => {
    scrollLock();
    dispatch(setLoading(true));

    try{
      await dispatch(update(newUser)) 
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  }

  const onUpdateRole = async (email, password, role) => {
    scrollLock();
    dispatch(setLoading(true));

    try{
      await dispatch(addSeller(email, password, role)) 
      navigate("/cabinet");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  }

  const onAddAdmin = async ({email, password, firstname, lastname, key}) => {
    scrollLock();
    dispatch(setLoading(true));

    try{
      await dispatch(addAdmin(email, password, firstname, lastname, key)) 
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  }

  

  const verify = () => {
    if (!localStorage.getItem('token')) return

    scrollLock();
    dispatch(setLoading(true));

    dispatch(checkAuth()).then((response) => {
      if (response?.data?.message) {
        navigate("/login");
      }

      scrollUnlock();
      dispatch(setLoading(false));
    })
  }

  return { onLogin, onRegister, onLogout, onUpdate, onUpdateRole, onAddAdmin, verify, isLoading };
};
