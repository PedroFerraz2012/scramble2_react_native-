import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image
} from 'react-native';
import styles from './styles';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';


class HomeScreen extends React.Component {
    

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
        />
        </View>
      );
    }
  }

  export default HomeScreen;