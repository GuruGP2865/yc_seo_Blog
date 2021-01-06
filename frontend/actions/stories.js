import {API} from '../config'
import fetch from 'isomorphic-fetch';
import { getCookie, isAuth } from './auth';

export const getStories = (categoryId) => {
    return fetch(`${API}/posts/stories/${categoryId}`, {
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

export const GetStoryImages = (limit, skip) => {
    return fetch(`${API}/storyimages?limit=${limit}&skip=${skip}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({limit, skip})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}