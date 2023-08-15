import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import WebView from 'react-native-webview';
import AppHeader from '../Components/AppHeader';
import {Device} from '../Utils/DeviceDimensions';
import {ChevronLeft} from '../Utils/Icons/Chevrons';
import Loader from '../Utils/Loader';
import Close from '../Utils/Icons/CLose';

const UrlOpenerScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {uri, title} = route.params;

  const checkUrl = url => {
    if (title !== 'Payment') if (url != uri) navigation.goBack();
  };

  useEffect(() => {
    showAlert();
  }, []);

  const showAlert = () => {
    if (title === 'Payment')
      setTimeout(() => {
        Alert.alert(
          'Info',
          'Once payment is done, please close the app and open again. Wait for few minutes for payment to reflect. If any issue comes, contact administration. ',
        );
      }, 1500);
  };

  return (
    <>
      <AppHeader
        middleText={title}
        left={{
          show: true,
          Icon: ChevronLeft,
          click: () => navigation.goBack(),
        }}
        right={{
          show: title === 'Payment' ? true : false,
          Icon: Close,
          click: () => navigation.navigate('Home'),
        }}
      />
      <View style={{flex: 1, marginTop: -10}}>
        <Loader visible={isLoading} />
        <WebView
          style={{flex: 1, width: Device.width, height: 100}}
          source={{uri}}
          onLoadStart={data => checkUrl(data.nativeEvent.url)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
    </>
  );
};

export default UrlOpenerScreen;
