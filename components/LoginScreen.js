import React, { Component } from 'react';

import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  CheckBox,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView
} from 'react-native';
import styles from './styles';
import api from './api';
import axios from 'axios';

class LogoTitle extends React.Component {
  render() {
    return (
    <View style={styles.line}>
      <Image
        source={require('../assets/imgs/scramblerLogo.png')}
        style={{ width: 136, height: 30 }}
      /><Text style={styles.allText}>..LOGIN</Text>
      </View>
    );
  }
}

export default class LoginScreen extends Component {

  state = { email: '', password: ''}
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isAuthenticated: false
    }
  }


  //using navigation
  static navigationOptions = ({navigation, navigationOptions})=>{
    const {params} = navigation.state;

    return{
    headerStyle: {
      backgroundColor: "#FFF212",
      //elevation: null,
    },
    //headerTintColor: "#FFF212",
    //title: params ? params.otherParam : 'Login',
    //backgroundColor: "#FFF212",
    headerTitleStyle: {
      fontWeight: 'bold',
      //fontFamily: "Haetten",
      //fontWeight: "200",
      textAlign: "center",
      //flex: 1,
    },
    headerTitle: () => <LogoTitle/>
  };}

  // something in the syntax is wrong, the server doesnt identify the object in api.js
  myExample = () => {

    const user = {
      email: this.state.email,
      password: this.state.password,
      Headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    //Alert.alert(JSON.stringify (user))
    api.login(user).then((res) => {
      console.log(JSON.stringify(res.body.message))
      Alert.alert(JSON.stringify(res.body.message))
      //   if(res.body.token) {
      //   this.props.navigation.navigate("Scrambler")+this.res.id+this.res.token
      // }
    }).catch(error => {
      console.log(JSON.stringify(error))
      Alert.alert(JSON.stringify(error.message))
    })
  }

  Login = () => {
    //Alert.alert('btn ok')

    axios.post(
      'https://5991fe66.ngrok.io/user/login',
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
    )
      .then((res) => {
        console.log('Response: ' + JSON.stringify(res))
        //Alert.alert(JSON.stringify(res.data.token))

        if (res.data.token) {
          console.log("logedIn");
          this.setState(this.isAuthenticated = true);

          const DB = {
            userId: res.data.id,
            token: res.data.token
          };
          console.log('DB: ' + JSON.stringify(DB));
          this.setState(this.user = DB)
          
          //console.log('user: '+JSON.stringify(DB));
          // that.props.navigation.push("Scrambler", user);
          // {() => navigate('Scrambler', user)}
          //this.props.navigation.navigate("Scrambler", user);
        }
      }).catch(error => {
        console.log(JSON.stringify(error))
        Alert.alert(JSON.stringify(error.message))
      });

    // console.log(email);
    // console.log(password);
    // await AsyncStorage.setItem("email", email);
    // await AsyncStorage.setItem("password", password);
    // this.props.navigation.navigate("Scrambler");
  }


  render() {
    return (
      <View  style={styles.container}>
{
          this.isAuthenticated ? 

          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Scrambler')}>
            <Text style={styles.buttonText}>Scrambler page</Text>
          </TouchableOpacity>

          :


          <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          autoCapitalize="none"
          keyboardType='email-address'
          autoCorrect={false}
          //value={this.state.email}
          //ref= {(email)=> this.email = email}
          //onSubmitEditing = {()=> this.password.focus()}
          onChangeText={val => this.onChangeText('email', val)}
          returnKeyType="next"
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          //value={this.state.passwordl}
          //ref= {(password)=> this.password = password}
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
            }

        
         
          
        
        {/* {this.state.isAuthenticated ?
        <Text>login ok</Text>
        {this.props.navigation.navigate('Scrambler')}
        : null} */}


        {/* {this.isAuthenticated ? this.props.navigation.navigate('Scrambler', this.user) : null} */}


        {/* {() => navigate('Scrambler', user)} this.props.navigation.navigate('Scrambler', this.user )*/}

      </View>

    );
  }
}
