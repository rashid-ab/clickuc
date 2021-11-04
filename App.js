import React,{useState,useEffect,useRef} from 'react';
import { store } from './src/redux/index'
import { Provider } from 'react-redux'
import {BackHandler,Alert,Linking} from 'react-native';
import Navigation from './src/routes/index';
import FlashMessage from "react-native-flash-message";
import {requestUserPermission,notificationListner} from './src/components/Utils'
import { checkVersion } from "react-native-check-version";
 
 function App() {
 useEffect(() => {
//   const version = await checkVersion();
//   console.log('version.needsUpdate',version.needsUpdate)
//   if (version.needsUpdate) {
    
//     Alert.alert(
//       "Please Update",
//       "You will have to update your app to the latest version to continue using.",
//       [
//         {
//           text: "Cancel",
//           onPress: () => BackHandler.exitApp(),
//           style: "cancel"
//         },
//         { text: "Update", onPress: () => {
//           BackHandler.exitApp();
//           Linking.openURL(version.url)
//         } }
//       ]
//     );
// }
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