import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API_BASE = {
  baseURL: 'https://careermaps.live/',
  login: {
    route: 'auth/send-otp',
    method: 'POST',
  },
  signup: {
    route: 'auth/register-student',
    method: 'POST',
  },
  verifyOTP: {
    route: 'auth/otp-login',
    method: 'POST',
  },
  getPorfile: {
    route: 'api/account',
    method: 'GET',
  },
  updateProfile: {
    route: 'auth/update-student',
    method: 'PUT',
  },
  queryList: {
    route: 'api/query',
    method: 'GET',
  },
  queryAdd: {
    route: 'api/query/',
    method: 'POST',
  },
  queryFile: {
    route: 'api/query/',
    method: 'GET',
  },
  getQuery: {
    route: 'api/query',
    method: 'GET',
  },
  addQuery: {
    route: 'api/query',
    method: 'POST',
  },
  getPlans: {
    route: 'api/plan',
    method: 'GET',
  },
  purchasePlan: {
    route: 'api/student/acquire-plan',
    method: 'POST',
  },
  dropDown: {
    route: 'api/index/app-sources',
    method: 'GET',
  },
  popupData: {
    route: 'api/index/app-defaults',
    method: 'GET',
  },
  history: {
    route: 'api/account/history',
    method: 'GET',
  },
  chooseStudent: {
    route: 'auth/single-user-login',
    method: 'POST',
  },
  userInfo: {
    route: 'api/student',
    method: 'GET',
  },
  onlinePayment: {
    route: 'api/payment/razorpay',
    method: 'POST',
  },
};

export const Call = async (URL, payload = null, urlParam = '') => {
  const storedToken = await AsyncStorage.getItem('token');
  let data = {};
  let headers = {};
  if (storedToken) {
    headers = {
      AUTHORIZATION: `Bearer ${storedToken}`,
    };
  }
  if (payload) {
    data = {
      ...payload,
    };
  }
  console.log(API_BASE.baseURL + API_BASE[URL].route + '/' + urlParam);
  console.log(storedToken);
  const response = await axios({
    method: API_BASE[URL].method,
    url: API_BASE.baseURL + API_BASE[URL].route + '/' + urlParam,
    data,
    headers,
  });
  return response;
};
