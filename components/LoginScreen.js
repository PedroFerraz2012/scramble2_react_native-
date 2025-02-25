import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import LogoTitle from './LogoTitle';
import apis from './api';
import AsyncStorage from '@react-native-community/async-storage';

class BlinkingText extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // Change the state every second 
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    },
      // Define any blinking time.
      300);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text style={styles.message}>{display}</Text>
    );
  }
}


export default class LoginScreen extends Component {

  state = { email: '', password: '', pageTitle: 'LOGIN', isLoading: false }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      isLoading: false,
      isAuthenticated: false,
    }
  }


  //using navigation
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      headerStyle: {
        backgroundColor: "#FFF212"
      },

      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: "center",
      },
      title: 'LOGIN',
      headerTitle: () => <View style={styles.line}><LogoTitle /><Text style={styles.allText}>  LOGIN</Text></View>
    };
  }



  Login = () => {
    this.onChangeText('isLoading', true)

    // axios.post(
    //   // this.state.baseAPI+'/user/login',
    //   api+'/user/login',
    const user = {
      email: this.state.email,
      password: this.state.password,
      Headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    //console.log(user);
    apis.login(user)

      .then((res) => {

        console.log('Response: ' + JSON.stringify(res))

        if (res.data.token) {
          console.log("logedIn");
          console.log(res.data)
          const DB = {
            userId: res.data.id,
            token: res.data.token,
            isAuthenticated: true
          };
          console.log(DB)
          console.log('DB: ' + JSON.stringify(DB));
          this.storeData(res.data.token)
          this.onChangeText('isLoading', false)
          this.props.navigation.navigate('Scrambler', {
            userId: res.data.id,
            token: res.data.token,
            isAuthenticated: true,
          })

          //this.saveState(DB)
        }
      }).catch((error) => {
        Alert.alert(JSON.stringify(error.message));
        console.log(JSON.stringify(error));

      });
  }



  storeData = async (token) => {
    try {
      await AsyncStorage.setItem('token', token + ' ')
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    const { navigate } = this.props.navigation;


    return (

      <View style={styles.container}>


        {this.state.isLoading &&
          <BlinkingText text='L O A D I N G' />
        }
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


        <TouchableOpacity style={styles.button} onPress={this.Login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

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
