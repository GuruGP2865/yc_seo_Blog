import {API} from '../config'
import fetch from 'isomorphic-fetch';
import { getCookie, isAuth } from './auth';


export const getCategories = () => {
    return fetch(`${API}/categories`, {
     method: 'GET',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     },
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}