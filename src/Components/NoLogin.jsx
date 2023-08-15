import React from 'react';
import {View} from 'react-native';
import { Colors } from '../Utils/Colors';
import { Device } from '../Utils/DeviceDimensions';
import Login from '../Utils/Illustrations/Login';
import AppContainer from './AppContainer';
import Button from './Button';

const NoLogin = ({navigation}) => {
  return (
    <AppContainer
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: Colors.light,
      }}>
      <Login width={Device.width / 2} height={Device.width / 2} />
      <View style={{height: 50}}></View>
      <Button
        buttonStyle={{width: Device.width / 2}}
        buttonText={'Login'}
        onPress={() => navigation.navigate('login')}
      />
    </AppContainer>
  );
};

export default NoLogin;
