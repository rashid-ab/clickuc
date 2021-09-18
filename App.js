import React,{useState,useEffect,useRef} from 'react';
import { store } from './src/redux/index'
import { Provider } from 'react-redux'
import {
  Text,
} from 'react-native';
import Navigation from './src/routes/index';
import FlashMessage from "react-native-flash-message";
 import {requestUserPermission,notificationListner} from './src/components/Utils'

function App() {
 useEffect(() => {
   requestUserPermission();
   notificationListner();
}, []);
  return (
    // <Text>ADAa</Text>
     <Provider store={store}>
       <Navigation />
       <FlashMessage position="top" />
     </Provider>

  );
};
export default App;