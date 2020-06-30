import axios from 'axios';
import baseUrl from '../constants';
import {store} from "../store";

// Creating a customer instance of axios makes fetches more convenient by giving custom defaults

const Axios = axios.create({
    baseUrl: baseUrl
});

Axios.defaults.baseURL = baseUrl;
Axios.defaults.headers.post['content-type'] = 'application/json';

// Intercept every Axios request and include the Bearer token stored in redux
// this keeps your fetches DRY, as you need to include the Bearer with every request anyway (excluding registration)

Axios.interceptors.request.use(function (config) {
    const token = store.getState().loginReducer.token; // remember: there is nothing stopping us to access redux state like in the beginning
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

// Use the axios instance exported from here instead of importing the default one when fetching data
export default Axios;
