// utils contain the helper functions

import axios from 'axios'

// WHEN user is authenticated we get TOKEN FROM JWT
const setAuthToken = token => {
  // if token is Received
  if(token){
    // set the token in the global header
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
}

export default setAuthToken;