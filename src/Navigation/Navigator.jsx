import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Toastify from '../Components/Toastify';
import { AuthContext } from '../Context/auth-context';
import AddQueryScreen from '../Screens/AddQueryScreen';
import HomeScreen from '../Screens/HomeScreen';
import InfoScreen from '../Screens/InfoScreen';
import LoginScreen from '../Screens/LoginScreen';
import OTPScreen from '../Screens/OTPScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import PlanScreen from '../Screens/PlanScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import UrlOpenerScreen from '../Screens/UrlOpenerScreen';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator, { TabNavNoLogin } from './TabNavigator';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const authCtx = useContext(AuthContext);

 /*  const getAsyncData = async () => {
    let token
    await AsyncStorage.getAllKeys(async(err, keys) => {
      await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          if(store[i][0] == 'token') {
            token = store[i][1];
          }
        });
      });
    });
    return token;
  } */

  React.useEffect(() => {
    async function fetchToken() {
      SplashScreen.hide();
      let storedToken = '';
      try {
        let keys = await AsyncStorage.getAllKeys();
        let result = await AsyncStorage.multiGet(keys);
        let payload = {};
        result.map((result, i, store) => {
          payload[store[i][0]] = i > 0 ? JSON.parse(store[i][1]) : store[i][1];
        });
        Object.keys(payload).length === 2 && authCtx.authenticate(payload);
      } catch (err) {
      }
    }

    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#ff9700' },
        }}>
        {!authCtx.isAuthenticated && (
          <>
            <Stack.Screen name="home" component={TabNavNoLogin} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen name="otp" component={OTPScreen} />
          </>
        )}
        {authCtx.isAuthenticated && (
          <>
            <Stack.Screen
              name="mainhome"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="addquery"
              component={AddQueryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="webopener" component={UrlOpenerScreen} />
            <Stack.Screen name="payment" component={PaymentScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {/* <Stack.Screen name="Plans" component={PlanScreen} /> */}
          </>
        )}
        <Stack.Screen name="Info" component={InfoScreen} />
      </Stack.Navigator>
      <Toastify />
    </NavigationContainer>
  );
};

export default Navigator;
