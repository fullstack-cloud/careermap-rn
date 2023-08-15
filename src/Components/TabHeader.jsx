import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {AuthContext} from '../Context/auth-context';
import {Colors} from '../Utils/Colors';
import Hamburger from '../Utils/Icons/Hamburger';
import Login from '../Utils/Icons/Login';
import Power from '../Utils/Icons/Power';
import AppHeader from './AppHeader';

function TabHeader({color = '', leftClick, navigation, title,switchProfile}) {
  const {isAuthenticated, logout} = useContext(AuthContext);

  const handleRightClick = () => {
    if (isAuthenticated) {
      Alert.alert('Logout', 'you will be logged out on confirm', [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => logout()},
      ]);
    } else {
      navigation.navigate('login');
    }
  };


  return (
    <>
      <AppHeader
        style={{backgroundColor: color ? color : Colors.light}}
        middleText={title}
        left={{
          show: true,
          Icon: Hamburger,
          click: leftClick,
        }}
        right={{
          show: true,
          Icon: isAuthenticated ? Power : Login,
          click: handleRightClick,
          showSwitch: isAuthenticated ,
          switch: switchProfile,
        }}
      />
    </>
  );
}

export default TabHeader;
