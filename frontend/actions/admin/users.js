import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { getCookie, isAuth } from '../auth';

export const getAllUsers = () => {
    return fetch(`${API}/users/${isAuth()._id}`, {
     method: 'GET',
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

export const changeUserRole = (id, role) => {
    return fetch(`${API}/user/changerole/${isAuth()._id}`, {
     method: 'PUT',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ id, role })
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}