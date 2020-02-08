import axios from 'axios';


const api = axios.create({
    baseURL: 'https://c7829c33.ngrok.io'
})
export const apiURL = 'https://c7829c33.ngrok.io'
export const login = (info) => api.post('user/login', info) // working!
export const signUp = (signup,headers) => api.post('/user/signup', signup, headers) // working!
export const loadUser = () => api.get('user') // working!
export const deletePic = (pictureId, headers) => api.delete('/pictures/'+pictureId, headers)

const apis = 
{
    apiURL: apiURL,
    login: login,
    loadUser: loadUser,
    signUp: signUp,
    deletePic: deletePic,
}

export default apis