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

import styles from './styles';
import LogoTitle from './LogoTitle';
import axios from 'axios';
import apis from './api';

const MyHooks = () => {
  // using useState to manage state array
  const [enteredItem, setEnteredItem] = useState('');
  const [newList, setList] = useState([]);


  const listInputHandler = (enteredText) => {
    setEnteredItem(enteredText);
  };

  const addItemHandler = () => {
    console.log(enteredItem);
    //...newList gets the existing array, next add new element

    setList([...newList, enteredItem]);
    setEnteredItem('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <TextInput
          placeholder='add item to list'
          onChangeText={listInputHandler}
          style={{ width: '80%', borderColor: 'black', borderWidth: 1, padding: 10 }}
          value={enteredItem}
        />
        <Button
          title='Add'
          onPress={addItemHandler}
        />

      </View>

      <View>
        {/* mapping list */}
        {newList.map((go) => <Text>{goal}</Text>)}
      </View>
    </View>
  )
}

// const GetUsers = async () => {
//   const [users, setList] = useState([]); //hooks

//   //Alert.alert("getUser accessed")
//   axios.get(
//     'https://aa14c53d.ngrok.io/user'
//   ).then((res) => {
//     console.log('Response.data.users: ' + JSON.stringify(res.data.users))
//     res.data.users.map((usersList) => console.log(usersList._id))//testing data
//     res.data.users.map((usersList) => setList([...users, usersList._id]))//testing data
//   }).catch((error) => {
//     //Alert.alert(JSON.stringify(error.message));
//     console.log(JSON.stringify(error));
//   });
// if(res){
//   return (
//     <View>
//       <Text>Test</Text>
//       {users.map((usersList) => <Text key={usersList}>{usersList}</Text>)}
//     </View>
//   )}
// }



export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentUser: '',
      users: [],
      pictures: [],
      baseAPI: 'https://aa14c53d.ngrok.io',
      selectedUser: '',
    }
  }

  //getUsers = this.getUsers.bind(this);

  //setting navigation
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    //onst {navigate} = this.props.navigation;

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

        //mapping and rendering
        // res.data.pictures.map((picList) =>{
        //   console.log(picList.userPicture)
        //   return {
        //     user: picList.user,
        //     name: picList.name,
        //     hint: picList.hint,
        //     userPicture: picList.userPicture,
        //     _id: picList._id,
        //     pswd: picList.pswd,
        // } } )

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



  render() {
    //const { navigate } = this.props.navigation; // it seems it isnt needed

    return (

      <View style={styles.container}>

        {/* <MyHooks /> */}
        <Picker
          selectedValue={this.state.selectedUser}
          style={{ height: 40, width: '100%', backgroundColor: '#A53693' }}
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
<View style={{marginTop:10}}>
            <View style={styles.line} key={go._id} >

              <View style={styles.smallContainer}>

                <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Scrambler')}
                >
                  <Image style={styles.iconSmall} source={require('../assets/imgs/delete.png')}></Image>
                </TouchableOpacity>

                <TouchableOpacity
                // onPress={() => this.props.navigation.navigate('Scrambler')}
                >
                  <Image style={styles.iconSmall} source={require('../assets/imgs/seeBtn.png')}></Image>
                </TouchableOpacity>
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
          placeholder="Guess password to see the picture"
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