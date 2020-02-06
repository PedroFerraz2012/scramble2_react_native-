import axios from 'axios';


const api = axios.create({
    baseURL: 'https://84234ae0.ngrok.io'
})
export const apiURL = 'https://84234ae0.ngrok.io'
export const login = (info) => api.post('user/login', info) // working!
export const signUp = (signup,headers) => api.post('/user/signup', signup, headers) // working!
export const loadUser = () => api.get('user') // working!

const apis = 
{
    apiURL: apiURL,
    login: login,
    loadUser: loadUser,
    signUp: signUp
}

export default apis