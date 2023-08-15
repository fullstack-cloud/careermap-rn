import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors} from '../Utils/Colors';
import AppContainer from '../Components/AppContainer';
import Button from '../Components/Button';
import AppHeader from '../Components/AppHeader';
import {ChevronLeft} from '../Utils/Icons/Chevrons';
import OTP from '../Utils/Illustrations/OTP';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';
import {Call} from '../Service/Api';
import {AuthContext} from '../Context/auth-context';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../Utils/Loader';
import {ToastMessage} from '../Components/Toastify';
import UsersList from '../Components/UsersList';

const OTPScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const [usersData, setUsersData] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState(false);

  const {authenticate} = React.useContext(AuthContext);
  const {phone_number} = route.params;
  const INITIAL_STATE = {
    mobile: phone_number,
    otp: '',
    dial_code: '+91',
  };
  const [states, setStates] = React.useState(INITIAL_STATE);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(false);
    }, []),
  );

  const verifyOTPHandler = async () => {
    if (states.otp.length == 6) {
      setIsLoading(true);
      const payload = {
        phone_number: states.mobile,
        dial_code: states.dial_code,
        otp: states.otp,
      };
      try {
        const response = await Call('verifyOTP', payload);
        setIsLoading(false);
        if (response.data.success) {
          if (response.data.is_multi) {
            setUsersData(response.data.data);
            setShowDetails(true);
          } else {
            authenticate({
              token: response.data.data[0].accessToken,
              user_data: response.data.data[0].user,
            });
          }
        } else {
          ToastMessage('error', 'Error', 'Enter correct otp');
        }
      } catch (err) {
        ToastMessage('error', 'Error', err.response.data.message);
        setIsLoading(false);
      }
    } else {
      ToastMessage('error', 'Error', 'Enter correct otp');
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <AppHeader
        middleText={'Verify OTP'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: false,
        }}
      />
      <UsersList
        visible={showDetails}
        onClose={() => {
          setShowDetails(false), navigation.goBack();
        }}
        data={usersData}
        onChoose={async data => {
          try {
            let payload = {phone_number, student_id: data};
            const response = await Call('chooseStudent', payload);
            authenticate({
              token: response.data.data[0].accessToken,
              user_data: response.data.data[0].user,
            });
          } catch (error) {
            ToastMessage('error', 'Error', 'Something went wrong. Try again');
          }
        }}
      />
      <ScrollView>
        <AppContainer>
          <View style={{alignItems: 'center'}}>
            <OTP width={Device.width / 1.5} height={Device.width / 1.5} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: 17,
                marginBottom: 50,
              }}>
              We have send OTP on{' '}
              <Text style={{fontSize: 20, fontFamily: Fonts.Bold}}>
                {phone_number}
              </Text>
            </Text>
            <Text style={{fontFamily: Fonts.Medium, fontSize: 19}}>
              Enter the OTP to login
            </Text>
          </View>
          <OTPInputView
            style={{width: '100%', height: 100}}
            pinCount={6}
            onCodeChanged={code => {
              setStates(prev => {
                return {
                  ...prev,
                  otp: code,
                };
              });
            }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.styleBase}
            codeInputHighlightStyle={styles.styleHighLighted}
            onCodeFilled={code => {}}
          />
          <Button buttonText={'Verify'} onPress={verifyOTPHandler} />
        </AppContainer>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  styleBase: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 10,
    borderColor: Colors.lightdark,
    color: Colors.black,
    fontSize: 18,
    fontFamily: Fonts.Medium,
  },

  styleHighLighted: {
    borderColor: Colors.primary,
  },
});

export default OTPScreen;
