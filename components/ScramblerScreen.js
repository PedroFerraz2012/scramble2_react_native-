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



  state = {
    avatarSource: null,
    //hasPic: false,
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

  //inserting hint to unscramble the image
  state = {
    hint: '',
  }

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

        <View style={styles.whiteBox}>
          {
            //to see the image and buttons
            this.state.avatarSource &&

            <Image source={{ uri: this.state.avatarSource }}
              style={{ width: '90%', height: 200, resizeMode: 'contain' }}
            />
          }
        </View>
        {/* <View style={styles.line}>
          <TouchableOpacity style={styles.roundedButton} onPress={()=>{
            imgScramble({
              image:this.state.avatarSource, // source
              seed:'Kappa', // seed
              sliceSize:5, // slice size
              dest:this.state.avatarSource // dest
          },function(err){
              
          })
          }}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/blindBtn.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedButton} onPress={()=>{}}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/seeBtn.png')}></Image>
          </TouchableOpacity>
        </View> */}



        <View style={styles.line}>
          <TextInput
            style={styles.input}
            placeholder="give it a hint or not"
            value={this.state.hint}
            onChangeText={hint => this.state(() => { })}
          ></TextInput>

          <TouchableOpacity style={styles.roundedButton} onPress={() => { }}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/okBtn.png')}></Image>
          </TouchableOpacity>

        </View>

        <View style={styles.line}>
          <TextInput
            style={styles.input}
            placeholder="send to"
            value={this.state.hint}
            onChangeText={sendEmail => this.state(() => { })}
          ></TextInput>

          <TouchableOpacity style={styles.roundedButton} onPress={() => { }}>
            <Image style={styles.imageBtn} source={require('../assets/imgs/sendBtn.png')}></Image>
          </TouchableOpacity>

        </View>
        


      </View>
    );
  }
}