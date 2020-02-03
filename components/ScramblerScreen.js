import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  AppRegistry,
  Alert
} from 'react-native';
import styles from './styles.js';
import LogoTitle from './LogoTitle';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

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
      photo: null,
      name: null,
      hint: null,
      pswd: null,
      userId: null,
      token: null,
      isAuthenticated: null,
      baseAPI: null,

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
          photo: response.data,
          //hasPic: true,
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
          photo: response,
          //hasPic: true,
        });
        console.log(response)
      }
    });
  }

  // savePicture = (userId,token,baseAPI) => {

  //   if (!userId) {
  //     return Alert.alert('not authenticated')
  //   } else {
  //     axios.post(
  //       baseAPI + '/pictures',
  //       {
  //         user: userId,
  //         name: this.state.name,
  //         hint: this.state.hint,
  //         pswd: this.state.pswd,
  //         userPicture: this.state.photo,
  //       },
  //       {
  //         headers: {
  //           //'Accept': 'application/json',
  //           'Content-Type': 'multipart/form-data',
  //           'authorization': 'Bearer '+token
  //         }
  //       }
  //     ).then((res) => {

  //       console.log('Response: ' + JSON.stringify(res))

  //       // if (res.data.token) {
  //       //   console.log("picure sent");
  //       //   console.log(res.data)
  //       // const DB = {
  //       //   userId: res.data.id,
  //       //   token: res.data.token,
  //       //   isAuthenticated: true
  //       // };
  //       // console.log(DB)
  //       // console.log('DB: ' + JSON.stringify(DB));

  //       // this.props.navigation.navigate('Scrambler', {
  //       //   userId: res.data.id,
  //       //   token: res.data.token,
  //       //   isAuthenticated: true,
  //       //   baseAPI: this.state.baseAPI
  //       // })

  //       //this.saveState(DB)
  //       //}
  //     }).catch((error) => {
  //       Alert.alert(JSON.stringify(error.message));
  //       console.log(JSON.stringify(error));

  //     });

  //   }
  // }


  // savePicture = async (userId,token,baseAPI) => {

  //   if (userId)  {
  //     axios.post(
  //       baseAPI + '/pictures',
  //       {
  //         user: userId,
  //         name: this.state.name,
  //         hint: this.state.hint,
  //         pswd: this.state.pswd,
  //         userPicture: this.state.photo,
  //       },
  //       {
  //         headers: {
  //           'Accept': 'multipart/form-data',
  //           'Content-Type': 'multipart/form-data',
  //           'authorization': 'Bearer '+token
  //         }
  //       }
  //     ).then((res) => {
  //       console.log('Response: ' + JSON.stringify(res))
  //       if (res.data.message == "Created Picture successfully") {
  //         Alert.alert("picure sent");}

  //     }).catch((error) => {
  //       Alert.alert(JSON.stringify(error.message));
  //       console.log(JSON.stringify(error));

  //     });
  //   }else {
  //     return Alert.alert('not authenticated')
  //   }
  // }

  savePicture = async (userId, token, baseAPI) => {

    console.log(baseAPI)
    if (userId) {
      const formData = new FormData();
      
      formData.append("userPicture", {  uri: this.state.avatarSource+'/'+this.state.photo.fileName,
                                        name: this.state.photo.fileName,
                                        type: this.state.photo.type
      });

      formData.append( "name", this.state.name); // ok
      formData.append( "hint", this.state.hint); // ok
      formData.append( "pswd", this.state.pswd); // ok
      formData.append( "user", userId); // ok
    


      //console.log("FORM-DATA " + formData);
      console.log("FORM-DATA STRINGIFY " + JSON.stringify(formData));
      //FORM-DATA [object Object]
      //{"_parts": [["", [Object]]]}
      //FORM-DATA STRINGIFY {"_parts":[["userPicture",{"uri":"content://media/external/images/media/2779/IMG-20200203-WA0001.jpg","name":"IMG-20200203-WA0001.jpg","type":"image/jpeg"}],["name","Gv"],["hint"," X"],["pswd","Xx"],["user","5e2a9d50276334105e4f8637"]]}
      axios.post(
        baseAPI + '/pictures',
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            'authorization': 'Bearer ' + token
          },
          method: "POST",
          body: formData._parts[0][0],
        }

      ).then((res) => {
        console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n')
        console.log(+ JSON.stringify(res));

        if (res.data.message == "Created Picture successfully") {
          Alert.alert("picture sent");
        }

      }).catch((error) => {
        Alert.alert(JSON.stringify(error.message));
        console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n\n' + '\n' + '\n' + '\n' + '\n' + '\n')
        console.log(JSON.stringify(error));

      });
    } else {
      return Alert.alert('not authenticated')
    }
  }


  render() {

    //Using the navigation prop we can get the value passed from the previous screen
    const { navigation } = this.props;   //ok
    const { navigate } = this.props.navigation;               // ok

    // passed values
    const userId = navigation.getParam('userId', '');  // ok
    const token = navigation.getParam('token', 'NO-token');   // ok
    const isAuthenticated = navigation.getParam('isAuthenticated', 'false'); // ok
    const baseAPI = navigation.getParam('baseAPI', 'NO-baseAPI'); // ok

    // this.setState({
    //       userId: xuserId,
    //       token: xtoken,
    //       isAuthenticated: xisAuthenticated,
    //       baseAPI: xbaseAPI
    //     });

    // this.setState({
    //   userId: navigation.getParam('userId', 'NO-User'),
    //   token: navigation.getParam('token', 'NO-token'),
    //   isAuthenticated: navigation.getParam('isAuthenticated', 'false'),
    //   baseAPI: navigation.getParam('baseAPI', 'NO-baseAPI')
    // });
    //this.setState({userId: navigation.getParam('userId')})

    // () => this.setState({
    //   userId: navigation.getParam('userId'),
    //   token: navigation.getParam('token', 'NO-token'),
    //   isAuthenticated: navigation.getParam('isAuthenticated', 'false'),
    //   baseAPI: navigation.getParam('baseAPI', 'NO-baseAPI')
    // })


    return (
      <View style={styles.container}>

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
            <TouchableOpacity style={styles.button} onPress={() => { this.savePicture(userId, token, baseAPI) }}>
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