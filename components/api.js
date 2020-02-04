import axios from 'axios';


const api = axios.create({
    baseURL: 'https://b91d1ec2.ngrok.io'
})
//const api = 'https://b91d1ec2.ngrok.io'



export const login = (info) => api.post('user/login', info) // working!
export const savePicture = () => api.post('pictures', newPicture)
export const loadUser = () => api.get('user?user='+user)

const apis = 
{
    login: login,
    savePicture: savePicture,
    loadUser: loadUser
}

export default apis