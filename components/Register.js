import React, { Component } from "react";
import {
  AppRegistry,
  //StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  //Image,
  //KeyboardAvoidingView,
  //AsyncStorage,
  Alert
} from "react-native";
import styles from './styles.js';
import LogoTitle from './LogoTitle';
import { StackNavigator } from "react-navigation";
//import axios from 'axios';
import apis from './api';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      baseAPI: 'https://aa14c53d.ngrok.io'
    };
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
    headerTitle: () => <View style={styles.line}><LogoTitle/><Text style={styles.allText}>  REGISTER</Text></View>
  };}

  Register = () => {
    //Alert.alert('btn register ok')

    const signup = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
    }
    const headers = {
      Headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    apis.signUp(signup,headers)

    .then((res) => {
      
      console.log('Response: ' + JSON.stringify(res))
      
      if (res.data.message == 'User created') {
        console.log("registered new, just log in");
        console.log(res.data)
        

        this.props.navigation.navigate('Login')
      }
    }).catch((error) => {
      console.log(JSON.stringify(error));
      if(error.message == "Request failed with status code 409")
      {Alert.alert("this email is already registered");}
      else{Alert.alert(JSON.stringify(error.message));}
       });}


       

  async onRegisterPress() {

    if(this.state.password_confirmation === this.state.password){
      this.Register()
    }else { Alert.alert('check your password, confirmation has to match')}

  }

  render() {
    return (
      <View style={styles.container}>
        
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Name"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password_confirmation}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            autoCapitalize="none"
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        
        <TouchableHighlight
          onPress={this.onRegisterPress.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}



AppRegistry.registerComponent("Register", () => Register);
