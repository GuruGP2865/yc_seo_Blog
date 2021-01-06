import {API} from '../../config'
import fetch from 'isomorphic-fetch';
import { getCookie, isAuth } from '../auth'

export const uploadImage = (formData) => {
    return fetch(`${API}/post/uploadfile/${isAuth()._id}`, {
     method: 'POST',
     headers: {
      Accept: 'application/json',
         
      Authorization: `Bearer ${getCookie("token")}`,
     },
     body: formData
    }).then(response => {
     return response.json();
    }).catch(err => {
     return err;
    });
}


export const getSinglePostById = (slug) => {
    return fetch(`${API}/postbyid/${slug}`, {
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

export const BlogsWithContent = (limit, skip) => {
    return fetch(`${API}/postswithcontent?limit=${limit}&skip=${skip}`, {
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

export const createPost = (formData) => {
    return (
        fetch(`${API}/post/create/${isAuth()._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        })
    )
}

export const deletePost = (id) => {
    return (
        fetch(`${API}/post/${id}/${isAuth()._id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getCookie("token")}`,
            },
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        })
    )
}

export const editPost = (formData, id) => {
  
    return (
        fetch(`${API}/post/${id}/${isAuth()._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        })
    )
}


export const uploadFilterImage = (formData) => {
  
    return (
        fetch(`${API}/post/imageupload/${isAuth()._id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${getCookie("token")}`,
            },
            body: formData
        }).then(response => {
            return response.json();
        }).catch(err => {
            return err;
        })
    )
}