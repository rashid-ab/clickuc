import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      image_path:this.props.route=='Crate'?require('../../assets/back.png'):require('../../assets/burger.png')
    }
  }
  openDrawer = () => {
    this.props.navigation.toggleDrawer()
  }
  numFormatter = (num) => {
    if(num >= 1000){
        return (num/1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num >= 1000000){
        return (num/1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million 
    }else {
        return num; // if value < 1000, nothing to do
    }
}
  render() {
    return (
        <View style={styles.header}>
          <View style={styles.header_body}>
            {this.props.route!="Scratch"?
            <TouchableOpacity onPress={()=>this.props.route=='Crate'?this.props.navigation.goBack():this.openDrawer()}>
              <Image source={this.state.image_path} style={{width:wp('8%'),height:hp('3%')}}/>
            </TouchableOpacity>
            :
            <TouchableOpacity >
            </TouchableOpacity>
            }
            <Text style={{color:'#4B937A',fontSize:hp('3%'),fontWeight:'bold'}}>{this.props.route}</Text>
            <View style={styles.coinsView}>
              <View style={styles.coins}>
                <Image source={require('../../assets/coin.png')} style={{width:wp('5%'),height:hp('3%')}}/>
                <Text style={styles.coins_text}>{this.numFormatter(this.props.coins)}</Text>
              </View>
              <View style={styles.coins}>
                <Image source={require('../../assets/uc.png')} style={{width:wp('6%'),height:hp('3%')}}/>
                <Text style={styles.coins_text}>{this.numFormatter(this.props.uc)}</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  header:{
    flex:.1,
    justifyContent:'center',
    paddingHorizontal:10,
  },
  header_body:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  coinsView:{
    backgroundColor:'#4B937A',
    borderRadius:10,
    padding:6,
    borderBottomLeftRadius:20,
    borderTopRightRadius:20,
  },
  coins:{
    // backgroundColor:'#fff',
    flexDirection:'row',
    borderRadius:10,
    paddingHorizontal:5,
  },
  coins_text:{
    color:'#fff',
    fontSize:hp('1.5%'),
    fontWeight:'bold',
    marginLeft:2
  },
});     
const mapStateToProps = state => {
  return {
    user: state.user,
    coins: state.coins,
    uc: state.uc,
  };
};
export default connect(mapStateToProps, null)(Header);