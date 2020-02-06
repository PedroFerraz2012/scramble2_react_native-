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



class Refresh extends React.Component {

  componentDidMount(){
    // Start counting when the page is loaded
    this.timeoutHandle = setTimeout(()=>{
         // Add your logic for the transition
         this.props.navigation.navigate('List')
    }, 10);
}

componentWillUnmount(){
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
}

    
 

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
        

          
        </View>
      );
    }
  }

  export default Refresh;