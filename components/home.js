import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Alert
} from 'react-native';
import styles from './styles';
import axios from 'axios';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';




class HomeScreen extends React.Component {

  componentDidMount(){
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
         // Add your logic for the transition
         this.props.navigation.navigate('Login')
    }, 1000);
}

componentWillUnmount(){
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
}

    
  myExample = () => {
    //Alert.alert('btn ok')
      //axios.get('https://acx.io:443//api/v2/tickers.json')
      axios.get('http://localhost:3000/products') // localhost worked!!!
      .then(function (response){
        console.log(JSON.stringify(response));
        Alert.alert(JSON.stringify(response))
      }).catch(error => {
        console.log(JSON.stringify(error))
        Alert.alert(JSON.stringify(error))
      })
    }

    static navigationOptions = {
      headerStyle: {
        backgroundColor: "#FFF212",
        elevation: null,
        
      },
      title: 'Welcome to'
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image>
        {/* <Button
          title="Go to Login"
          // onPress={() => navigate('Login', {name: 'Jane'})}
          //onPress={this.myExample}
          onPress={() => navigate('Login')}
        /> */}
        </View>
      );
    }
  }

  export default HomeScreen;