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
import apis from './api';

import RNFetchBlob from 'rn-fetch-blob'

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  responseType: 'blob',
  storageOptions: {
    skipBackup: true,
    path: 'images',

  },
};

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

    if (userId) {

      this.onChangeText('isLoading', true)


      console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\n' + '\nSTARTING UPLOADING')
      // var RNFS = require('react-native-fs');

      // var uploadUrl = apis.apiURL + '/pictures';
      // // create an array of objects of the files you want to upload
      // var files = [
      //   {
      //     name: 'userPicture',
      //     filename: this.state.photo.fileName,
      //     filepath: this.state.photo.path,
      //     filetype: this.state.photo.type
      //   }
      // ];

      // var uploadBegin = (response) => {
      //   var jobId = response.jobId;
      //   console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
      // };

      // var uploadProgress = (response) => {
      //   var percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      //   console.log('UPLOAD IS ' + percentage + '% DONE!');
      // };

      // RNFS.uploadFiles({
      //   toUrl: uploadUrl,
      //   files: files,
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //     'authorization': 'Bearer ' + token
      //   },
      //   body: {
      //     "name": this.state.name,
      //     "hint": this.state.hint,
      //     "pswd": this.state.pswd,
      //     "user": userId,
      //   },
      //   begin: uploadBegin,
      //   progress: uploadProgress
      // }).promise.then((response) => {
      //   if (response.statusCode == 201) {
      //     console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
      //     this.onChangeText('isLoading', false)
      //   } else {
      //     console.log('SERVER ERROR');
      //     this.onChangeText('isLoading', false)
      //   }
      // })
      //   .catch((err) => {
      //     if (err.description === "cancelled") {
      //       // cancelled by user
      //       console.log('cancelled by user');
      //       this.onChangeText('isLoading', false)
      //     }
      //     console.log(err);
      //     this.onChangeText('isLoading', false)
      //   });
      //   this.onChangeText('isLoading', false)
      // }
      var image = this.state.photo
      image.src = URL.createObjectURL(this.state.photo[0]);
      const newPicture = new FormData();

      newPicture.append('userPicture',
        image.src, this.state.photo.fileName)

      // newPicture.append('body', {
      //   name: this.state.name,
      //   hint: this.state.hint,
      //   pswd: this.state.pswd,
      //   user: userId,
      // })

      //submitForm("multipart/form-data", formData, (msg) => console.log(msg));

      // const data = {
      //   name: this.state.name,
      //   hint: this.state.hint,
      //   pswd: this.state.pswd,
      //   user: userId,
      //   file: this.state.photo.path
      // };
      const options = {
        name: this.state.name,
        hint: this.state.hint,
        pswd: this.state.pswd,
        user: userId,

        // file: [(options, headers) => {
        //   options.append(this.state.avatarSource)
        //   return data;
        // }]
      };

      // var data2 = new FormData();

      // data2.append({
      //   name: this.state.name,
      //   hint: this.state.hint,
      //   pswd: this.state.pswd,
      // })


      // data2.append(options);
      // data2.append("userPicture", fs.createReadStream(this.state.photo.path), { knownLength: fs.statSync(this.state.photo.path).size });
      // data2.append({
      //   userPicture: this.state.photo,
      //   name: this.state.name,
      //         hint: this.state.hint,
      //         pswd: this.state.pswd,
      //         user: userId,
      // });

      //console.log("DATA "+JSON.stringify(data2))
      // console.log("DATA ._parts "+JSON.stringify(data2._parts))
      // console.log("DATA ._parts[0] "+JSON.stringify(data2._parts[0].name))
      //console.log("DATA ._parts[1] "+JSON.stringify(data2._parts[1]))


      axios.post(
        apis.apiURL + '/pictures',

        {
          name: this.state.name,
          hint: this.state.hint,
          pswd: this.state.pswd,
          user: userId,
        },
        //newPicture,




        {// headers are ok
          headers: {
            'Accept': 'application/json',
            //'Accept': '*/*',
            'Content-Type': 'multipart/form-data',

            //'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
          }
        }
      )
        .then((res) => {

          console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n')
          console.log(+ JSON.stringify(res));
          this.onChangeText('isLoading', false)
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

  savePicRNfetch = (userId, token) => {
    if (userId) {
      this.onChangeText('isLoading', true)

    RNFetchBlob.fetch('POST', apis.apiURL + '/pictures', {
      Authorization: 'Bearer ' + token,
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      // element with property `filename` will be transformed into `file` in form data
      //{ name: 'userPicture', filename: this.state.photo.fileName, type: this.state.photo.type, data: binaryDataInBase64 },
      // part file from storage
      //{ name : 'avatar-foo', filename : 'avatar-foo.png', type:'image/foo', data: RNFetchBlob.wrap(path_to_a_file)},
      { name: 'userPicture', filename: this.state.photo.fileName, type: this.state.photo.type, data: RNFetchBlob.wrap(this.state.photo.uri) },
      // elements without property `filename` will be sent as plain text
      // model: { name : 'name', data : 'user'},
      {
        name : 'name', data : this.state.name,
        name : 'hint' , data : this.state.hint,
        name : 'pswd' , data : this.state.pswd,
        name : 'user' , data : userId
      },
      {
        name: 'info', data: JSON.stringify({
          mail: 'example@example.com',
          tel: '12345678'
        })
      },
    ]).then((resp) => {
      this.onChangeText('isLoading', false)
      console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n')
      console.log(resp.data);
      this.onChangeText('isLoading', false)
      
      if (resp.data) {
        Alert.alert("picture sent");
      }

    }).catch((err) => {
      Alert.alert(JSON.stringify(err.message));
      console.log('\n' + '\n' + '\n' + '\n' + '\n' + '\n\n' + '\n' + '\n' + '\n' + '\n' + '\n')
      console.log(JSON.stringify(err));
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


    return (
      <View style={styles.container}>

        {this.state.isLoading &&
          <Text style={styles.message}>L O A D I N G</Text>
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