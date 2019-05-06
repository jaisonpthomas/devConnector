import axios from "axios";
// If user has a token, send it as part of default header each time.
// Otherwise, stop sending the token in defualt header.
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
