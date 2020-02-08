import React, { Component, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  AppRegistry,
  TextInput,
  Alert,
  Picker,
  ScrollView,
  ToastAndroid,
  Group
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import styles from './styles';
import LogoTitle from './LogoTitle';
import axios from 'axios';
import apis from './api';
import AsyncStorage from '@react-native-community/async-storage';

// const MyHooks = () => {
//   // using useState to manage state array
//   const [enteredItem, setEnteredItem] = useState('');
//   const [newList, setList] = useState([]);


//   const listInputHandler = (enteredText) => {
//     setEnteredItem(enteredText);
//   };

//   const addItemHandler = () => {
//     console.log(enteredItem);
//     //...newList gets the existing array, next add new element

//     setList([...newList, enteredItem]);
//     setEnteredItem('');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.line}>
//         <TextInput
//           placeholder='add item to list'
//           onChangeText={listInputHandler}
//           style={{ width: '80%', borderColor: 'black', borderWidth: 1, padding: 10 }}
//           value={enteredItem}
//         />
//         <Button
//           title='Add'
//           onPress={addItemHandler}
//         />

//       </View>

//       <View>
//         {/* mapping list */}
//         {newList.map((go) => <Text>{goal}</Text>)}
//       </View>
//     </View>
//   )
// }

//const toDelete = ''


export default class List extends Component {

  state = { toDelete: '', token: '', selectedUser: '', guessing: '', guessId: '' }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    //Alert.alert('BTN')
    this.Delete()
  }

  onChangeText2 = (key, val) => {
    this.setState({ [key]: val })
  }



  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: '',
      users: [],
      pictures: [],
      selectedUser: '',
      toDelete: '',
      token: null,
    }
  }


  //setting navigation
  static navigationOptions = ({ navigation, navigationOptions }) => {
    //const { params } = navigation.state;
    //const {navigate} = this.props.navigation;

    return {
      headerStyle: {
        backgroundColor: "#FFF212",
      },

      //title: params ? params.otherParam : 'Login',

      headerTitleStyle: {
        fontWeight: 'bold',
      },

      headerTitle: () => <View style={styles.line}>
        <LogoTitle />
        <Text style={styles.allText}>  LIST </Text>
      </View>
    };
  }

  getUsers = async () => {
    //const [users, setList] = useState([]); //hooks

    //Alert.alert("getUser accessed")
    apis.loadUser().then((res) => {
      console.log('Response.data.users: ' + JSON.stringify(res.data.users))
      res.data.users.map((usersList) => console.log(usersList.email))//testing data

      this.setState({
        users: res.data.users
      })

      //res.data.users.map((usersList) => setList([...users, usersList._id]))//testing data
    }).catch((error) => {
      //Alert.alert(JSON.stringify(error.message));
      console.log(JSON.stringify(error));
    });
  }

  getUserPicture = async (itemValue) => {
    //const [users, setList] = useState([]); //hooks

    //Alert.alert("getUser accessed")
    axios.get(
      apis.apiURL + '/pictures/' + itemValue
    ).then((res) => {

      console.log('Response.data: ' + JSON.stringify(res.data))

      if (res.data.count != 0) {
        console.log('Response.data.pictures: ' + JSON.stringify(res.data.pictures))

        this.setState({
          pictures: res.data.pictures
        });
        this.setState(isLoading = false);
      } else Alert.alert('select another, this one is empty')
    }
    ).catch((error) => {
      //Alert.alert(JSON.stringify(error.message));
      console.log(JSON.stringify(error));
    });
  }

  componentDidMount() {
    this.getUsers()
  }



  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        console.log('retrieve token: ' + value)
        return value
      }
    } catch (e) {
      console.log(e)
      return ''
    }
  }


  Delete = () => {
    //Alert.alert(this.state.toDelete)

    var token = JSON.stringify(this.getData())
    if (token) {
      if (this.state.toDelete) {
        const headers = {
          Headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
          }
        }

        apis.deletePic(this.state.toDelete, headers)

          .then((res) => {
            console.log('Response: ' + JSON.stringify(res))
            if (res.data.message === 'Picture deleted') {
              //console.log("Picture deleted");
              console.log(res.data);
              Alert.alert('picture deleted');
              { this.props.navigation.navigate('Refresh') }
            }
          }).catch((error) => {
            console.log(JSON.stringify(error));
            Alert.alert(error);
          });
      } else Alert.alert('didnt get the picture id')
    } else Alert.alert('No token');
  }

  
  Guess = key => event => {
    //Alert.alert('That is your guess ' + this.state.guessing + ' id: ' + key)
    // key is the whole Picture objetct
    // compare guessing with pswd
if(this.state.guessing === key.pswd){
  Alert.alert('You got it')
} else{
  Alert.alert('oh nooo! Try again')
}

  }

  render() {

    //Using the navigation prop we can get the value passed from the previous screen
    const { navigation } = this.props;   //ok
    const { navigate } = this.props.navigation;               // ok

    // passed values
    const token = navigation.getParam('token', 'NO-token');   // ok
    const userId = navigation.getParam('userId', '');  // ok

    console.log(userId)



    return (

      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() =>
            ToastAndroid.show('Refreshed', ToastAndroid.LONG
            )}
        />


        {/* <MyHooks /> */}
        <Picker
          selectedValue={this.state.selectedUser}
          style={{ height: 40, width: '100%', backgroundColor: '#A53693', color: 'white' }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedUser: itemValue })
            // gettin pictures
            this.getUserPicture(itemValue)
          }}
        >

          <Picker.Item style={styles.allText} key='empty' label='Pick user' value='0' />

          {this.state.users.map(list =>
            <Picker.Item style={styles.allText} key={list._id} label={list.email} value={list._id} />)}
        </Picker>


        <ScrollView>

          {/* mapping list */}

          {this.state.pictures &&
            this.state.pictures.map((go, index) =>
              <View style={{ marginTop: 10 }}>
                <View style={styles.line} key={go._id} >

                  <View style={styles.smallContainer}>


                    <Button
                      onPress={() => this.onChangeText('toDelete', go._id)}
                      title="x"
                      color="#841584"
                    >
                      {/* <Image style={styles.iconSmall} source={require('../assets/imgs/delete.png')}></Image> */}
                    </Button>


                    <Image style={styles.iconSmall2} source={require('../assets/imgs/seeBtn.png')}></Image>

                    <Text style={styles.timeView}>0</Text>


                  </View>

                  <View>
                    <Image style={styles.userPicture}
                      source={{ uri: apis.apiURL + '/' + go.userPicture }}
                    />
                  </View>
                  <View>
                    <Text style={styles.subTextPicView}>picture name:</Text>
                    <Text style={styles.textPicView}>{go.name}</Text>
                    <Text style={styles.subTextPicView}>hint for pswd:</Text>
                    <Text style={styles.textPicView}>{go.hint}</Text>
                  </View>
                </View>
                <View style={styles.line}>





                  <TextInput
                    style={styles.inputGuess}
                    placeholder="Guess pswd to see the pic"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={this.state.guessing}
                    onChangeText={guessing => this.setState({ guessing })}


                  //onChangeText={() => this.onChangeText2('guessing', this.state.guessing)}
                  ></TextInput>


                  <TouchableOpacity
                    onPress={this.Guess(go)}
                  >


                    <Image style={styles.imageBtn} source={require('../assets/imgs/question.png')}></Image>
                  </TouchableOpacity>
                </View>
              </View>

            )}

        </ScrollView>



        <View style={styles.line}>

          <Text style={styles.allText}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            Login</Text>

          <TouchableOpacity style={styles.roundedButton}
            onPress={() => this.props.navigation.navigate('Scrambler')}
          >
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>

        </View></View>
    );
  }
}

AppRegistry.registerComponent("List", () => List);