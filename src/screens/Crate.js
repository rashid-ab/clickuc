
import React, { Component } from 'react';
import { View ,Text,Modal,StyleSheet,Pressable,Image,Dimensions,Alert, TouchableOpacity,Animated} from 'react-native';
import Header from '../components/header';
import url from '../components/url'
import axios from 'axios'
import { connect } from 'react-redux';
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {AlertMessage} from '../components/Alert'
import NetInfo from "@react-native-community/netinfo";
import { InterstitialAdManager,BannerView } from 'react-native-fbads';
import  CountDown  from 'react-native-countdown-component';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
} from 'react-native-admob-alpha'
import Ad from '../components/Ad'
import FAd from '../components/FAD'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const screeWidth = Dimensions.get('window').width
const silverNumbers=[8,9,10,11,12,13,0,14,0,15,8,9,0,10,11,12,0,13,16,17,18,19,20]
const goldenNumbers=[10,11,12,13,14,0,12,13,10,11,12,13,14,13,0,15,14,0,16,17,0,30]
const platinumNumbers=[15,16,15,17,18,0,19,20,16,15,17,18,0,21,22,23,24,0,16,15,17,18,25,26,40]
class Crate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isVisible:false,
          coins:this.props.route.params.title=='Supply Crate'?silverNumbers[Math.floor(Math.random()*silverNumbers.length)]:this.props.route.params.title=='Classic Crate'?goldenNumbers[Math.floor(Math.random()*goldenNumbers.length)]:platinumNumbers[Math.floor(Math.random()*platinumNumbers.length)],
          limit:this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit,
          image:this.props.route.params.title=='Supply Crate'?require('../assets/supply.png'):this.props.route.params.title=='Classic Crate'?require('../assets/classics.png'):require('../assets/premium.png'),
          Loadingvisible:true,
          ads:'',
          banner:'google',
          timer:false
        };
    }
    adloading=()=>{
      if(this.state.limit>3){
        try {
          AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
          AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
          AdMobInterstitial.requestAd();
          AdMobInterstitial.addEventListener('adLoaded',async () => {
              await AsyncStorage.setItem('ads','google');
              console.log('google1')
            })
            AdMobInterstitial.addEventListener('adFailedToLoad',async () => {
              await AsyncStorage.setItem('ads','');
            })
      }
      catch(e){
        console.log('Error',e)
      }
      }
      else{
        try{
          AdMobRewarded.setAdUnitID(Ad.reward_id);
          AdMobRewarded.requestAd();
        }
        catch(e){
          console.log('Error',e)
        }
      }
    }
    componentDidMount=async()=>{
      // this.focusListener = this.props.navigation.addListener("focus", async() => {
        this.setState({
          coins:this.props.route.params.title=='Supply Crate'?silverNumbers[Math.floor(Math.random()*silverNumbers.length)]:this.props.route.params.title=='Classic Crate'?goldenNumbers[Math.floor(Math.random()*goldenNumbers.length)]:platinumNumbers[Math.floor(Math.random()*platinumNumbers.length)],
          limit:this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit,
          timer:await AsyncStorage.getItem('timer')
        })
        if(this.state.limit>3){
          try {
            AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
            AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
            AdMobInterstitial.requestAd()
            AdMobInterstitial.addEventListener('adLoaded',async () => {
              await AsyncStorage.setItem('ads','google');
              console.log('google2')})
            AdMobInterstitial.addEventListener('adFailedToLoad',async () => {
              await AsyncStorage.setItem('ads','');
            })
        }
        catch (e) {
          console.log('Error',e)
          }
        }
        else{
          try {
            AdMobRewarded.setAdUnitID(Ad.reward_id);
            AdMobRewarded.requestAd();
            
          }
          catch (e) {
            console.log('Error',e)
          }
        }
    setTimeout(()=>{this.setState({Loadingvisible: false})}, 3000)
      // })
    }
    interstitial_ad=async()=>{
      let ads=await AsyncStorage.getItem('ads');
      if(ads=="google"){
        console.log('show')
        AdMobInterstitial.showAd()
        AdMobInterstitial.addEventListener("adClosed",async () => {
          await AsyncStorage.setItem('ads','');
          this.adloading();
        });
      }
      else{
        InterstitialAdManager.showAd(FAd.Interstitial_id)
        .then((didClick) => {})
        .catch((error) => {});
          this.adloading();
      }
      
    }
    isNetworkAvailable=async ()=> {
      const response = await NetInfo.fetch();
      return response.isConnected;
    }
    reward_ad=()=>{
      
      AdMobRewarded.showAd()
      AdMobRewarded.addEventListener("adClosed", () => {
        
      });
      this.limit();
    }
    limit = () => {
      var limit_url=this.props.route.params.title=='Supply Crate'?'silver_limit':this.props.route.params.title=='Classic Crate'?'golden_limit':'platinum_limit'
      axios({
        method: "POST",
        url: url + limit_url,
        data: {
          email:this.props.user.email,
          token:this.props.user.token,
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
            this.setState({limit:10});
            this.props.route.params.title=='Supply Crate'?this.props.getsilverlimit(10):this.props.route.params.title=='Classic Crate'?this.props.getgoldenlimit(10):this.props.getplatinumlimit(10)
          }
          else{
            this.setState({ isVisible: false });
            return AlertMessage('Connection Failed','Check Your Internet','red')
          }
        })
        .catch(function (response) {
          this.setState({ isVisible: false });
          return AlertMessage('Connection Failed','Check Your Internet','red')
        });
        this.componentDidMount();
    }
      modelOpen = async() => {
        
        let net=await this.isNetworkAvailable()
        if(net){
          this.setState({isVisible:true})
        }
        else{
          return AlertMessage('Connection Failed','Check Your Internet','red')
        }
        var crate_url=this.props.route.params.title=='Supply Crate'?'silver_coins':this.props.route.params.title=='Classic Crate'?'golden_coins':'platinum_coins'
        var newCoins=parseInt(this.props.coins) + parseInt(this.state.coins);
        var newUC=newCoins/500;
        let adss=this.props.ads-1
        if(adss==0){
          this.interstitial_ad();
          this.props.getads(4)
        }
        else{
          this.props.getads(adss)
        }
        axios({
          method: "POST",
          url: url + crate_url,
          data: {
            email:this.props.user.email,
            coins: this.state.coins,
            token:this.props.user.token,
            uc: Math.trunc(newUC),
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
              
              console.log(adss)
              this.props.getcoins(response.coins)
              this.props.getuc(response.uc)
              this.props.route.params.title=='Supply Crate'?this.props.getsilverlimit(response.limit):this.props.route.params.title=='Classic Crate'?this.props.getgoldenlimit(response.limit):this.props.getplatinumlimit(response.limit)
              this.setState(
                {
                  limit:response.limit,
                  timer:response.limit==0?true:false
                },
              );
              if(response.limit==0){
                await AsyncStorage.setItem('timer',true)
              }
            }
            else{
              this.setState({ isVisible: false });
              return AlertMessage('Connection Failed','Check Your Internet','red')
            }
          })
          .catch(function (response) {
            this.setState({ isVisible: false });
            return AlertMessage('Connection Failed','Check Your Internet','red')
          });
      }
      
      reset =async () => {
        await this.setState(
          {
            coins:silverNumbers[Math.floor(Math.random()*silverNumbers.length)],
            isVisible:false,
            Loadingvisible:true,
          },
        );
        setTimeout(async() => {
          await  this.setState({Loadingvisible:false})
        }, 1500);
      };
      timer=async()=>{
        await AsyncStorage.setItem('timer',JSON.stringify(false));
        this.setState({timer:false,isVisible:false})}
    render() {
        return (
          <View style={{flex:1,backgroundColor:'black'}}>
            <Header title={this.props.route.params.title} route="Crate" navigation={this.props.navigation}/>
            <Loader visible={this.state.Loadingvisible} />
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        Alert.alert("Collect It First!.");
                    }}
                    >
                    <View style={styles.centeredView}>
                      {this.state.timer?
                      <View style={styles.modalView}>
                        <CountDown
                          until={10}
                          onFinish={() => this.timer()}
                          onPress={() => console.log('Take')}
                          size={20}
                        />
                      </View>   :
                        <View style={styles.modalView}>
                          <Image source={this.state.image}  style={{width:wp('50%'),height:hp('27%')}}/>
                          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginVertical:20}}>
                            <Image source={require('../assets/coin.png')}  style={{width:30,height:30}}/>
                            <Text style={styles.modalText}>x {this.state.coins}</Text>
                          </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.reset()}
                        >
                            <Text style={styles.textStyle}>Collect</Text>
                        </Pressable>
                        </View>
                        }
                   
                    </View>
                </Modal>
            <View style={{flex:.92,alignItems:'center',}}>
                <View style={{flex:.1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:hp('3%'),color:'white',fontWeight:'bold'}}>{this.props.route.params.title}</Text>
                </View>
                <View style={{flex:.11,justifyContent:'center',alignItems:'center'}}>
                  {this.state.limit!=0?
                    <Text style={{fontSize:hp('2.5%'),fontWeight:'bold',color:'white'}}>Your Crate limit left = {this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit}</Text>
                  :
                    <Text style={{fontSize:hp('3.2%'),fontWeight:'bold',color:'white'}}>Watch Ad to Open more Crates</Text>
                  }
                </View>
                {this.state.limit!=0?<TouchableOpacity onPress={()=>this.modelOpen()} style={{flex:.4,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:.4,justifyContent:'center',alignItems:'center',}}>
                    <View style={{width:wp('60%'),height:hp('35%'),borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderBottomLeftRadius:70,borderTopRightRadius:70}}>
                        <View style={{ width: wp('50%'), height: hp('25%'),borderRadius:20 }}>
                            <View style={{ width: wp('50%'), height: hp('25%'),borderRadius:30,alignItems:'center',justifyContent:'center' }}>
                                <Image source={this.state.image} style={{width:wp('50%'),height:hp('27%')}} />
                                <Text style={{color:'#4B937A',fontSize:hp('4%'),shadowColor: '#474747',fontWeight:'bold',shadowOffset: {width: 0,height: 6,},shadowOpacity: 0.37,shadowRadius: 7.49,elevation: 12,}}>Open</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.reward_ad()} style={{flex:.4,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:wp('60%'),height:hp('30%'),borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',shadowColor: '#474747',shadowOffset: {width: 0,height: 6,},shadowOpacity: 0.37,shadowRadius: 7.49,elevation: 12,}}>
                        <View style={{ width: wp('50%'), height: hp('25%'),borderRadius:20 }}>
                            <Animatable.View animation="pulse" easing="ease-in-out" iterationCount="infinite" style={{ width: wp('50%'), height: hp('25%'),borderRadius:30,alignItems:'center',justifyContent:'center',flexDirection:'row' }}>
                                <Image source={require('../assets/playbutton.png')} style={{width:wp('40%'),height:hp('19%')}} />
                            </Animatable.View>
                        </View>
                    </View>
                </TouchableOpacity>}
                
            </View>
            
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22
      borderRadius: 10,
      marginHorizontal: 20,
    },
    modalView: {
      marginHorizontal: 20,
      borderRadius: 10,
      width:screeWidth-50,
      backgroundColor: "white",
      // borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
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
    }
  });
const mapDispatchToProps = dispatch => {
  return {
    
    getcoins: coins => {
      dispatch({ type: 'COINS', coins: coins });
    },
    getsilverlimit: silverLimit => {
      dispatch({ type: 'SILVERLIMIT', silverLimit: silverLimit });
    },
    getgoldenlimit: goldenLimit => {
      dispatch({ type: 'GOLDENLIMIT', goldenLimit: goldenLimit });
    },
    getplatinumlimit: platinumLimit => {
      dispatch({ type: 'PLATINUMLIMIT', platinumLimit: platinumLimit });
    },
    getuc: uc => {
      dispatch({ type: 'UC', uc: uc });
    },
    getads: ads => {
      dispatch({ type: 'ADS', ads: ads });
    },
  };
};
const mapStateToProps = state => {
  return {
    user: state.user,
    coins: state.coins,
    uc: state.uc,
    ads: state.ads,
    silverLimit: state.silverLimit,
    goldenLimit: state.goldenLimit,
    platinumLimit: state.platinumLimit,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Crate);