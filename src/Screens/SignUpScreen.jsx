import React from 'react';
import {Pressable, ScrollView, Text, View, StyleSheet} from 'react-native';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import CheckBox from '@react-native-community/checkbox';
import AppContainer from '../Components/AppContainer';
import Input, {PressableInput} from '../Components/Input';
import Calendar from '../Utils/Icons/Calendar';
import ChevronRight, {ChevronLeft} from '../Utils/Icons/Chevrons';
import Button from '../Components/Button';
import {Colors} from '../Utils/Colors';
import {Neomorph} from 'react-native-neomorph-shadows';
import Male from '../Utils/Icons/Male';
import Female from '../Utils/Icons/Female';
import Other from '../Utils/Icons/Other';
import PointingHand from '../Utils/Icons/PointingHand';
import AppHeader from '../Components/AppHeader';
import SignUp from '../Utils/Illustrations/SignUp';
import {Device} from '../Utils/DeviceDimensions';
import {ToastMessage} from '../Components/Toastify';
import {Call} from '../Service/Api';
import Loader from '../Utils/Loader';
import {Fonts} from '../Utils/Fonts';
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

const INITIAL_STATE = {
  first_name: '',
  last_name: '',
  dial_code: '+91',
  phone_number: '',
  email: '',
  gender: '',
  dob: '',
  occupation: 'Occupation',
  current_standard: 'Current Standard',
  device_type: 'android',
};

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const SignUpScreen = ({navigation}) => {
  const [states, setStates] = React.useState(INITIAL_STATE);
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dropD, setDropD] = React.useState([]);
  const [isFocus, setIsFocus] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [focusStates, setFocusStates] = React.useState({
    current_standard: false,
    occupation: false,
  });

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

  const renderLabel = label => {
    if (value || isFocus) {
      return <Text style={[isFocus && {color: Colors.primary}]}>{label}</Text>;
    }
    return null;
  };

  const handleGender = type => {
    setStates(prev => {
      return {...prev, gender: type};
    });
  };

  handleSubmit = async () => {
    if (states.first_name.trim() === '') {
      ToastMessage('error', 'Validation Error', 'First name is required');
      return;
    }
    if (states.last_name.trim() === '') {
      ToastMessage('error', 'Validation Error', 'Last name is required');
      return;
    }
    if (states.phone_number.trim() === '') {
      ToastMessage('error', 'Validation Error', 'Mobile number is required');
      return;
    }
    if (states.phone_number.trim().length != 10) {
      ToastMessage('error', 'Validation Error', 'Enter correct mobile number');
      return;
    }
    if (states.gender.trim() === '') {
      ToastMessage('error', 'Validation Error', 'Gender is required');
      return;
    }
    if (!toggleCheckBox) {
      ToastMessage(
        'error',
        'Validation Error',
        'Please accept terms and conditions',
      );
      return;
    }
    setIsLoading(true);
    let payload = {...states, no_sub: 1};
    try {
      const response = await Call('signup', payload);
      // setIsLoading(false);
      loginUser();
    } catch (error) {
      setIsLoading(false);
      ToastMessage('error', 'Error', error.response.data.message);
    }
  };

  const loginUser = async () => {
    try {
      const response = await Call('login', {
        phone_number: states.phone_number,
        device_type: 'android',
      });
      if (response.data.success) {
        navigation.navigate('otp', {phone_number: states.phone_number});
      } else {
        setIsLoading(false);
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
  };

  handleDateOfBirth = e => {
    if (e.type == 'set') {
      let dateFormat = new Date(e.nativeEvent.timestamp);
      let month = parseInt(dateFormat.getMonth()) + 1;
      let date = dateFormat.getDate();
      month = month < 10 ? '0' + month : month;
      date = date < 10 ? '0' + date : date;
      let dob = dateFormat.getFullYear() + '-' + month + '-' + date;

      setStates(prev => {
        return {...prev, dob};
      });
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <AppHeader
        middleText={'Sign Up'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: false,
        }}
      />
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff', position: 'relative'}}>
        <AppContainer>
          <View
            style={{
              marginTop: 40,
              borderColor: Colors.primary,
              borderWidth: 2,
              borderRadius: 4,
              padding: 20,
            }}>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Mentors
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: Colors.dark,
                      fontFamily: Fonts.Medium,
                    }}>
                    Free mentoring per week
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Remote Learning
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Unlimited counseling
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: Colors.dark,
                      fontFamily: Fonts.Medium,
                    }}>
                    From India's best Counsellors
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Specialised English Communication
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: Colors.dark,
                      fontFamily: Fonts.Medium,
                    }}>
                    session
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Watch videos
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: Colors.dark,
                      fontFamily: Fonts.Medium,
                    }}>
                    1000+ hours of engages videos containing all syllabus
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <View>
                <PointingHand />
              </View>
              <View style={{paddingLeft: 20}}>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.dark,
                      fontFamily: Fonts.Bold,
                    }}>
                    Career Maps
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '400',
                      color: Colors.dark,
                      fontFamily: Fonts.Medium,
                    }}>
                    400+ Careers on one platform
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: Colors.dark,
                fontFamily: Fonts.Medium,
              }}>
              Register with below details
            </Text>
            <View style={{marginTop: 20}}>
              <Input
                keyboardType={'default'}
                placeholder={'First Name'}
                value={states.first_name}
                onChangeText={text =>
                  setStates(prev => {
                    return {...prev, first_name: text};
                  })
                }
              />
              <Input
                keyboardType={'default'}
                placeholder={'Last Name'}
                value={states.last_name}
                onChangeText={text =>
                  setStates(prev => {
                    return {...prev, last_name: text};
                  })
                }
              />
              <Input
                keyboardType={'number-pad'}
                placeholder={'Phone Number'}
                customText={true}
                value={states.phone_number}
                onChangeText={text => {
                  if (text.trim().length < 11)
                    setStates(prev => {
                      return {...prev, phone_number: text};
                    });
                }}
              />
              <Input
                keyboardType={'email-address'}
                placeholder={'Email Address (Optional)'}
                value={states.email}
                onChangeText={text =>
                  setStates(prev => {
                    return {...prev, email: text};
                  })
                }
              />
              <View>
                <Text
                  style={{
                    color: Colors.dark,
                    fontSize: 18,
                    fontWeight: '600',
                    marginBottom: 10,
                    fontFamily: Fonts.Medium,
                  }}>
                  Gender
                </Text>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Pressable
                    onPress={() => {
                      handleGender('male');
                    }}>
                    <Neomorph
                      inner={states.gender === 'male' || false}
                      style={{
                        shadowRadius: 5,
                        borderRadius: 35,
                        backgroundColor: '#eee',
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: 20,
                        marginRight: 20,
                      }}>
                      <Male width={30} height={30} />
                    </Neomorph>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      handleGender('female');
                    }}>
                    <Neomorph
                      inner={states.gender === 'female' || false}
                      style={{
                        shadowRadius: 5,
                        borderRadius: 35,
                        backgroundColor: '#eee',
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: 20,
                        marginRight: 20,
                      }}>
                      <Female width={30} height={30} />
                    </Neomorph>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      handleGender('other');
                    }}>
                    <Neomorph
                      inner={states.gender === 'other' || false}
                      style={{
                        shadowRadius: 4,
                        borderRadius: 35,
                        backgroundColor: '#eee',
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        marginBottom: 20,
                        marginRight: 20,
                      }}>
                      <Other />
                    </Neomorph>
                  </Pressable>
                </View>
              </View>
              <PressableInput
                placeholder={states.dob ? states.dob : 'Select DOB'}
                onPress={() => {
                  let dobArr = states.dob ? states.dob.split('-') : [];
                  DateTimePickerAndroid.open({
                    value: dobArr.length
                      ? new Date(
                          dobArr[0],
                          dobArr[1] - 1,
                          dobArr[2],
                          '00',
                          '00',
                          0,
                          0,
                        )
                      : new Date(),
                    onChange: handleDateOfBirth,
                    mode: 'date',
                  });
                }}
                iconRight={<Calendar width="25px" height="25px" />}
              />

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
                  placeholderStyle={{}}
                  selectedTextStyle={{fontSize: 14}}
                  inputSearchStyle={{}}
                  iconStyle={{}}
                  data={dropD}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="label"
                  placeholder={'Current Standard'}
                  searchPlaceholder="Search..."
                  value={states.current_standard}
                  onFocus={() =>
                    setFocusStates(prev => ({...prev, current_standard: true}))
                  }
                  onBlur={() =>
                    setFocusStates(prev => ({...prev, current_standard: false}))
                  }
                  onChange={item => {
                    setStates(prev => ({
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
                placeholder={'Select Destination/Aim Occupation'}
                onPress={() => null}
                iconRight={<ChevronRight width="18px" height="18px" />}
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
                  style={[isFocus && {borderColor: Colors.primary}]}
                  placeholderStyle={{}}
                  selectedTextStyle={{fontSize: 14}}
                  inputSearchStyle={{}}
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
                  value={states.occupation}
                  onFocus={() =>
                    setFocusStates(prev => ({...prev, occupation: true}))
                  }
                  onBlur={() =>
                    setFocusStates(prev => ({...prev, occupation: false}))
                  }
                  onChange={item => {
                    setStates(prev => ({...prev, occupation: item.label}));
                    setFocusStates(prev => ({...prev, occupation: false}));
                  }}
                  renderLeftIcon={null}
                />
              </Neomorph>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                  tintColors={{true: Colors.primary, false: Colors.lightdark}}
                />
                <Text style={{fontFamily: Fonts.Medium}}>
                  By signing you agree,{' '}
                  <Text style={{color: Colors.primary, fontWeight: '600'}}>
                    T&C
                  </Text>{' '}
                  and{' '}
                  <Text style={{color: Colors.primary, fontWeight: '600'}}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
              <Button buttonText={'Create an account'} onPress={handleSubmit} />
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  paddingVertical: 20,
                }}
                onPress={() => {
                  navigation.navigate('login');
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: Colors.dark,
                    fontFamily: Fonts.Bold,
                  }}>
                  Already have an Account?
                </Text>
                <Text
                  style={{
                    color: Colors.primary,
                    fontSize: 18,
                    fontWeight: '600',
                    paddingLeft: 10,
                    fontFamily: Fonts.Bold,
                  }}>
                  Sign in
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <SignUp width={Device.width / 1.5} height={Device.width / 1.5} />
          </View>
        </AppContainer>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
