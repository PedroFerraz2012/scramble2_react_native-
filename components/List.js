import React, { Component, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
  AppRegistry,
  TextInput
} from 'react-native';
import styles from './styles';
import LogoTitle from './LogoTitle';


const MyHooks = () => {

  // MyHooks.navigationOptions = screenProps => ({
  //   //title: screenProps.navigation.getParam('name', "testing list"),
  //   headerStyle: {
  //     backgroundColor: "#FFF212",
  //     //elevation: null,
  //   },

  //   headerTitle: () =>
  //     (
  //       <View style={styles.line}>
  //         <LogoTitle />
  //         <Text style={styles.allText}>  LIST</Text>
  //       </View>),
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },

  // });
  // const { params } = navigation.state;
  // const { navigate } = this.props.navigation;
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


</View>
      </View>
  )
}


// export default class List extends Component {



//   //using navigation
//   static navigationOptions = ({ navigation, navigationOptions }) => {
//     const { params } = navigation.state;
//     //const {navigate} = this.props.navigation;

//     return {
//       headerStyle: {
//         backgroundColor: "#FFF212",
//         //elevation: null,
//       },
//       //headerTintColor: "#FFF212",
//       //title: params ? params.otherParam : 'Login',
//       //backgroundColor: "#FFF212",
//       headerTitleStyle: {
//         fontWeight: 'bold',
//         //fontFamily: "Haetten",
//         //fontWeight: "200",
//         textAlign: "center",
//         //flex: 1,
//       },

//       headerTitle: () => <View style={styles.line}>
//         <LogoTitle />
//         <Text style={styles.allText}>  LIST</Text>
//       </View>
//     };
//   }


//   render() {
//     const { navigate } = this.props.navigation;

//     return (
//       <View style={styles.container}>

//         <TextInput
//           placeholder='Course Goal'
//           onChangeText={ MyHooks.listInputHandler}
//           style={{ width: '80%', borderColor: 'black', borderWidth: 1, padding: 10 }}
//         value={ MyHooks.enteredItem }
//         />
//         <Button
//           title='Add'
//         onPress={ MyHooks.addItemHandler }
//         />

//         <View>

//         </View>


//         <View style={styles.line}>
//           {/* <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image> */}

//           <Text style={styles.allText}
//             onPress={() => navigate('Login')}>
//             Login</Text>

//           <TouchableOpacity style={styles.roundedButton} onPress={() => navigate('Scrambler')}>
//             <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
//           </TouchableOpacity>

//         </View></View>
//     );
//   }
// }




export default class List extends Component {

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


  render() {
  //const { navigate } = this.props.navigation; // it seems it isnt needed

    return (
      <View style={styles.container}>

        <MyHooks/>

        <View style={styles.line}>
          
          <Text style={styles.allText}
            onPress={() => this.props.navigation.navigate('Login') }
            
            >
            Login</Text>

          <TouchableOpacity style={styles.roundedButton}
          onPress={() => this.props.navigation.navigate('Scrambler') }
          >
            <Image style={styles.imageBtn} source={require('../assets/imgs/takePicture.png')}></Image>
          </TouchableOpacity>

        </View></View>
    );
  }
}

AppRegistry.registerComponent("List", () => List);