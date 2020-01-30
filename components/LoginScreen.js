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

export default class LoginScreen extends Component {

  state = {email:'',password:''}
  onChangeText = (key, val) => {
    this.setState({ [key]: val})
  }

  //using navigation
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FFF212",
      elevation: null,
      //title: 'Login',
    },
  };

   Login = () => {

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    //Alert.alert(JSON.stringify (user))
    api.login(user).then((res) => {

      if(res.body.token) {
      this.props.navigation.navigate("Scrambler")+this.res.id+this.res.token
    }
    })


    // console.log(email);
    // console.log(password);
    // await AsyncStorage.setItem("email", email);
    // await AsyncStorage.setItem("password", password);
    // this.props.navigation.navigate("Scrambler");
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

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

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Scrambler')}>
          <Text style={styles.buttonText}>Scrambler page</Text>
        </TouchableOpacity>

        {this.state.isAuthenticated ? <Text>login ok</Text> : null}






      </KeyboardAvoidingView>

    );
  }
}
