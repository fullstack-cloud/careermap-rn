import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import AppContainer from '../Components/AppContainer';
import AppHeader from '../Components/AppHeader';
import Button from '../Components/Button';
import Input from '../Components/Input';
import {ToastMessage} from '../Components/Toastify';
import {Call} from '../Service/Api';
import {Colors} from '../Utils/Colors';
import {Fonts} from '../Utils/Fonts';
import ChevronRight, {ChevronLeft} from '../Utils/Icons/Chevrons';
import Loader from '../Utils/Loader';

const staticImage = require('../assets/app_logo.png');

const LoginScreen = ({navigation}) => {
  const [states, setStates] = React.useState({phone_number: ''});
  const [isLoading, setIsLoading] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, []),
  );

  const handleLogin = async () => {
    if (states.phone_number.length === 10) {
      setIsLoading(true);
      let payload = {phone_number: states.phone_number, device_type: 'android'};
      try {
        const response = await Call('login', payload);
        setIsLoading(false);
        if (response.data.success) {
          navigation.navigate('otp', {phone_number: states.phone_number});
        } else {
          ToastMessage('error', 'Error', response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        ToastMessage(
          'error',
          'Error',
          error?.response?.data?.message || 'Something went wrong.',
        );
      }
    } else {
      ToastMessage('error', 'Error', 'Enter correct mobile number');
    }
  };

  return (
    <>
      {/* <Loader visible={isLoading} /> */}
      <AppHeader
        middleText={'Login'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: false,
        }}
      />
      <AppContainer>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <Image source={staticImage} style={{width: 350, height: 100}} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: Fonts.Medium,
              color: Colors.dark,
              textAlign: 'center',
            }}>
            Get 'Career Guidance' from India's best Counselors
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            borderColor: Colors.primary,
            borderWidth: 2,
            borderRadius: 4,
            padding: 20,
            marginBottom: 50,
          }}>
          <Text style={{fontFamily: Fonts.SemiBold}}>
            Let's get started, enter your mobile number to sign in your Career
            Map account
          </Text>
        </View>
        <View>
          <Input
            keyboardType={'numeric'}
            placeholder={'Phone Number'}
            customText={true}
            onChangeText={phone_number => {
              if (phone_number.trim().length < 11)
                setStates(prev => ({...prev, phone_number}));
            }}
            value={states.phone_number}
          />
        </View>
        <View style={{marginTop: 10}}>
          <Button
            buttonText={
              isLoading ? <ActivityIndicator color={'#FFF'} /> : 'Sign In'
            }
            onPress={handleLogin}
            disabled={isLoading}
          />
        </View>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            paddingVertical: 20,
          }}
          onPress={() => {
            navigation.navigate('signup');
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: Colors.dark,
              fontFamily: Fonts.Bold,
            }}>
            Don't have an Account?
          </Text>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 18,
              fontWeight: '600',
              paddingLeft: 10,
              fontFamily: Fonts.Bold,
            }}>
            Sign Up
          </Text>
        </Pressable>
      </AppContainer>
    </>
  );
};

export default LoginScreen;
