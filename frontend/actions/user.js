import {API} from '../config'
import fetch from 'isomorphic-fetch';
import { getCookie, isAuth } from './auth';

export const addBookmark = (postId) => {
 let userId = isAuth()._id;
 return fetch(`${API}/user/${userId}/${postId}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
       Authorization: `Bearer ${getCookie("token")}`
     },
     
     body: JSON.stringify({userId, postId})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}

export const removeBookmark = (postId) => {
 let userId = isAuth()._id;
 return fetch(`${API}/user/${userId}/${postId}`, {
     method: 'DELETE',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
       Authorization: `Bearer ${getCookie("token")}`,
     },
     body: JSON.stringify({userId, postId})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}