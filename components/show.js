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
 
import apis from './api';

class Show extends React.Component {

  




  //using navigation
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
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

      headerTitle: () => <View style={styles.line}><LogoTitle /><Text style={styles.allText}>  Unscrambled</Text></View>
    };
  }

  render() {

    const { navigation } = this.props;
    const { navigate } = this.props.navigation;

    // passed values
    const pic = navigation.getParam('pic', 'NO-pic');


    return (
      <View style={styles.container}>


        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          source={{ uri: apis.apiURL + '/' + pic }}
        />


      </View>
    );
  }
}

export default Show;