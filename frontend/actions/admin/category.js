
import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { getCookie, isAuth } from '../auth';

export const getAllCategories = () => {
    return fetch(`${API}/categories`, {
     method: 'GET',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     }
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
     method: 'GET',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     }
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}


export const editCategory = (categoryId, name, image) => {
    return fetch(`${API}/category/${categoryId}/${isAuth()._id}`, {
     method: 'PUT',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ name: name, image: image })
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}


export const createCategory = (name, image) => {
    return fetch(`${API}/category/${isAuth()._id}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ name: name, image: image })
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}

export const deleteCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}/${isAuth()._id}`, {
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

