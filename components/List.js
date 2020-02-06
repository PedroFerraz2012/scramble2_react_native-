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

  state = { toDelete: '', token: ''}

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
    //Alert.alert('BTN')
    this.Delete()
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: '',
      users: [],
      pictures: [],
      selectedUser: '',
      toDelete:'',
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
      res.data.users.map((usersList) => console.log(usersList._id))//testing data

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
      const value = await AsyncStorage.getItem('@stoken')
      if(value !== null) {
        return value
      }
    } catch(e) {
      return ''
    }
  }
  

  Delete= ()=> {
    //Alert.alert(this.state.toDelete)

    var token = JSON.stringify (this.getData())
    if(token){
if(this.state.toDelete)
  {
    const headers = {
    Headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' +token
    }
  }

  apis.deletePic( this.state.toDelete, headers )

  .then((res) => {
    console.log('Response: ' + JSON.stringify(res))
    if (res.data.message === 'Picture deleted') {
      //console.log("Picture deleted");
      console.log(res.data);
      Alert.alert('picture deleted');
      {this.props.navigation.navigate('List')}
    }
  }).catch((error) => {
    console.log(JSON.stringify(error));
    Alert.alert(error);
      });
    }else Alert.alert('didnt get the picture id')
    }else Alert.alert('No token');
    }



  render() {
    
    //Using the navigation prop we can get the value passed from the previous screen
    const { navigation } = this.props;   //ok
    const { navigate } = this.props.navigation;               // ok

    // passed values
    const token = navigation.getParam('token', 'NO-token');   // ok
    

    return (

      <View style={styles.container}>
        <NavigationEvents
                onDidFocus={() => Alert.alert('Refreshed')}
                />


        {/* <MyHooks /> */}
        <Picker
          selectedValue={this.state.selectedUser}
          style={{ height: 40, width: '100%', backgroundColor: '#A53693', color:'white'}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedUser: itemValue })
            // make method to use axios, gettin pictures
            this.getUserPicture(itemValue)
          }

          }>


          {this.state.users.map(list =>
            <Picker.Item style={styles.allText} key={list._id} label={list._id} value={list._id} />)}
        </Picker>

        <ScrollView>
          {/* mapping list */}
          {this.state.pictures &&
            this.state.pictures.map((go) =>
              <View style={{ marginTop: 10 }}>
                <View style={styles.line} key={go._id} >

                  <View style={styles.smallContainer}>

                    <Button
                    onPress={() => this.onChangeText('toDelete', go._id) }
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
                  //onChangeText={val => this.onChangeText('email', val)}
                  //returnKeyType="go"
                  ></TextInput>


                  <TouchableOpacity
                  //onpress goes to query
                  // onPress={() => this.props.navigation.navigate('Scrambler')}
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