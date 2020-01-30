import axios from 'react-native-axios';

const api = axios.create({
    baseURL: '192.168.0.21:3000/'
})

export const login = (user) => api.post('user/login', user)
export const savePicture = () => api.post('pictures', newPicture)
export const loadUser = () => api.get('user?user='+user)

const apis = 
{
    login: login,
    savePicture: savePicture,
    loadUser: loadUser
}

export default apis