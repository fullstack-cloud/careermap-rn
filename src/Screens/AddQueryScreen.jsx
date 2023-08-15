import React, {useContext} from 'react';
import {Pressable, Text, ScrollView, View} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import AppContainer from '../Components/AppContainer';
import AppHeader from '../Components/AppHeader';
import Button from '../Components/Button';
import Input, {PressableInput, TextArea} from '../Components/Input';
import {Colors} from '../Utils/Colors';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';
import {ChevronLeft} from '../Utils/Icons/Chevrons';
import AddQuery from '../Utils/Illustrations/AddQuery';
import DocumentPicker from 'react-native-document-picker';
import {Call} from '../Service/Api';
import Message from '../Utils/Icons/Message';
import Counsellor from '../Utils/Icons/Counsellor';
import Loader from '../Utils/Loader';
import {ToastMessage} from '../Components/Toastify';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../Context/auth-context';
const FormData = global.FormData;

const INITIAL_STATE = {
  phone_number: '',
  type: '',
  question: '',
};

const AddQueryScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [states, setStates] = React.useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleType = type => {
    setStates(prev => {
      return {...prev, type: type};
    });
  };

  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setStates(prev => ({...prev, file: result}));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  }

  const addQuery = async () => {
    if (Object.keys(states).length === 0) {
      ToastMessage(
        'error',
        'Error',
        'Please fill all details and then try to add query.',
      );
      return;
    }
    if (states.type == '') {
      ToastMessage('error', 'Error', 'Select a type for query.');
      return;
    }
    if (states.phone_number == '') {
      ToastMessage('error', 'Error', 'Please enter a phone number');
      return;
    }
    if (states.phone_number.length !== 10) {
      ToastMessage('error', 'Error', 'Please enter a correct phone number');
      return;
    }
    if (states.question == '') {
      ToastMessage('error', 'Error', 'Please enter a question');
      return;
    }
    let payload;
    if (states.file !== undefined) {
      formData = new FormData();
      formData.append('phone_number', states.phone_number);
      formData.append('type', states.type);
      formData.append('question', states.question);
      formData.append('file', states.file[0]);
      const storedToken = await AsyncStorage.getItem('token');
      const axiosInstance = axios.create({
        baseURL: 'https://careermaps.live/', // use with scheme
        timeout: 30000,
      });
      const config = {
        method: 'post',
        url: 'api/query/',
        responseType: 'json',
        headers: {
          AUTHORIZATION: `Bearer ${storedToken}`,
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data, headers) => {
          return formData;
        },
        onUploadProgress: progressEvent => {},
        data: formData,
      };
      try {
        setIsLoading(true);
        const response = await axiosInstance.request(config);
        setIsLoading(false);
        if (response.data.success) {
          ToastMessage(
            'success',
            'Success',
            states.type == 'query'
              ? 'Query saved successfully. '
              : 'Counsellor data saved successfully.',
          );
        }
        navigation.goBack();
      } catch (err) {
        setIsLoading(false);
        if (err.response.status === 401) {
          logout();
          ToastMessage(
            'error',
            'Authentication failed.',
            'Please login again. Token has been expired.',
          );
        } else {
          ToastMessage(
            'error',
            'Error',
            'Something went wrong. Please try again.',
          );
        }
      }
    } else {
      payload = {...states};
      try {
        setIsLoading(true);
        const response = await Call('queryAdd', payload);
        setIsLoading(false);
        ToastMessage(
          'success',
          'Success',
          states.type === 'query'
            ? 'Query successfully submitted'
            : 'Counsellor request submitted',
        );
        setStates({});
        navigation.goBack();
      } catch (err) {
        if (err.response.status === 401) {
          logout();
          ToastMessage(
            'error',
            'Authentication failed.',
            'Please login again. Token has been expired.',
          );
        }
        setIsLoading(false);
        ToastMessage('error', 'Error', err.response.data.message);
      }
    }
  };

  return (
    <>
      <AppHeader
        middleText={'Add Query'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: false,
        }}
      />
      <Loader visible={isLoading} />
      <ScrollView style={{backgroundColor: Colors.backgroundColor}}>
        <View style={{alignItems: 'center'}}>
          <AddQuery width={Device.width / 2} height={Device.width / 2} />
        </View>
        <AppContainer>
          <Text
            style={{fontSize: 20, fontFamily: Fonts.Bold, marginBottom: 15}}>
            Query Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              flex: 1,
              justifyContent: 'space-evenly',
            }}>
            <Pressable
              onPress={() => {
                handleType('query');
              }}>
              <Neomorph
                inner={states.type === 'query' || false}
                style={{
                  shadowRadius: 4,
                  borderRadius: Device.width / 3.5,
                  backgroundColor: Colors.backgroundColor,
                  width: Device.width / 3.5,
                  height: Device.width / 3.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: 20,
                  marginRight: 20,
                }}>
                <Message
                  width={'30px'}
                  height={'30px'}
                  fill={states.type === 'query' ? Colors.primary : Colors.dark}
                />
                <Text
                  style={{
                    fontFamily: Fonts.Medium,
                    fontSize: 16,
                    color:
                      states.type === 'query' ? Colors.primary : Colors.dark,
                  }}>
                  Query
                </Text>
              </Neomorph>
            </Pressable>
            <Pressable
              onPress={() => {
                handleType('counsellor');
              }}>
              <Neomorph
                inner={states.type === 'counsellor' || false}
                style={{
                  shadowRadius: 4,
                  borderRadius: Device.width / 3.5,
                  backgroundColor: Colors.backgroundColor,
                  width: Device.width / 3.5,
                  height: Device.width / 3.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  marginBottom: 20,
                  marginRight: 20,
                }}>
                <Counsellor
                  width={'30px'}
                  height={'30px'}
                  fill={
                    states.type === 'counsellor' ? Colors.primary : Colors.dark
                  }
                />
                <Text
                  style={{
                    fontFamily: Fonts.Medium,
                    fontSize: 16,
                    color:
                      states.type === 'counsellor'
                        ? Colors.primary
                        : Colors.dark,
                  }}>
                  Counsellor
                </Text>
              </Neomorph>
            </Pressable>
          </View>
          <View style={{marginBottom: 10}}>
            <Input
              onChangeText={text => {
                if (text.trim().length < 11)
                  setStates(prev => ({...prev, phone_number: text}));
              }}
              value={states.phone_number}
              placeholder="Phone Number"
              keyboardType={'numeric'}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <TextArea
              placeholder="Comment"
              value={states.question}
              onChangeText={text =>
                setStates(prev => ({...prev, question: text}))
              }
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <PressableInput
              placeholder={'Select file'}
              neomorphStyle={{width: Device.width / 2}}
              onPress={pickDocument}
            />
          </View>
          <View style={{paddingVertical: 15}}>
            {states && states.file ? (
              <Text style={{fontSize: 16, fontFamily: Fonts.SemiBold}}>
                {states.file[0].name}
              </Text>
            ) : (
              ''
            )}
          </View>
          <View>
            <Button buttonText={'Add'} onPress={addQuery} />
          </View>
        </AppContainer>
      </ScrollView>
    </>
  );
};

export default AddQueryScreen;
