import React from 'react';
import { StyleSheet,View,Text,ImageBackground,Image,TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage'
import Loader from '../components/Loader'
import url from '../components/url'
import axios from 'axios'
import {AlertMessage} from '../components/Alert'
const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/screen_1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/screen_2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('../assets/screen_5.png'),
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      Loadingvisible:false,
      showRealApp: false
    }
  }
  Done =async () => {
    this.setState({Loadingvisible:true})
    auth = await AsyncStorage.getItem('user')
    auth=JSON.parse(auth)
    if(auth==null){
       this.props.navigation.replace('Login');
    }
    else{
     console.log(auth)
     axios({
       method: "POST",
       url: url + 'appintro',
       data: {
         'email': auth.email,
         'token': auth.token,
       }
     })
     .then(async({ data: response }) => {
          if(response.message=='failure'){
              AlertMessage('Token Expired','Your Token Expired. Login again Please!','red')
              await AsyncStorage.setItem('user','');
              await AsyncStorage.setItem('fcmtoken','');
              this.props.navigation.replace('Login')
          }
          if(response.message=='success'){
              this.props.navigation.replace('Home');
          }
          else{
              this.props.navigation.replace('Login');
          }
       })
       .catch(async({ data: response }) => {
        this.setState({Loadingvisible:false})
         return AlertMessage('Connection Failed','Check Your Internet','red')
       });
   }
       
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={{flex:1,position:'absolute'}}>
          <Image source={item.image} style={{height:hp('100%'),width:wp('100%')}}/>
          </View>
      </View>
    );
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{color:'white'}}>Next</Text>
      </View>
    );
  };
  _renderPreButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{color:'white'}}>Prev</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle} onPress={()=>this.Done()}>
        <Text style={{color:'white'}}>Done</Text>
      </TouchableOpacity>
    );
  };
  render() {
      return (
      <View style={{flex:1}}>
        <Loader visible={this.state.Loadingvisible} />
        <AppIntroSlider
          data={slides}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderPrevButton={this._renderPreButton}
          dotStyle={{backgroundColor: '#4B937A'}}
          dotClickEnabled={true}
          showPrevButton={true}
        />
      </View>
      )
  }
}
const styles = StyleSheet.create({
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#4B937A',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //[...]
});
 