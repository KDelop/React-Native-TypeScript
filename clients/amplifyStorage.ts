import * as Keychain from 'react-native-keychain';

export default class AmplifyStorage {
  static syncPromise = null;
  static MEMORY_KEY_PREFIX = '@Athleticus:';
  static data: Record<string, any> = {};

  static setItem(key: string, value: any) {
    Keychain.setGenericPassword(AmplifyStorage.MEMORY_KEY_PREFIX + key, value);
    AmplifyStorage.data[key] = value;
    return AmplifyStorage.data[key];
  }

  static getItem(key: string) {
    return Object.prototype.hasOwnProperty.call(AmplifyStorage.data, key)
      ? AmplifyStorage.data[key]
      : undefined;
  }

  static removeItem(key: string) {
    Keychain.resetGenericPassword();
    return delete AmplifyStorage.data[key];
  }

  static clear() {
    AmplifyStorage.data = {};
    return AmplifyStorage.data;
  }
}
