import axios from 'axios';


const api = axios.create({
    baseURL: 'https://da93d27b.ngrok.io'
})
export const apiURL = 'https://da93d27b.ngrok.io'
export const login = (info) => api.post('user/login', info) // working!
export const savePicture = (newPicture, token) =>
api.post(
    'pictures',
    {newPicture},
    {headers: {
        Accept: "*/*",
        "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        'authorization': 'Bearer ' +token
      }})
export const loadUser = () => api.get('user?user='+user)

const apis = 
{
    apiURL: apiURL,
    login: login,
    savePicture: savePicture,
    loadUser: loadUser
}

export default apis