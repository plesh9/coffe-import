import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {scrollLock, scrollUnlock} from '../tools/subFunctions'
import { login, registration, logout, setLoading, update } from "../state/reducers/authReducer";

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
      alert(error.response.data.message);
    } finally {
      scrollUnlock();
      dispatch(setLoading(false));
    }
  }

  return { onLogin, onRegister, onLogout, onUpdate, isLoading };
};
