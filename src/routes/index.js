import "react-native-gesture-handler";
import React, { Component } from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerComponent from '../components/DrawerContainer/index'
import Auth from "../screens/Auth";
import Signin from "../screens/LoginScreen";
import Signup from "../screens/SignupScreen";
import ForgetPassword from "../screens/ForgetPassword";
import Home from "../screens/HomeScreen";
import MyWallet from "../screens/MyWallet";
import ChangePassword from "../screens/ChangePassword";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Crate from "../screens/Crate";
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
  
  function stack() {
    return (
      <Drawer.Navigator
        edgeWidth={0}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {marginVertical: 5},
          // headerShown:false
        }}
        // Here we are setting our custom sidebar menu
        drawerContent={props => <DrawerComponent {...props} />}>
        <Drawer.Screen
          name="Home"
          // options={{ drawerLabel: 'First page Option' }}
          component={Home}
        />
        <Drawer.Screen
          name="MyWallet"
          // options={{ drawerLabel: 'First page Option' }}
          component={MyWallet}
        />
        <Drawer.Screen
          name="ChangePassword"
          // options={{ drawerLabel: 'First page Option' }}
          component={ChangePassword}
        />
        <Drawer.Screen
          name="PrivacyPolicy"
          // options={{ drawerLabel: 'First page Option' }}
          component={PrivacyPolicy}
        />
      </Drawer.Navigator>
    );
  }
  function App({initialRouteName = 'Auth'}) {
    return (
      <NavigationContainer
       >
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false,
            headerStyle: {
            backgroundColor: '#00b5ec',
            textAlign: 'center',
            },
            headerTitleAlign: 'center',
            headerTintColor:'white'
            }}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={Signin} />
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Home" component={stack} />
          <Stack.Screen name="Crate" component={Crate} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;
