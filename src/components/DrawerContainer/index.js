import React from 'react';
import {View, Image, Text,Alert} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import MenuButton from './MenuButton/MenuButton';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
class DrawerContainer extends React.Component {
  onpress = async () => {
    await AsyncStorage.setItem('user','');
    navigation.closeDrawer();
    navigation.replace('Login');
    
  }
  logout=async () =>{
    Alert.alert(
      "Logout",
      "Are you sure to logout?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Yes", onPress:async () => {
          await AsyncStorage.setItem('user','');
          await AsyncStorage.setItem('fcmtoken','');
          this.props.navigation.closeDrawer();
          this.props.users('');
          this.props.navigation.replace('Login');
          
        } }
      ]
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.header}>
          <View
            style={{alignItem: 'center', justifyContent: 'center', flex: 0.3}}>
            <Image
              style={styles.profileImage}
              source={require('../../assets/app_icon.png')}
            />
          </View>
          <View
            style={{alignItem: 'center', justifyContent: 'center', flex: 0.7}}>
            <Text style={styles.profileNumber}>ClickUC</Text>
          </View>
        </View>
        <View style={styles.container}>
          <MenuButton
            title="Home"
            source={require('../../assets/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="MyWallet"
            source={require('../../assets/wallets.png')}
            onPress={() => {
              navigation.navigate('MyWallet');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="ChangePassword"
            source={require('../../assets/change_password.png')}
            onPress={() => {
              navigation.navigate('ChangePassword');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Logout"
            source={require('../../assets/logout.png')}
            onPress={() => this.logout()}
          />
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
const mapStateToProps = state => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    users: user => {
      dispatch({ type: 'USER', user: user });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);