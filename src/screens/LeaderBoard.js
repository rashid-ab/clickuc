import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'
import axios from 'axios'
import url from '../components/url'
import Header from '../components/header'
import Ad from '../components/Ad';
var index=0
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        // {id:1, title: "Ibrar", image:"https://img.icons8.com/color/70/000000/cottage.png"},
        // {id:44, title: "Kashi", image:"https://img.icons8.com/color/70/000000/administrator-male.png"},
        // {id:2, title: "Rashid Ali Butt", image:"https://img.icons8.com/color/70/000000/filled-like.png"} ,
        // {id:3, title: "Respect", image:"https://img.icons8.com/color/70/000000/facebook-like.png"} ,
        // {id:4, title: "Bye", image:"https://img.icons8.com/color/70/000000/shutdown.png"} ,
      ]
    };
  }
  componentDidMount = () => {
    axios({
      method: "GET",
      url: url + "leaderboard",
    })
      .then(async({ data: response }) => {
        if(response.message=='success'){
          this.setState({data:response.data})
        }
        else{
          return alert('May be Your Internet Lost!')
        }
      })
      .catch(function (response) {
        //handle error
        return alert('May be Your Internet Lost!')
      });
  }
  clickEventListener(title) {
    if(title=='Daily Checkin'){

    }
    else{
      this.props.navigation.navigate('Crate',{title:title})
    }
  }
  openDrawer = () => {
    this.props.navigation.toggleDrawer()
  }
  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} route={this.props.route.name}/>
        <View style={{backgroundColor:'',flex:.92,marginHorizontal:10,borderRadius:5,marginTop:20}}>
          <View style={styles.heading}>
            <View style={{flex:.2,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Position</Text>
            </View>
            <View style={{flex:.5,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Player Name</Text>
            </View>
            <View style={{flex:.3,alignItems:'center'}}>
              <Text style={{color:'#fff',fontSize:18,fontWeight:'bold'}}>Winning</Text>
            </View>
          </View>
          <View style={styles.body}>
            <FlatList style={styles.list}
              // contentContainerStyle={styles.listContainer}
              data={this.state.data}
              horizontal={false}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item,i}) => {
                index=index+1
                console.log('index',index)
                return (
                  <View style={{backgroundColor:'#D38700',padding:10,borderRadius:5,flexDirection:'row',flex:1,marginVertical:5}}>
                      <View style={{flex:.2,alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>#{index}</Text>
                      </View>
                      <View style={{flex:.5,alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>{item.name}</Text>
                      </View>
                      <View style={{flex:.3,alignItems:'center'}}>
                        <Text style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>{item.total_coins}</Text>
                      </View>
                  </View>
                )
              }}/>
            </View>
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
  heading:{flexDirection:'row',},
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  title:{
    fontSize:16,
    flex:1,
    color:'#D38700',
    alignSelf:'center',
    fontWeight:'bold'
  },
  
  
});     