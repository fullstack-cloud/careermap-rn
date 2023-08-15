//HomeScreenNoLogin
import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Device} from '../../Utils/DeviceDimensions';
import Button, {ButtonHalfWidth} from '../../Components/Button';
import TabHeader from '../../Components/TabHeader';
import {AuthContext} from '../../Context/auth-context';
import Login from '../../Utils/Icons/Login';
import AppHeader from '../../Components/AppHeader';
import {Colors} from '../../Utils/Colors';
import Hamburger from '../../Utils/Icons/Hamburger';

const HomeScreenNoLogin = ({navigation}) => {
  const {token} = useContext(AuthContext);

  const handleRightClick = () => {
    navigation.navigate('login');
  };

  return (
    <>
      <AppHeader
        style={{backgroundColor: Colors.light}}
        middleText={'Home'}
        left={{
          show: false,
        }}
        right={{
          show: true,
          Icon: Login,
          click: handleRightClick,
        }}
      />
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: (Device.height * 5) / 7,
          }}>
          <WebView
            style={{flex: 1, width: Device.width, height: 100}}
            source={{uri: 'https://careermaps.live?caller=app'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingTop: 20,
            paddingBottom: 105,
          }}>
          <View style={{flex: 1}}>
            <Button
              buttonText={'Career Path Finder'}
              buttonStyle={{width: Device.width / 2}}
              onPress={() => navigation.navigate('login')}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <Button
              buttonText={'Rank'}
              buttonStyle={{width: Device.width / 2.5}}
              onPress={() => navigation.navigate('login')}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreenNoLogin;
