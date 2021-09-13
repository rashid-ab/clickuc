
import React, { Component } from 'react';
import { View ,Text,Modal,StyleSheet,Pressable,Image,ImageBackground,Dimensions,Alert, TouchableOpacity} from 'react-native';
import Header from '../components/header';
import url from '../components/url'
import axios from 'axios'
import { connect } from 'react-redux';
import Loader from '../components/Loader'
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
import Ad from '../components/Ad'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const screeWidth = Dimensions.get('window').width
const silverNumbers=[8,9,10,11,12,2,3,13,14,3,2,1,15,16,17,18,7,19,20]
const goldenNumbers=[5,6,7,8,9,10,11,5,6,12,13,2,14,15,16,4,3,6,7,17,18,19,20,21,5,8,7,9,5,22,23,24,24,25,26,27,28,29,5,4,30]
const platinumNumbers=[8,9,10,11,12,13,14,15,16,17,18,19,20,218,7,9,5,22,23,24,25,26,27,28,29,30,31,32,33,1,34,35,36,37,38,39,40]
class Crate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isVisible:false,
          coins:this.props.route.params.title=='Supply Crate'?silverNumbers[Math.floor(Math.random()*silverNumbers.length)]:this.props.route.params.title=='Classic Crate'?goldenNumbers[Math.floor(Math.random()*goldenNumbers.length)]:platinumNumbers[Math.floor(Math.random()*platinumNumbers.length)],
          limit:this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit,
          image:this.props.route.params.title=='Supply Crate'?require('../assets/supply.png'):this.props.route.params.title=='Classic Crate'?require('../assets/classics.png'):require('../assets/premium.png'),
          Loadingvisible:true
        };
    }
    
    interstitial_ad=()=>{
      AdMobInterstitial.showAd()
      AdMobInterstitial.addEventListener("adClosed", () => {
        AdMobInterstitial.requestAd();
      });
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
            alert('Your Token is expire. Please login again')
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
            console.log('May be Your Internet Lostqw!')
          }
        })
        .catch(function (response) {
          // this.setState({ isVisible: false });
          console.log('May be Your Internet Lostas!')
        });
        this.componentDidMount();
    }
      modelOpen = () => {
        
        this.setState(
          {
            isVisible:true,
          }
        );
        var scratch_url=this.props.route.params.title=='Supply Crate'?'silver_coins':this.props.route.params.title=='Classic Crate'?'golden_coins':'platinum_coins'
        var newCoins=parseInt(this.props.coins) + parseInt(this.state.coins);
        var newUC=newCoins/1000;
        console.log('this.state.limit',url + scratch_url)
        axios({
          method: "POST",
          url: url + scratch_url,
          data: {
            email:this.props.user.email,
            coins: this.state.coins,
            token:this.props.user.token,
            uc: Math.trunc(newUC),
          }
        })
          .then(async({ data: response }) => {
            console.log('resp',response)
            if(response.message=='failure'){
                alert('Your Token is expire. Please login again')
                await AsyncStorage.setItem('user','');
                await AsyncStorage.setItem('fcmtoken','');
              this.props.navigation.replace('Login')

            }
            if(response.message=='success'){
              let adss=this.props.ads-1
              if((this.state.limit-1)==1 || (this.state.limit-1)==0){
                AdMobRewarded.setAdUnitID(Ad.reward_id);
                AdMobRewarded.requestAd();
              }
              if(adss==0){
                this.interstitial_ad();
                this.props.getads(4)
              }
              else{
                this.props.getads(adss)
              }
              this.setState({limit:response.limit})
              this.props.getcoins(response.coins)
              this.props.getuc(response.uc)
              this.props.route.params.title=='Supply Crate'?this.props.getsilverlimit(response.limit):this.props.route.params.title=='Classic Crate'?this.props.getgoldenlimit(response.limit):this.props.getplatinumlimit(response.limit)
            }
            else{
              this.setState({ isVisible: false });
              alert('May be Your Internet Lost!')
            }
          })
          .catch(function (response) {
            // this.setState({ isVisible: false });
            alert(response)
          });
      }
      componentDidMount=()=>{
        this.focusListener = this.props.navigation.addListener("focus", () => {
          console.log('qaqaqa')
          
          this.setState({
            coins:this.props.route.params.title=='Supply Crate'?silverNumbers[Math.floor(Math.random()*silverNumbers.length)]:this.props.route.params.title=='Classic Crate'?goldenNumbers[Math.floor(Math.random()*goldenNumbers.length)]:platinumNumbers[Math.floor(Math.random()*platinumNumbers.length)],
            limit:this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit
          })
          if(this.state.limit>0){
        AdMobInterstitial.setAdUnitID(Ad.Interstitial_id);
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd();
      }
      else{
        AdMobRewarded.setAdUnitID(Ad.reward_id);
        AdMobRewarded.requestAd();
      }
      setTimeout(()=>{this.setState({Loadingvisible: false})}, 3000)
        })
      }
      reset = () => {
        this.setState(
          {
            coins:silverNumbers[Math.floor(Math.random()*silverNumbers.length)],
            isVisible:false,
          },
        );
      };
    render() {
        return (
          <View style={{flex:1,backgroundColor:'black'}}>
            <Header title={this.props.route.params.title} route={this.props.route.name} navigation={this.props.navigation}/>
            <Loader visible={this.state.Loadingvisible} />
            <View style={{flex:.92,alignItems:'center',}}>
                <View style={{flex:.1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:hp('3%'),color:'white',fontWeight:'bold'}}>{this.props.route.params.title}</Text>
                </View>
                <View style={{flex:.11,justifyContent:'center',alignItems:'center'}}>
                  {this.state.limit!=0?
                    <Text style={{fontSize:hp('2.2%'),fontWeight:'bold',color:'white'}}>Your Crate limit left = {this.props.route.params.title=='Supply Crate'?this.props.silverLimit:this.props.route.params.title=='Classic Crate'?this.props.goldenLimit:this.props.platinumLimit}</Text>
                  :
                    <Text style={{fontSize:hp('3.2%'),fontWeight:'bold',color:'white'}}>Watch Ad to Open more Crates</Text>
                  }
                </View>
                {this.state.limit!=0?<TouchableOpacity onPress={()=>this.modelOpen()} style={{flex:.4,justifyContent:'center',alignItems:'center'}}>
                <View style={{flex:.4,justifyContent:'center',alignItems:'center',}}>
                    <View style={{width:wp('60%'),height:hp('35%'),borderRadius:20,justifyContent:'center',alignItems:'center',backgroundColor:'white',borderBottomLeftRadius:70,borderTopRightRadius:70}}>
                        <View style={{ width: wp('50%'), height: hp('25%'),borderRadius:20 }}>
                            <View style={{ width: wp('50%'), height: hp('25%'),borderRadius:30,alignItems:'center',justifyContent:'center' }}>
                                <Image source={this.state.image} style={{width:wp('40%'),height:hp('27%')}} />
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
                                <Image source={require('../assets/supply.png')} style={{width:wp('31%'),height:hp('19%')}} />
                            </Animatable.View>
                        </View>
                    </View>
                </TouchableOpacity>}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                        Alert.alert("Confirm the Modal.");
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                          <Image source={this.state.image}  style={{width:wp('40%'),height:hp('27%')}}/>
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
                    </View>
                </Modal>
            </View>
            <AdMobBanner
              adSize="fullBanner"
              adUnitID={Ad.banner_id}
              testDevices={[AdMobBanner.simulatorId]}
              onAdFailedToLoad={error => console.error(error)}
            />
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