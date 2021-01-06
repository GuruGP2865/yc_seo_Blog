import {API} from '../config'
import fetch from 'isomorphic-fetch';
import { getCookie, isAuth } from './auth';

export const BlogsWithCategoriesHashtags = (limit, skip) => {
    return fetch(`${API}/posts?limit=${limit}&skip=${skip}`, {
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

export const SearchBlog = (limit, skip, word) => {
    return fetch(`${API}/posts/search?word=${word}&limit=${limit}&skip=${skip}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({limit, skip, word})
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}

export const getSinglePost = (slug) => {
    return fetch(`${API}/post/${slug}`, {
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

export const getRecomendations = () => {
    return fetch(`${API}/post/recomendations`, {
        method: 'POST',
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


export const getBookmark = (limit, skip) => {
    if (isAuth()) {
      return fetch(`${API}/user/bookmarks/${isAuth()._id}?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie("token")}`
        }
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
    }
}

