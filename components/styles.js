
//'use strict';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    marginBottom: 5
  },

  logoText:{
  color: '#A53693',
  fontWeight: 'bold',
  padding:20,
  fontSize:40,
  fontFamily: 'Haetten',
  },
  logo:{
    width: '80%',
    padding: 0,
    resizeMode: 'contain',
    marginTop: -60,
    marginBottom: -60
  },
  allText:{
    color: '#201E1E',
    fontWeight: 'bold',
    padding:8,
    fontSize:15,
    fontFamily: 'Haetten, Arial',
    },
  text:{
    color: '#201E1E',
    //fontWeight: 'bold',
    padding:20,
    fontSize:12,
    fontFamily: 'Arial',
  },
  input: {
    height: 40,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    padding: 10,
    margin: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    marginBottom: -15
  },

  button: {
    height: 40,
    backgroundColor: '#A53693',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: "center",
    fontWeight: 'bold',
    marginTop: -5,
  },

  imageBtn:{
    width: 35,
    height: 35,
  },

  imageBtnSmall:{
    width: 25,
    height: 25,
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
  fontSize: 30,
  fontWeight: "bold",
  marginTop: 5,
  marginTop: -20
},
whiteBox: {
  alignItems: "center",
  width: '90%',
  height: 170,
  borderWidth: 0,
  padding: 0,
},


})

export default styles;