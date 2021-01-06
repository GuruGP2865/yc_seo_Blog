import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? 'http://3.7.211.213:5000/api' : 'http://localhost:5000/api';


export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const BACKEND = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.BACKEND : 'http://localhost:5000/';

export const FACEBOOK_LOGIN_CLIENT = publicRuntimeConfig.FACEBOOK_LOGIN_CLIENT;

export const GOOGLE_LOGIN_CLIENT = publicRuntimeConfig.GOOGLE_LOGIN_CLIENT;

export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;

export const DOMAIN = publicRuntimeConfig.PRODUCTION ? publicRuntimeConfig.DOMAIN : '127.0.0.1:3000';


export const PROTOCOL = publicRuntimeConfig.PROTOCOL;
//export const 