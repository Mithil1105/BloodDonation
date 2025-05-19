import axios from 'axios';

export default axios.create({
    baseURL : 'http://localhost:3031'
})

export const axiosPrivate = axios.create({
    baseURL : 'http://localhost:3031',
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
})//adding interceptor...adding jwt token to refresh token

//interceptor is a function that runs before every request
//withCredentials: true is used to send cookies along with the request
//axiosPrivate is used to send the jwt token along with the request