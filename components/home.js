import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import styles from './styles';
//import axios from 'axios';
import LogoTitle from './LogoTitle';



class HomeScreen extends React.Component {

  componentDidMount(){
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
         // Add your logic for the transition
         this.props.navigation.navigate('Login')
    }, 500);
}

componentWillUnmount(){
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
}

    
  // myExample = () => {
  //   //Alert.alert('btn ok')
  //     //axios.get('https://acx.io:443//api/v2/tickers.json')
  //     axios.get('http://localhost:3000/products') // localhost worked!!!
  //     .then(function (response){
  //       console.log(JSON.stringify(response));
  //       Alert.alert(JSON.stringify(response))
  //     }).catch(error => {
  //       console.log(JSON.stringify(error))
  //       Alert.alert(JSON.stringify(error))
  //     })
  //   }

    //using navigation
  static navigationOptions = ({navigation, navigationOptions})=>{
    const {params} = navigation.state;

    return{
    headerStyle: {
      backgroundColor: "#FFF212",
      //elevation: null,
    },
    //headerTintColor: "#FFF212",
    //title: params ? params.otherParam : 'Login',
    //backgroundColor: "#FFF212",
    headerTitleStyle: {
      fontWeight: 'bold',
      //fontFamily: "Haetten",
      //fontWeight: "200",
      textAlign: "center",
      //flex: 1,
    },
    
    headerTitle: () => <View style={styles.line}><LogoTitle/><Text style={styles.allText}>  HOME</Text></View>
  };}

    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        {/* <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image> */}
        
        
        <TouchableOpacity style={styles.button} onPress={() => navigate('Login')}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>

        
        </View>
      );
    }
  }

  export default HomeScreen;