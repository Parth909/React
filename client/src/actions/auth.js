// From here we will make requests to the backend
import axios from 'axios'
import { setAlert } from "./alert";
import  {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR} from '../actions/types'
import setAuthToken from '../utils/setAuthToken'

// User Logs/Registers successfully ===> Reducer(Sets the token in local storage) ===>
// For making any Request to the backend we use -> loadUser() ===> 
// SetAuthToken(Sets the token in the headers while making any request)

// Load User
export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try {
    const res = axios.get('/api/auth');

    dispatch({
      type:USER_LOADED,
      payload:res.data
    });
  } catch (error) {
    dispatch({
      type:AUTH_ERROR
    });
  }
}

// Register User
export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({name, email, password})

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data//res.data is an obj tht contains the token
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error=>{
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type:REGISTER_FAIL
    })
  }
}

// after building the actions connect it with the COMPONENT