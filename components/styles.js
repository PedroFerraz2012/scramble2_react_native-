
//'use strict';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoText:{
  color: '#A53693',
  fontWeight: 'bold',
  padding:40,
  fontSize:40,
  fontFamily: 'Haetten',
  },
  logo:{
    width: '80%',
    padding: 0,
    resizeMode: 'contain',
    marginTop: -50,
  },
  allText:{
    color: '#201E1E',
    fontWeight: 'bold',
    padding:15,
    fontSize:15,
    fontFamily: 'Arial',
    },
  text:{
    color: '#201E1E',
    //fontWeight: 'bold',
    padding:20,
    fontSize:12,
    fontFamily: 'Arial',
  },
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    padding: 10,
    margin: 20,
  },
  button: {
    height: 45,
    backgroundColor: '#A53693',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: "center",
    fontWeight: 'bold',
  },
  imageBtn:{
    width: 35,
    height: 35,
  },
roundedButton:{
  padding:10,
},
container: {
  flex: 1.2,
  //justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#FFF212",
  padding: 10,
},
logoContainer: {
  alignItems: "center",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
},
subtext: {
  color: "#848688",
  width: 160,
  textAlign: "center",
  fontSize: 35,
  fontWeight: "bold",
  marginTop: 20,
},
whiteBox: {
  width: '90%',
  height: 200,
  borderWidth: 1,
  borderColor: 'white',
},


})

export default styles;