import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isDev = true;
// adb reverse tcp:8080 tcp:8080

export const apiHost =
  Platform.OS === 'android' && !isSimulator()
    ? 'http://10.0.2.2:8080'
    : 'http://localhost:8080';
export const apiHostWithVersion = apiHost + '/api/v1';

async function isSimulator() {
  return await DeviceInfo.isEmulator();
}
