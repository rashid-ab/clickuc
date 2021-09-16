import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  
} from 'react-native';
import {
  AdMobBanner,
} from 'react-native-admob-alpha'
import Ad from '../components/Ad'
import Loader from '../components/Loader'
import Header from '../components/header';
import url from '../components/url'
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      Loadingvisible:false
    }
  }
  onClickListener =async (event) => {
    if(event=='login'){
      let user = await AsyncStorage.getItem('user')
      user = JSON.parse(user);
      if(this.state.password==''){
        return alert('Enter Your Password')
      }
      this.setState({Loadingvisible:true})
      axios({
        method: "POST",
        url: url + "change_password",
        data: {
          email: user.email,
          password: this.state.password,
          token:user.token,
        }
      })
      .then(async({ data: response }) => {
        if(response.message=='failure'){
            alert('Your Token is expire. Please login again')
            await AsyncStorage.setItem('user','');
            await AsyncStorage.setItem('fcmtoken','');
          this.props.navigation.replace('Login')
        }
          if(response.message=='success'){
            alert(response.data)
            this.props.navigation.replace('Login')
            this.setState({ Loadingvisible: false,password:'' });
          }
          else{
            this.setState({ Loadingvisible: false });
            alert('Something Wrong!')
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    }
    if(event=='signup'){
    this.props.navigation.navigate('SignUp')
    }
    
  }
  render() {
    return (
      
      <View style={styles.container}>
        <Header navigation={this.props.navigation} route={this.props.route.name}/>
        <Loader visible={this.state.Loadingvisible} />
        <View style={styles.body}>
        <Text style={styles.logo}>Change Password</Text>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              placeholder="Password..." 
              placeholderTextColor='#989997'
              secureTextEntry={true} 
              onChangeText={password => this.setState({password:password})}/>
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>
        </View>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.banner_id}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  },
  body:{
    flex:.92,
    justifyContent:'center',
    alignItems:'center'
  },
  logo:{
    fontWeight:"bold",
    fontSize:hp('4%'),
    color:"#4B937A",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#1A1A1A",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#4B937A",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});     