import React, {useContext} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {Device} from '../Utils/DeviceDimensions';
import Button, {ButtonHalfWidth} from '../Components/Button';
import TabHeader from '../Components/TabHeader';
import {AuthContext} from '../Context/auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {Call} from '../Service/Api';
import {ToastMessage} from '../Components/Toastify';
import Loader from '../Utils/Loader';
import UsersList from '../Components/UsersList';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const {
    token,
    setUser,
    userData: uData,
    authenticate,
    logout,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [userList, setUserList] = React.useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const getData = async () => {
    try {
      let userData = await AsyncStorage.getItem('user_data');
      userData = JSON.parse(userData);
      setIsLoading(true);
      const response = await Call('userInfo', {}, userData._id);
      setIsLoading(false);
      setUser(response.data.data[0]);
      setUserList(response.data.data[0].users);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if ([403, 404].includes(err?.response?.status)) {
        logout();
      }
      ToastMessage('error', 'Error', 'Something went wrong.');
    }
  };

  const switchProfile = () => {
    if (userList.length > 1) {
      setShowDetails(true);
    } else {
      setShowDetails(false),
        ToastMessage(
          'info',
          'Info',
          "You don't any other account with this number",
        );
    }
  };

  return (
    <>
      <Loader visible={isLoading} />
      <TabHeader
        leftClick={() => navigation.openDrawer()}
        navigation={navigation}
        title={'Home'}
        switchProfile={switchProfile}
      />
      {userList.length > 1 ? (
        <UsersList
          ignoreKey={uData._id}
          visible={showDetails}
          onClose={() => setShowDetails(false)}
          data={userList}
          onChoose={async data => {
            if (data) {
              try {
                let payload = {
                  phone_number: uData.phone_number,
                  student_id: data,
                };
                setIsLoading(true);
                const response = await Call('chooseStudent', payload);
                setShowDetails(false);
                setIsLoading(false);
                await authenticate({
                  token: response.data.data[0].accessToken,
                  user_data: response.data.data[0].user,
                });
                getData();
              } catch (error) {
                setIsLoading(false);
              }
            } else {
              ToastMessage('info', 'Info', 'Select an account first.');
            }
          }}
        />
      ) : (
        ''
      )}
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: (Device.height * 6) / 7,
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
              onPress={() => {
                if (uData?.plan?.is_active) {
                  if (moment().diff(uData.plan.subscription_end, 'days') < 0) {
                    navigation.navigate('webopener', {
                      uri: `https://careermaps.live/career-path-finder?caller=app&token=${token}`,
                      title: 'Career Path Finder',
                    });
                  } else {
                    Alert.alert(
                      'No Plan Purchased!',
                      'Please buy a plan to use this feature. ',
                    );
                  }
                } else {
                  Alert.alert(
                    'No Plan Purchased!',
                    'Please buy a plan to use this feature. ',
                  );
                }
              }}
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
              onPress={() => {
                if (uData?.plan?.is_active) {
                  if (moment().diff(uData.plan.subscription_end, 'days') < 0) {
                    navigation.navigate('webopener', {
                      uri: `https://careermaps.live/rank?caller=app&token=${token}`,
                      title: 'Rank',
                    });
                  } else {
                    Alert.alert(
                      'No Plan Purchased!',
                      'Please buy a plan to use this feature. ',
                    );
                  }
                } else {
                  Alert.alert(
                    'No Plan Purchased!',
                    'Please buy a plan to use this feature. ',
                  );
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreen;
