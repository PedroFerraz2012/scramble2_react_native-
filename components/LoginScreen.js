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
} from 'react-native';
import styles from './styles';

export default class LoginScreen extends Component {

  //setting global variable for login
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      //isAuthenticated = false,
    };
  }
  //using navigation
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#FFF212",
      elevation: null,
      title: 'Login',
    },
    
  };


  async onLoginPress() {
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    this.props.navigation.navigate("Scrambler");
  }

  render() {
    return (
      <View style={styles.container}>


        
        <TextInput
          style={styles.input}
          placeholder="Type your email"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={this.state.passwordl}
          onChangeText={password => this.setState({ password })}
        ></TextInput>

        <View style={styles.line}>
          <CheckBox></CheckBox>
          <Text style={styles.text}>Remember me</Text>


          <TouchableOpacity onPress={this.onLoginPress.bind(this)}>
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






      </View>

    );
  }
}
