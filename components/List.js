import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Icon,
  Button,
  AppRegistry
} from 'react-native';
import styles from './styles';
//import axios from 'axios';
import LogoTitle from './LogoTitle';



export default class List extends Component {

  //using navigation
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    //const {navigate} = this.props.navigation;

    return {
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



      headerTitle: () => <View style={styles.line}>
        <LogoTitle />
        <Text style={styles.allText}>  LIST</Text>
      </View>
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.line}>
        {/* <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image> */}

        <Text style={styles.allText}
          onPress={() => navigate('Login')}>
          Login</Text>

        <TouchableOpacity style={styles.roundedButton} onPress={() => navigate('Scrambler')}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>
        
      </View></View>
    );
  }
}
AppRegistry.registerComponent("List", () => List);
