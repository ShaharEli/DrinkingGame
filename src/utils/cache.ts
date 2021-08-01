import AsyncStorage from '@react-native-async-storage/async-storage';
import {setItem, getItem} from './storage';
import {DAY_IN_MS} from './time';
export const withCache = async (
  val: string,
  cb: () => any,
  time = DAY_IN_MS,
) => {
  try {
    const AsyncStorageKeys = await AsyncStorage.getAllKeys();
    if (!AsyncStorageKeys.includes(val)) {
      const result = await cb();
      await setItem(val, {data: result, timeStamp: new Date().valueOf()});
      return result;
    }
    //@ts-ignore
    const {data, timeStamp} = JSON.parse(await getItem(val));
    const timediff = new Date().valueOf() - timeStamp;
    if (timediff > time) {
      const result = await cb();
      await setItem(val, {data: result, timeStamp: new Date().valueOf()});
      return result;
    } else {
      if (time - timediff < 60 * 1000 * 5) {
        setTimeout(async () => {
          const result = await cb();
          await setItem(val, {data: result, timeStamp: new Date().valueOf()});
        }, time - timediff);
      }
      return data;
    }
  } catch (e) {
    const result = await cb();
    await setItem(val, {data: result, timeStamp: new Date().valueOf()});
    return result;
  }
};
