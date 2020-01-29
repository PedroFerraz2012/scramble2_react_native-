import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ThemeProvider,
  Icon
} from 'react-native';
import styles from './styles.js';

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
  constructor() {
    super();
    this.state = {
      avatarSource: null,
      name: null,
      hint: null,
      pswd: null,
      
    };
  }


  //pick picture selecting from camera or gallery
  /*
  selectImage = async () => {
    ImagePicker.showImagePicker({ noData: true, mediaType: 'photo' }, (response) => {
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
  */

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
  /*
    picButtons(props) {
      if (hasPic) {
        return (
          <View style={styles.line}>
            <TouchableOpacity style={styles.roundedButton} onPress={this.takePicture}>
              <Image style={styles.imageBtn} source={require('../assets/imgs/blindBtn.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedButton} onPress={this.takePicture}>
              <Image style={styles.imageBtn} source={require('../assets/imgs/seeBtn.png')}></Image>
            </TouchableOpacity>
          </View>);
      };
      return (<Text>take a picture</Text>);
    }
  */




  static navigationOptions = {

    headerStyle: {
      backgroundColor: "#FFF212",
      elevation: null,
      title: 'Dashboard',
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image>

        <View style={styles.line}>
          <Text style={styles.allText}>Pick a picture</Text>
          <TouchableOpacity style={styles.roundedButton} onPress={this.takePicture}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton} onPress={this.pickLibrary}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/addPicture.png')} ></Image>
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
          <TouchableOpacity style={styles.button} onPress={() => { }}>
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

        {/* <View style={styles.line}>
          <TextInput
            style={styles.input}
            placeholder="send to"
            value={this.state.hint}
            onChangeText={sendEmail => this.state(() => { })}
          ></TextInput>

          <TouchableOpacity style={styles.roundedButton} onPress={() => { }}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/sendBtn.png')}></Image>
          </TouchableOpacity>

        </View> */}



      </View >
    );
  }
}