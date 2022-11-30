import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStorage() {
  const getFromStorage = async key => {
    const res = await AsyncStorage.getItem(key);
    return await JSON.parse(res);
  };

  const setToStorage = async (key, updatedData) => {
    AsyncStorage.setItem(key, JSON.stringify(updatedData));
  };

  return {setToStorage, getFromStorage};
}
