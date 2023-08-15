import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {createContext, useState} from 'react';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: async token => {},
  logout: () => {},
  userData: {},
  setUser: async (data) => {}
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [userData, setUserData] = useState(null);

  async function authenticate(data) {
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('user_data', JSON.stringify(data.user_data));
    setAuthToken(data.token);
    setUserData(data.user_data);
    return true;
  }

  async function setUser(data) {
    await AsyncStorage.setItem('user_data', JSON.stringify(data));
    setUserData(data);
  }

  function logout() {
    setAuthToken(null);
    setUserData(null);
    AsyncStorage.clear()
    // AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    userData,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
