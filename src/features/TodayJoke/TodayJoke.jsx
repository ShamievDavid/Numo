import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import isEmpty from 'lodash.isempty';

import {useFetch, useStorage} from '../../hooks';
import {Spinner, Error, Like} from '../../components';
import {getJokeUrl, getTodayDate, getJokeText} from '../../utils';
import colors from '../../config/colors';

export const TodayJoke = () => {
  const {loadData, data, loading, error} = useFetch();
  const {setToStorage, getFromStorage} = useStorage();
  const [currentJoke, setCurrentJoke] = useState(null);
  const todayDate = getTodayDate();
  const [isPreparingData, setIsPreparingData] = useState(true);

  useEffect(() => {
    const checkHistory = getFromStorage('history');
  }, []);

  useEffect(() => {
    getTodayJoke();
  }, [todayDate]);

  // set updated joke to storage on component unmount
  useEffect(() => {
    return () => {
      currentJoke && setToStorage('today', currentJoke);
    };
  }, [currentJoke]);

  // update local state with newly loaded joke
  useEffect(() => {
    if (data) {
      setCurrentJoke({...data, date: todayDate, liked: false});
    }
  }, [data, todayDate]);

  // check if today joke saved in storage, if no load it
  const getTodayJoke = async () => {
    const todayJoke = await getFromStorage('today');

    if (todayJoke && !isEmpty(todayJoke)) {
      if (todayJoke.date === todayDate) {
        getJokeFromStorage(todayJoke);
      } else {
        // load new joke
        await loadJoke();
        // if outdated joke push it to history storage
        await addJokeToHistoryStorage();
      }
    } else {
      // load initial joke
      await loadJoke();
    }
  };

  const loadJoke = async () => {
    const url = getJokeUrl();
    await loadData(url);
  };

  const getJokeFromStorage = todayJoke => {
    setCurrentJoke(todayJoke);
    setIsPreparingData(false);
  };

  const addJokeToHistoryStorage = async () => {
    const jokesList = await getFromStorage('history');
    await setToStorage('history', {
      ...jokesList,
      [currentJoke.date]: currentJoke,
    });
  };

  const handleLike = () => {
    setCurrentJoke({...currentJoke, liked: !currentJoke.liked});
  };

  if (isPreparingData && loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.joke}>{currentJoke && getJokeText(currentJoke)}</Text>
      <Like liked={currentJoke?.liked} size={64} onPress={handleLike} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  joke: {
    color: colors.black,
    fontSize: 24,
    lineHeight: 38,
    fontWeight: '600',
    paddingHorizontal: 24,
  },
});
