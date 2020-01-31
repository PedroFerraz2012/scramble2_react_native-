import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity
} from "react-native";
import styles from './styles';
import LogoTitle from './LogoTitle';

export default class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    headerTitle: () => <View style={styles.line}><LogoTitle/><Text style={styles.allText}>  Forgot Pswd</Text></View>
  };}

  onForgetPress() {
        this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onForgetPress.bind(this)}
        >
          <Text style={styles.buttonText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
