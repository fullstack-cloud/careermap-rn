import {useFocusEffect} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Text, ScrollView, View} from 'react-native';
import AppContainer from '../Components/AppContainer';
import Button from '../Components/Button';
import NoLogin from '../Components/NoLogin';
import QueryBox from '../Components/QueryBox';
import QueryDetails from '../Components/QueryDetails';
import TabHeader from '../Components/TabHeader';
import {ToastMessage} from '../Components/Toastify';
import {AuthContext} from '../Context/auth-context';
import {Call} from '../Service/Api';
import {Colors} from '../Utils/Colors';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';
import Add from '../Utils/Icons/Add';
import Loader from '../Utils/Loader';
import NoPlan from '../Components/NoPlan';
import NoQuery from '../Utils/Illustrations/NoQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const QueryScreen = ({navigation}) => {
  const {isAuthenticated, token, logout, userData, setUser} =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [query, setQuery] = React.useState([]);
  const [individualQuery, setIndividualQuery] = React.useState({});
  const [paid, setPaid] = React.useState(false);

  getQueries = async () => {
    /* if (userData?.plan?.is_active) {
      if (moment().diff(userData.plan.subscription_end, 'days') < 0) {
        setPaid(true);
      } else {
        setPaid(false);
      }
    } */
    try {
      setIsLoading(true);
      setShowDetails(false);
      const response = await Call('queryList', {});
      setIsLoading(false);
      if (response.data.success) {
        // ToastMessage('success', 'Success', response.data.message);
        setQuery(response.data.data);
      }
    } catch (err) {
      setIsLoading(false);
      ToastMessage('error', 'Error', err.response.data.message);
      if (err.response.status === 403) {
        logout();
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
      if (isAuthenticated) {
        getQueries();
      }
    }, []),
  );

  const getData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user_data');
      userData = JSON.parse(userData);
      const response = await Call('userInfo', {}, userData._id);
      setUser(response.data.data[0]);
      console.log(response.data);
      const uData = response.data.data[0];
      console.log(uData);
      if (uData?.plan?.is_active) {
        if (moment().diff(uData.plan.subscription_end, 'days') < 0) {
          setPaid(
            'plan' in uData &&
              Object.entries(uData.plan) &&
              uData.plan.is_active,
          );
        } else {
          setPaid(false);
        }
      } else {
        setPaid(false);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.status === 404 || err?.response?.status === 401) {
        logout();
      }
      ToastMessage('error', 'Error', 'Something went wrong.');
    }
  };

  const openQuery = id => {
    if (id) {
      setIsLoading(true);
      try {
        Call('getQuery', {}, id)
          .then(response => {
            if (response.data.success) {
              setIndividualQuery(response.data.data[0]);
              setShowDetails(true);
            } else {
              ToastMessage(
                'error',
                'Error',
                'Something went wrong. try again.',
              );
            }
            setIsLoading(false);
          })
          .catch(error => {
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      ToastMessage('error', 'Error', 'Something went wrong. try again.');
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <QueryDetails
        visible={showDetails}
        onClose={() => setShowDetails(false)}
        data={individualQuery}
      />
      <TabHeader
        leftClick={() => navigation.openDrawer()}
        title={'Query'}
        navigation={navigation}
        color={isAuthenticated ? Colors.backgroundColor : Colors.light}
      />
      {paid ? (
        <ScrollView>
          <AppContainer>
            <View style={{alignItems: 'flex-end', paddingTop: 15}}>
              <Button
                buttonText={'Add'}
                buttonStyle={{
                  width: Device.width / 3,
                  backgroundColor: Colors.backgroundColor,
                }}
                textStyle={{
                  color: Colors.primary,
                  fontFamily: Fonts.SemiBold,
                  paddingLeft: 10,
                }}
                icon={<Add fill={Colors.primary} />}
                onPress={() => navigation.navigate('addquery')}
              />
            </View>

            {query.length ? (
              query.map((item, index) => {
                return (
                  <QueryBox
                    key={index}
                    data={item}
                    onPress={() => openQuery(item._id)}
                  />
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50,
                }}>
                <NoQuery width={Device.width / 2} height={Device.width / 2} />
                <Text
                  style={{
                    fontFamily: Fonts.SemiBold,
                    fontSize: 20,
                    marginTop: 40,
                  }}>
                  No Queries Found.{' '}
                </Text>
              </View>
            )}
          </AppContainer>
        </ScrollView>
      ) : (
        <NoPlan navigation={navigation} />
      )}
    </>
  );
};

export default QueryScreen;
