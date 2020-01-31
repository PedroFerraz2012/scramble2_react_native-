import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import styles from './styles.js';
import LogoTitle from './LogoTitle';
import { StackNavigator } from "react-navigation";



export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: ""
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

  async onRegisterPress() {
    const { email, password, name } = this.state;
    console.log(email);
    console.log(name);
    console.log(password);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("password", password);
    this.props.navigation.navigate("Login");
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
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
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
