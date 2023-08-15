
import Toast, {BaseToast, ErrorToast,SuccessToast} from 'react-native-toast-message';
import { Colors } from '../Utils/Colors';
import { Device } from '../Utils/DeviceDimensions';
import { Fonts } from '../Utils/Fonts';

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      style={{borderLeftColor: Colors.green,height: 70,borderRadius: 10,width: Device.width - 20}}
      text1Style={{
        fontSize: 18,
        fontFamily: Fonts.Bold,
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: Fonts.Medium,
      }}
      text2NumberOfLines={2}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: Colors.error,borderRadius: 10,height: 70,width: Device.width - 20}}
      text1Style={{
        fontSize: 18,
        fontFamily: Fonts.Medium,
        color: Colors.dark,
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: 'normal'
      }}
      text2NumberOfLines={2}
    />
  ),
  info: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: Colors.secondary,borderRadius: 10,height: 70,width: Device.width - 20}}
      text1Style={{
        fontSize: 18,
        fontFamily: Fonts.Medium,
        color: Colors.dark,
      }}
      text2Style={{
        fontSize: 15,
        fontFamily: Fonts.Regular,
        fontWeight: 'normal'
      }}
      text2NumberOfLines={2}
    />
  ),
};

const Toastify = () => {
  return <Toast config={toastConfig} />;
};

export const ToastMessage = (one, two, three, position = 'top') => {
  return (
    Toast.hide(),
    Toast.show({
      type: one,
      text1: two,
      text2: three,
      position: position,
    })
  );
};

export default Toastify;
