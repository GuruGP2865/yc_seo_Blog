
import fetch from 'isomorphic-fetch';
import { API } from '../../config';
import { getCookie, isAuth } from '../auth';

export const getAllHashtags = () => {
    return fetch(`${API}/hashtags`, {
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


export const getHashtag = (hashtagId) => {
    return fetch(`${API}/hashtag/${hashtagId}`, {
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


export const editHashtag = (hashtagId, value) => {
    return fetch(`${API}/hashtag/${hashtagId}/${isAuth()._id}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("token")}`
     },
     body: JSON.stringify({ value })
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}


export const deleteHashtag = (hashtagId) => {
    return fetch(`${API}/hashtag/${hashtagId}/${isAuth()._id}`, {
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


export const searchHashtag = (word) => {
    return fetch(`${API}/hashtag/search?word=${word}`, {
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