import React from 'react';
import {View, Image, Text,ScrollView} from 'react-native';
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
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.header}>
          <View
            style={{alignItem: 'center', justifyContent: 'center', flex: 0.3}}>
            <Image
              style={styles.profileImage}
              source={require('../../assets/profile.jpeg')}
            />
          </View>
          <View
            style={{alignItem: 'center', justifyContent: 'center', flex: 0.7}}>
            <Text style={styles.profileName}>{this.props.user.name}</Text>
            <Text style={styles.profileNumber}>{this.props.user.email}</Text>
          </View>
        </View>
        <View style={styles.container}>
          <MenuButton
            title="Home"
            source={require('../../assets/profile.jpeg')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="MyWallet"
            source={require('../../assets/profile.jpeg')}
            onPress={() => {
              navigation.navigate('MyWallet');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="ChangePassword"
            source={require('../../assets/profile.jpeg')}
            onPress={() => {
              navigation.navigate('ChangePassword');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="PrivacyPolicy"
            source={require('../../assets/profile.jpeg')}
            onPress={() => {
              navigation.navigate('PrivacyPolicy');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="Logout"
            source={require('../../assets/profile.jpeg')}
            onPress={
                async () => {
                await AsyncStorage.setItem('user','');
                await AsyncStorage.setItem('fcmtoken','');
                navigation.closeDrawer();
                navigation.replace('Login');
                this.props.users('');
              
            }}
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