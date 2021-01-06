import {API} from '../config'
import cookie from 'js-cookie'
import fetch from 'isomorphic-fetch';

// Set in Cookie
export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      // 1 Day
      expires: 1,
    });
  }
};

// remove from cookie
export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (data, next) => {
  //console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
  setCookie("token", data.token);
  setLocalStorage("user", data.user);
  next();
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();
};

// Access user info from localstorage
export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    } else {
      return false
    }
  }
};

export const updateUser = (response, next) => {
  //console.log("UPDATE USER IN LOCALSTORAGE HELPERS", response);
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};



export const signup = user => {
    return fetch(`${API}/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .catch(err => {
         //console.log(err);
          return err;
        });
};


export const activate = (token) => {
 return fetch(`${API}/activation`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token})
    })
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .catch(err => {
         //console.log(err);
          return err;
        });
};

  //Send facebook token
export const sendFacebookToken = (userID, accessToken) => {
   return fetch(`${API}/facebooklogin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID, accessToken})
    })
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .catch(err => {
         //console.log(err);
          return err;
        });
  };



  
  //Send google token
 export const sendGoogleToken = (tokenId) => {
   return fetch(`${API}/googlelogin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({idToken: tokenId})
    })
        .then(response => {
            //console.log(response);
            return response.json();
        })
        .catch(err => {
         //console.log(err);
          return err;
        });
  };

  export const login = (email, password) => {


   return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    })


  
  } 


  export const forgot = (email) => {
    return fetch(`${API}/forgotpassword`, {
       method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    })
  }

  export const reset = (newPassword, resetPasswordLink) => {
    return fetch(`${API}/resetpassword`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newPassword, resetPasswordLink})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    })
  }