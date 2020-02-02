import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';
import styles from './styles.js';
import LogoTitle from './LogoTitle';
import ImagePicker from 'react-native-image-picker';


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class ScramblerScreen extends Component {

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
      name: null,
      hint: null,
      pswd: null,
      //userId: user 
    };
  }


  // Launch Camera:
  takePicture = async () => {

    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({
          avatarSource: response.uri,
          //hasPic: true,
        });
      }
    });
  }

  // Open Image from Library:
  pickLibrary = async () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {

        this.setState({
          avatarSource: response.uri,
          //hasPic: true,
        });

      }
    });
  }



  

  render() {

    {/*Using the navigation prop we can get the 
              value passed from the previous screen*/}  
              const { navigation } = this.props;   //ok
              //const user_name = navigation.getParam('userName', 'NO-User');  
    const { navigate } = this.props.navigation; // ok
    const userId = navigation.getParam('userId', 'NO-User'); // ok
    const token = navigation.getParam('token', 'NO-token'); // ok
    const isAuthenticated = navigation.getParam('isAuthenticated', 'false'); // ok

    
    return (
      <View style={styles.container}>

        <View> 
    <Text style={styles.textStyle}>User ID: {JSON.stringify(userId)}</Text>
    <Text style={styles.textStyle}>Token: {JSON.stringify(token)}</Text>
    <Text style={styles.textStyle}>isAuthenticated: {JSON.stringify(isAuthenticated)}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.allText}>Pick a picture</Text>
          <TouchableOpacity style={styles.roundedButton} onPress={this.takePicture}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={this.pickLibrary}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/addPicture.png')} ></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={() => navigate('List')}>
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




        {this.state.hint &&
          <View style={styles.line}>
            <TouchableOpacity style={styles.button} onPress={this.savePicture}>
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