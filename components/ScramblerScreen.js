import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  AppRegistry,
  Alert,
  ToastAndroid
} from 'react-native';
import styles from './styles.js';
import LogoTitle from './LogoTitle';
import ImagePicker from 'react-native-image-picker';
//import axios from 'axios';
import apis from './api';

import RNFetchBlob from 'rn-fetch-blob'
import { NavigationEvents } from 'react-navigation';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  responseType: 'blob',
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};

class BlinkingText extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
 
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
      <Text style = {styles.message}>{display}</Text>
    );
  }
}

export default class ScramblerScreen extends Component {

  state = { isLoading: false }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
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
      headerTitle: () => <LogoTitle />
    };
  }


  constructor() {
    super();
    this.state = {
      avatarSource: null,
      photo: null,
      name: null,
      hint: null,
      pswd: null,
      userId: null,
      token: null,
      isAuthenticated: null,
    };
  }


  // Launch Camera:
  takePicture = async () => {

    ImagePicker.launchCamera(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({
          avatarSource: response.uri,
          photo: response.data
        });
      }
    });
  }

  // Open Image from Library:
  pickLibrary = async () => {
    ImagePicker.launchImageLibrary(options, (response) => {

      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({
          avatarSource: response.uri,
          photo: response
        });
        // console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\n')
        //console.log(response)
      }
    });
  }


  savePicRNfetch = (userId, token) => {
    if (userId) {
      this.onChangeText('isLoading', true)
      //console.log("name: " + this.state.name + ' hint: ' + this.state.hint + ' pswd: ' + this.state.pswd)

      RNFetchBlob.fetch('POST', apis.apiURL + '/pictures', {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      }, [
        
        // part file from storage, example:
        //{ name : 'avatar', filename : 'avatar.png', type:'image/jpg', data: RNFetchBlob.wrap(path_to_a_file)},
        { name: 'userPicture', filename: this.state.photo.fileName, type: this.state.photo.type, data: RNFetchBlob.wrap(this.state.photo.uri) },
        // elements without property `filename` will be sent as plain text, example:
        // { name : 'name', data : 'user'},
        { name: 'user', data: userId },
        { name: 'hint', data: this.state.hint },
        { name: 'name', data: this.state.name },
        { name: 'pswd', data: this.state.pswd }
      ]).then((resp) => {
        this.onChangeText('isLoading', false)
        console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n')
        console.log(resp.data);
        this.onChangeText('isLoading', false)
        //{this.props.navigation.navigate('List')}
        if (resp.data) {
          Alert.alert("picture sent")
          this.props.navigation.navigate('List', {
            token: token,
            userId: userId})
        }

      }).catch((err) => {
        Alert.alert(JSON.stringify(err.message));
        console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n\n' + '\n' + '\n' + '\n' + '\n' + '\n')
        console.log(JSON.stringify(err));
      });
    } else {
      Alert.alert('not authenticated')
    }
  }


  render() {

    //Using the navigation prop we can get the value passed from the previous screen
    const { navigation } = this.props;            //ok
    const { navigate } = this.props.navigation;   // ok

    // passed values from navifation
    const userId = navigation.getParam('userId', '');  // ok
    const token = navigation.getParam('token', 'NO-token');   // ok
    //const isAuthenticated = navigation.getParam('isAuthenticated', 'false'); // ok
    //const baseAPI = navigation.getParam('baseAPI', 'NO-baseAPI'); // ok


    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => ToastAndroid.show('Refreshed', ToastAndroid.LONG)}
        />
        {this.state.isLoading &&
        <BlinkingText text='L O A D I N G' />
        }

        {/* <View>
          <Text style={styles.textStyle}>User ID: {JSON.stringify(userId)}</Text>
          <Text style={styles.textStyle}>Token: {JSON.stringify(token)}</Text>
          <Text style={styles.textStyle}>isAuthenticated: {JSON.stringify(isAuthenticated)}</Text>
          <Text style={styles.textStyle}>baseAPI: {JSON.stringify(baseAPI)}</Text>
        </View> */}

        <View style={styles.line}>
          <Text style={styles.allText}>Pick a picture</Text>
          <TouchableOpacity style={styles.roundedButton} onPress={this.takePicture}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={this.pickLibrary}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/addPicture.png')} ></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}
            onPress={() => navigate('List', { token: token, userId: userId})}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/seeBtn.png')}></Image>
          </TouchableOpacity>

        </View>


        <View style={styles.inputContainer}>

          {this.state.avatarSource &&

            <TextInput
              style={styles.inputStyle}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholder="Picture Name"

            />}
          {this.state.name &&
            <Image style={styles.imageBtnSmall} source={require('../assets/imgs/okBtn.png')}></Image>
          }
        </View>

        <View style={styles.inputContainer}>
          {this.state.name &&

            <TextInput
              style={styles.inputStyle}
              value={this.state.pswd}
              placeholder="Give it a password"
              onChangeText={pswd => this.setState({ pswd })}
            ></TextInput>

          }
          {this.state.pswd &&
            <Image style={styles.imageBtnSmall} source={require('../assets/imgs/okBtn.png')}></Image>
          }

        </View>

        <View style={styles.inputContainer}>
          {this.state.pswd &&

            <TextInput
              style={styles.inputStyle}
              value={this.state.hint}
              placeholder="Give it a hint for password"
              onChangeText={hint => this.setState({ hint })}
            ></TextInput>}

          {this.state.hint &&
            <Image style={styles.imageBtnSmall} source={require('../assets/imgs/okBtn.png')}></Image>
          }

        </View>


        {/* {this.state.hint && // saving using AXIOS METHOD
          <View style={styles.line}>
            <TouchableOpacity style={styles.button} onPress={() => { this.savePicture(userId, token, baseAPI) }}>
              <Text style={styles.buttonText}>SAVE PICTURE</Text>
            </TouchableOpacity>
          </View>
        } */}

        {this.state.hint && // saving using RNfetch method
          <View style={styles.line}>
            <TouchableOpacity style={styles.button} onPress={() => { this.savePicRNfetch(userId, token) }}>
              <Text style={styles.buttonText}>SAVE PICTURE</Text>
            </TouchableOpacity>
          </View>

        }



        {this.state.avatarSource &&
          <View style={styles.whiteBox}>
            <Image source={{ uri: this.state.avatarSource }}
              style={{ width: '90%', height: '100%', resizeMode: 'contain' }}
            />
          </View>
        }

      </View >
    );
  }
}
AppRegistry.registerComponent("Scrambler", () => Scrambler);