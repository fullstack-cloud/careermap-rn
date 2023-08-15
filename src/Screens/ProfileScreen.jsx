import React, {useContext} from 'react';

import {ScrollView, Text, View} from 'react-native';
import AppHeader from '../Components/AppHeader';
import AppContainer from '../Components/AppContainer';
import Button from '../Components/Button';
import Input, {PressableInput} from '../Components/Input';
import ChevronRight, {ChevronLeft} from '../Utils/Icons/Chevrons';
import {Colors} from '../Utils/Colors';
import {Fonts, PoppinsRegular} from '../Utils/Fonts';
import Profile from '../Utils/Illustrations/Profile';
import {Device} from '../Utils/DeviceDimensions';
import {Call} from '../Service/Api';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../Context/auth-context';
import NoLogin from '../Components/NoLogin';
import Loader from '../Utils/Loader';
import {ToastMessage} from '../Components/Toastify';
import {Dropdown} from 'react-native-element-dropdown';
import {Neomorph} from 'react-native-neomorph-shadows';

const INITIAL_STATE = {
  __v: 0,
  _id: '',
  current_standard: '',
  dob: '',
  email: '',
  first_name: '',
  gender: '',
  gmeet: '.',
  last_name: '',
  occupation: '',
  phone_number: '',
  role: '',
  whatsapp:
    'https://api.whatsapp.com/send?phone=918971890397&text=Hello!%20I%20want%20to%20get%20Career%20Guidance%20and%20ways%20to%20Earn.',
  device_type: 'android',
  dial_code: '+91',
};

const ProfileScreen = ({navigation}) => {
  const {token} = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(INITIAL_STATE);
  const [dropD, setDropD] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [focusStates, setFocusStates] = React.useState({
    current_standard: false,
    occupation: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      navigation.dispatch(DrawerActions.closeDrawer());
      if (token) {
        getUserProfile();
      }
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      getDropDownData();
    }, []),
  );

  const getDropDownData = async () => {
    setIsLoading(true);
    try {
      const resp = await Call('dropDown', {});
      setIsLoading(false);
      if (resp.status) {
        const drpdata = resp.data.data.map((item, index) => {
          return {label: item.name, value: item.id};
        });
        setDropD(drpdata);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const getUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await Call('getPorfile', {});
      setIsLoading(false);
      setProfile(response.data.data[0]);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    if (profile.first_name.trim() === '') {
      ToastMessage('error', 'Validation Error', 'First name is required');
      return;
    }
    if (profile.last_name.trim() === '') {
      ToastMessage('error', 'Validation Error', 'Last name is required');
      return;
    }
    if (profile.phone_number.trim() === '') {
      ToastMessage('error', 'Validation Error', 'Mobile is required');
      return;
    }
    if (profile.phone_number.trim().length !== 10) {
      ToastMessage('error', 'Validation Error', 'Mobile is invalid');
      return;
    }
    setIsLoading(true);

    let payload = {...profile};
    try {
      const response = await Call('updateProfile', payload, profile._id);
      setIsLoading(false);
      if (response.data.success) {
        ToastMessage('success', 'Success', response.data.message);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <AppHeader
        middleText={'Profile'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: false,
        }}
      />
      {token ? (
        <ScrollView style={{backgroundColor: Colors.lightdark1}}>
          <AppContainer>
            <View style={{alignItems: 'center'}}>
              <Profile width={Device.width / 1.5} height={Device.width / 1.5} />
            </View>
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                First Name
              </Text>
              <Input
                placeholder="First Name"
                value={profile.first_name}
                keyboardType="default"
                onChangeText={text =>
                  setProfile(prev => ({...prev, first_name: text}))
                }
              />
            </View>
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                Last Name
              </Text>
              <Input
                placeholder="Last Name"
                value={profile.last_name}
                keyboardType="default"
                onChangeText={text =>
                  setProfile(prev => ({...prev, last_name: text}))
                }
              />
            </View>
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                Email Address (Optional)
              </Text>
              <Input
                placeholder="Email Address (Optional)"
                keyboardType="default"
                value={profile.email}
                onChangeText={text =>
                  setProfile(prev => ({...prev, email: text}))
                }
              />
            </View>
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                Phone Number
              </Text>
              <Input
                placeholder="Phone Number"
                keyboardType="default"
                value={profile.phone_number}
                onChangeText={text =>
                  setProfile(prev => ({...prev, phone_number: text}))
                }
              />
            </View>
            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                Current Standard
              </Text>

              <Neomorph
                inner={false}
                style={{
                  shadowRadius: 5,
                  borderRadius: 35,
                  backgroundColor: Colors.backgroundColor,
                  width: Device.width - 50,
                  height: 50,
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: 20,
                  paddingHorizontal: 30,
                }}>
                <Dropdown
                  style={[isFocus && {borderColor: Colors.primary}]}
                  placeholderStyle={{fontFamily: Fonts.Bold}}
                  selectedTextStyle={{fontSize: 14,fontFamily: Fonts.Bold}}
                  inputSearchStyle={{fontFamily: Fonts.Bold}}
                  iconStyle={{}}
                  data={dropD}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={'Current Standart'}
                  searchPlaceholder="Search..."
                  value={profile.current_standard}
                  onFocus={() =>
                    setFocusStates(prev => ({...prev, current_standard: true}))
                  }
                  onBlur={() =>
                    setFocusStates(prev => ({...prev, current_standard: false}))
                  }
                  onChange={item => {
                    setProfile(prev => ({
                      ...prev,
                      current_standard: item.label,
                    }));
                    setFocusStates(prev => ({
                      ...prev,
                      current_standard: false,
                    }));
                  }}
                  renderLeftIcon={null}
                />
              </Neomorph>
              {/* <PressableInput
                placeholder={
                  profile && profile.current_standard
                    ? profile.current_standard
                    : 'Current Standard'
                }
                iconRight={<ChevronRight width="18px" height="18px" />}
                onPress={null}
              /> */}
            </View>

            <View style={{marginBottom: 5}}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 18,
                  fontWeight: '500',
                  color: Colors.dark,
                  fontFamily: PoppinsRegular,
                }}>
                Occupation
              </Text>
              {/* <PressableInput
                placeholder={
                  profile && profile.occupation
                    ? profile.occupation
                    : 'Occupation'
                }
                iconRight={<ChevronRight width="18px" height="18px" />}
                onPress={null}
              /> */}
              <Neomorph
                inner={false}
                style={{
                  shadowRadius: 5,
                  borderRadius: 35,
                  backgroundColor: Colors.backgroundColor,
                  width: Device.width - 50,
                  height: 50,
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: 20,
                  paddingHorizontal: 30,
                }}>
                <Dropdown
                  style={[isFocus && {borderColor: Colors.primary},{fontFamily: Fonts.Bold}]}
                  placeholderStyle={{fontFamily: Fonts.Bold}}
                  selectedTextStyle={{fontSize: 14,fontFamily: Fonts.Bold}}
                  inputSearchStyle={{fontFamily: Fonts.Bold}}
                  iconStyle={{}}
                  data={dropD}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={
                    !isFocus ? 'Select Destination/Aim Occupation' : ''
                  }
                  searchPlaceholder="Search..."
                  value={profile.occupation}
                  onFocus={() =>
                    setFocusStates(prev => ({...prev, occupation: true}))
                  }
                  onBlur={() =>
                    setFocusStates(prev => ({...prev, occupation: false}))
                  }
                  onChange={item => {
                    setProfile(prev => ({...prev, occupation: item.label}));
                    setFocusStates(prev => ({...prev, occupation: false}));
                  }}
                  renderLeftIcon={null}
                />
              </Neomorph>
            </View>
            <View style={{marginTop: 10}}>
              <Button buttonText={'Update Profile'} onPress={updateProfile} />
            </View>
          </AppContainer>
        </ScrollView>
      ) : (
        <NoLogin navigation={navigation} />
      )}
    </>
  );
};

export default ProfileScreen;
