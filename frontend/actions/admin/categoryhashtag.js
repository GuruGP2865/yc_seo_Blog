import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { getCookie, isAuth } from '../auth';




export const createValue = (type, value) => {
    if ( isAuth() ) {
     return fetch(`${API}/${type}/${isAuth()._id}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ name: value })
    }).then(response => {
     return response.json()
    }).catch(err => {
     return err;
    });
    }
}



export const editValue = (type, id, value) => {
    if ( isAuth() ) {
     return fetch(`${API}/${type}/${id}/${isAuth()._id}`, {
     method: 'PUT',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ name: value })
    }).then(response => {
     return response.json()
    }).catch(err => {
     return err;
    });
    }
}




export const deleteValue = (type, id) => {
    if ( isAuth() ) {
     return fetch(`${API}/${type}/${id}/${isAuth()._id}`, {
     method: 'DELETE',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
    }
}