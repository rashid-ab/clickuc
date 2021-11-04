import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { AndroidBackHandler } from "react-navigation-backhandler";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  BackHandler,
  Modal,
  Dimensions,
  Pressable,
  Platform
} from 'react-native';
import Header from '../components/header';
import url from '../components/url'
import Ad from '../components/Ad'
import axios from 'axios';
import {AlertMessage} from '../components/Alert'
import {
  AdMobBanner,
} from 'react-native-admob-alpha'
import { BannerView } from 'react-native-fbads';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { NativeAdsManager } from 'react-native-fbads';
import AdComponent from '../components/NativeAd'
import FAd from '../components/FAD'
const youWantToHandleTheBackButtonPress = true
const adsManager = new NativeAdsManager(FAd.native_id);
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads:'google',
      isVisible:false,
      data: [
        {id:2, title: "Supply Crate", },
        {id:3, title: "Classic Crate", } ,
        {id:4, title: "Premium Crate", } ,
        {id:5, title: "My Wallet", } ,
      ],
      animationState: 'rest',
    };
  }
  componentDidMount = async() => {
    let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
      axios({
        method: "POST",
        url: url + "tokenupdate",
        data: {
          email: user.email,
          device_token: fcmtoken,
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
          }
          else{
           alert('Something Wrong!')
          }
        })
        .catch(function (response) {
          //handle error
          return AlertMessage('Error','Check Your Internet')
        });
  }
  clickEventListener(title) {
    
      if(title=="My Wallet"){
        return this.props.navigation.navigate('MyWallet')
      }
      else{
        this.props.navigation.navigate('Crate',{title:title})
    }
  }
  openDrawer = () => {
    this.props.navigation.toggleDrawer()
  }
  
  onBackButtonPressAndroid = () => {
    if (youWantToHandleTheBackButtonPress) {
      this.setState({isVisible:true})
      return true;
    }
    return false;
  };
  render() {
    const { animationState } = this.state;
    return (
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
      <View style={styles.container}>
        <Header navigation={this.props.navigation} route="Click UC"/>
        <View style={styles.body}>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
              return (
                // <View>
                item.id==1?
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.title)}}>
                    {item.title=="Supply Crate"?<Image style={styles.cardImage} source={require('../assets/supply.png')}/>
                    :item.title=="Classic Crate"?<Image style={styles.cardImage} source={require('../assets/classics.png')}/>
                    :<Image style={styles.cardImage} source={require('../assets/premium.png')}/>}
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>
                :
                
                  <TouchableOpacity style={styles.card} onPress={() => {this.clickEventListener(item.title)}}>
                    {item.title=="My Wallet"?<Image style={styles.cardImage} source={require('../assets/wallet.png')}/>
                    :item.title=="Supply Crate"?<Image style={styles.cardImage} source={require('../assets/supply.png')}/>
                    :item.title=="Classic Crate"?<Image style={styles.cardImage} source={require('../assets/classics.png')}/>
                    :<Image style={styles.cardImage} source={require('../assets/premium.png')}/>
                    }
                    <Text style={styles.title}>{item.title}</Text>
                  </TouchableOpacity>
                // </View>
              )
            }}/>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isVisible}
            >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View >
                <Text style={{color:'#2fabed',fontSize:18,paddingVertical:20,marginLeft:10}}>Exit App</Text>
              </View>
                <AdComponent adsManager={adsManager} adChoicePosition="bottomRight"/>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>               
                  <TouchableOpacity onPress={()=>{BackHandler.exitApp()}}>
                    <Text style={{color:'#2fabed',fontSize:18,padding:20,marginLeft:10}}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}}>
                    <Text style={{color:'#2fabed',fontSize:18,padding:20,marginLeft:10}}>No</Text>
                  </TouchableOpacity>
                </View> 
              </View>
              
            </View>
        </Modal>
        <View style={{position:'absolute',bottom:20}}>
          {this.state.banner=='google'?
            <AdMobBanner
            adSize="fullBanner"
            adUnitID={Ad.banner_id}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => this.setState({banner:'facebook'})}
            />:
            <BannerView
            placementId={FAd.banner_id}
            type="standard"
            onPress={() => console.log('click')}
            onLoad={() => console.log('loaded')}
            onError={(err) => this.setState({banner:'google'})}
          />
          }
        </View>
      {/* {this._renderBackHandler()} */}
      </View>
      </AndroidBackHandler>
    );
  }
}
const screeWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
    borderRadius: 10,
    height:400,
    marginHorizontal: 10,
  },
  modalView: {
    marginHorizontal: 10,
    borderRadius: 10,
    width:400,
    height:400,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width:screeWidth/2
  },
  buttonOpen: {
    backgroundColor: "#4B937A",
  },
  buttonClose: {
    backgroundColor: "#4B937A",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:18
  },
  modalText: {
    // marginBottom: 15,
    fontSize:18,
    fontWeight:'bold',
    textAlign: "center",
    alignSelf:'center'
  },
  header:{
    flex:.08,
    // backgroundColor:'#00b5ec',
    justifyContent:'center',
    paddingHorizontal:10
  },
  header_body:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  coins:{
    backgroundColor:'#fff',
    flexDirection:'row',
    borderRadius:10,
    padding:5,
  },
  coins_text:{
    color:'black',
    fontSize:18,
    fontWeight:'bold'
  },
  body:{
    flex:.92
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor:"white",
    //flexBasis: '42%',
    width:wp('40%'),
    height:hp('28%'),
    borderBottomLeftRadius:40,
    borderTopRightRadius:40,
    alignItems:'center',
    justifyContent:'center'
  },
  
  cardImage:{
    height: hp('22%'),
    width: wp('45%'),
    alignSelf:'center',justifyContent:'center'
  },
  title:{
    fontSize:hp('2.5%'),
    flex:1,
    color:'#4B937A',
    alignSelf:'center',
    fontWeight:'bold'
  },
});     