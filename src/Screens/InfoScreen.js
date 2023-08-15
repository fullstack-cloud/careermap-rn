import {Linking, Pressable, ScrollView, View, Text} from 'react-native';
import React from 'react';
import Loader from '../Utils/Loader';
import {useFocusEffect} from '@react-navigation/native';
import AppHeader from '../Components/AppHeader';
import {ChevronLeft} from '../Utils/Icons/Chevrons';
import {ToastMessage} from '../Components/Toastify';
import {Call} from '../Service/Api';
import {Colors} from '../Utils/Colors';
import AppContainer from '../Components/AppContainer';
import Info from '../Utils/Illustrations/Info';
import {Device} from '../Utils/DeviceDimensions';
import {Fonts} from '../Utils/Fonts';

const InfoScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [popupData, setPopupData] = React.useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await Call('popupData', {});
      setIsLoading(false);
      setPopupData(response.data.data);
    } catch (err) {
      setIsLoading(false);
      ToastMessage('error', 'Error', 'Something went wrong.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <>
      <Loader visible={isLoading} />
      <AppHeader
        middleText={'App Info'}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => {
            navigation.goBack();
          },
        }}
        right={{
          show: false,
        }}
      />
      <ScrollView style={{backgroundColor: Colors.backgroundColor}}>
        <AppContainer>
          <View style={{alignItems: 'center'}}>
            <Info width={Device.width / 2} height={Device.width / 2} />
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 25, fontFamily: Fonts.Medium}}>
              App Info
            </Text>
          </View>
          {popupData.length ? (
            <>
              <View>
                <Text style={{fontSize: 21, fontFamily: Fonts.Bold}}>
                  Remote
                </Text>
                <View>
                  <Pressable
                    onPress={() => {
                      if (
                        popupData.length &&
                        popupData[0].googleMeetLink &&
                        popupData[0].googleMeetLink != ''
                      ) {
                        Linking.openURL(popupData[0].googleMeetLink);
                      }
                      /* popupData[0].googleMeetLink */
                    }}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Connect using G-Meet:{' '}
                      <Text style={{color: Colors.primary}}>
                        {'Click Here'}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      if (
                        popupData.length &&
                        popupData[0].whatsappLink &&
                        popupData[0].whatsappLink != ''
                      ) {
                        Linking.openURL(popupData[0].whatsappLink);
                      }
                      /* popupData[0].whatsappLink */
                    }}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Connect on Whatsapp:{' '}
                      <Text style={{color: Colors.primary}}>
                        {'Click Here'}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={{paddingVertical: 20}}>
                <Text style={{fontSize: 21, fontFamily: Fonts.Bold}}>
                  My Access
                </Text>
                <View>
                  <Pressable
                    onPress={() => {
                      if (popupData.length && popupData[0].youtube_link != '') {
                        Linking.openURL(popupData[0].youtube_link);
                      }
                      /* popupData[0].youtube_link */
                    }}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Course on Youtube:{' '}
                      <Text style={{color: Colors.primary}}>
                        {'Click Here'}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 21, fontFamily: Fonts.Medium}}>
                  Contact us
                </Text>
                <View>
                  <Pressable onPress={null}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Email{' '}
                      <Text style={{color: Colors.primary}}>
                        {popupData[0].email}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable onPress={null}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Mobile{' '}
                      <Text style={{color: Colors.primary}}>
                        {popupData[0].phone_number}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      if (popupData.length && popupData[0].liveurl != '') {
                        Linking.openURL(popupData[0].liveurl);
                      }
                    }}>
                    <Text style={{fontFamily: Fonts.Medium, fontSize: 17}}>
                      Website{' '}
                      <Text style={{color: Colors.primary}}>
                        {popupData[0].liveurl}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          ) : (
            ''
          )}
        </AppContainer>
      </ScrollView>
    </>
  );
};

export default InfoScreen;
