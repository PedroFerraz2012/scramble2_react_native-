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
        //title: ,
      },
    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/imgs/scramblerLogo.png')}></Image>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigate('Login', {name: 'Jane'})}
          //onPress={this.myExample}
          
        />
        </View>
      );
    }
  }

  export default HomeScreen;