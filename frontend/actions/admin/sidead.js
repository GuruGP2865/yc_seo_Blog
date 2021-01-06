import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { getCookie, isAuth } from '../auth';

export const getAllSideads = () => {
    return fetch(`${API}/sideads`, {
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


export const createSidead = (formData) => {
    return fetch(
        `${API}/sidead/${isAuth()._id}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        }
    )
}

export const editSidead = (id, formData) => {
    return fetch(
        `${API}/sidead/${id}/${isAuth()._id}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        }
    )
}


export const deleteSidead = (id) => {
    return fetch(
        `${API}/sidead/${id}/${isAuth()._id}`, {
            method: 'DELETE',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        }
    )
}