import React from 'react';
import {Text, View} from 'react-native';
import Unpaid from '../Utils/Illustrations/Unpaid';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';
import Button from './Button';

const NoPlan = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',paddingHorizontal: 25}}>
      <Unpaid width={Device.width / 2} height={Device.width / 2} />
      <Text style={{fontFamily: Fonts.Bold}}>
        You dont have any plan. Please purchase a plan to continue using our
        application.{' '}
      </Text>
      <Button buttonText={'Buy a plan'} buttonStyle={{width: Device.width/2,marginTop: 20}} onPress={()=> navigation.navigate('payment')} />
    </View>
  );
};

export default NoPlan;
