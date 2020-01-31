import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  CheckBox,
  Alert,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import LogoTitle from './LogoTitle';

export default class LoginScreen extends Component {


  state = { email: '', password: '', pageTitle: 'LOGIN'}
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  constructor(props) {

    super(props);
    this.state = {
      user: '',
      isAuthenticated: false,
      baseAPI: 'https://e45b3d64.ngrok.io'
    }
  }
  

  //using navigation
  static navigationOptions = ({navigation, navigationOptions})=>{
    const {params} = navigation.state;

    return{
    headerStyle: {
      backgroundColor: "#FFF212"
    },
    
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: "center",
    },
    title: 'LOGIN',
    headerTitle: () => <View style={styles.line}><LogoTitle/><Text style={styles.allText}>  LOGIN</Text></View>
  };}

  Login = () => {

    axios.post(
      this.state.baseAPI+'/user/login',
      {
        email: this.state.email,
        password: this.state.password
      },
      {
        Headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((res) => {
      console.log('Response: ' + JSON.stringify(res))

      if (res.data.token) {
        console.log("logedIn");
        const DB = {
          userId: res.data.id,
          token: res.data.token,
          isAuthenticated: true
        };
        console.log(DB)
        console.log('DB: ' + JSON.stringify(DB));
        this.saveState(DB)
      }
    }).catch((error) => {
         Alert.alert(JSON.stringify(error));
         console.log(JSON.stringify(error));
       });}


  saveState = (DB) => {
    this.setState(this.user = DB)
    console.log('DB AGAIN: ' + JSON.stringify(DB));
    this.props.navigation.navigate('Scrambler', DB)
  }

  notAuth = () => {
    Alert.alert('Something went wrong')
  }

  render() {
    const {navigate} = this.props.navigation;
  

    return (
      
      <View  style={styles.container}>

          <TouchableOpacity style={styles.button} onPress={() => navigate('Scrambler')}>
            <Text style={styles.buttonText}>Scrambler page</Text>
          </TouchableOpacity>

          
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          autoCapitalize="none"
          keyboardType='email-address'
          autoCorrect={false}
          onChangeText={val => this.onChangeText('email', val)}
          returnKeyType="next"
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={val => this.onChangeText('password', val)}
          returnKeyType="go"
        ></TextInput>

        <View style={styles.line}>
          <CheckBox></CheckBox>
          <Text style={styles.text}>Remember me</Text>


          <TouchableOpacity onPress={this.Login}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/okBtn.png')}></Image>
          </TouchableOpacity>
        </View>

        <Text style={styles.allText}
          onPress={() => this.props.navigation.navigate("Register")}>
          REGISTER</Text>

        <Text style={styles.allText}
          onPress={() => this.props.navigation.navigate("ForgetPassword")}
          title="Forget Password">
          Forget Password</Text>
          </View>

    );
  }
}
