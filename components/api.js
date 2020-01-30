//import axios from 'react-native-axios';
import axios from 'axios';

// using [ngrok.com] and [Express Server]
// Command at terminal
// ./ngrok http 3000

const api = axios.create({
    baseURL: 'https://ad9d3f5f.ngrok.io/'
})

export const login = ({user}) => {
    console.log(user);
    api.post('user/login'+ {user});
}
export const savePicture = () => api.post('pictures', newPicture)
export const loadUser = () => api.get('user?user='+user)


const apis = 
{
    login: login,
    savePicture: savePicture,
    loadUser: loadUser
}

export default apis