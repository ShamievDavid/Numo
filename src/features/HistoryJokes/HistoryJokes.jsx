import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import isEmpty from 'lodash.isempty';

import {Joke} from './Joke';
import {useStorage} from '../../hooks';
import {Spinner, NoData} from '../../components';
import {getJokeText} from '../../utils';
// import {getMockedJokes} from '../../utils';

export const HistoryJokes = () => {
  const [jokesList, setJokesList] = useState(null);
  const [isPreparingData, setIsPreparingData] = useState(true);
  const {setToStorage, getFromStorage} = useStorage();

  // set up mocked jokes in history
  // useEffect(() => {
  //   setMockedData();
  // }, []);

  // const setMockedData = async () => {
  //   setToStorage('history', getMockedJokes());
  // };

  // set updated joke to storage on component unmount
  useEffect(() => {
    return () => {
      jokesList && !isEmpty(jokesList) && setToStorage('history', jokesList);
    };
  }, [jokesList]);

  useEffect(() => {
    getJokesList();
  }, []);

  const getJokesList = async () => {
    const jokes = await getFromStorage('history');
    jokes && setJokesList(jokes);
    setIsPreparingData(false);
  };

  if (isPreparingData) {
    return <Spinner />;
  }

  if (!jokesList || isEmpty(jokesList)) {
    return <NoData />;
  }

  const handleLikeJoke = id => {
    setJokesList({
      ...jokesList,
      [id]: {...jokesList[id], liked: !jokesList[id].liked},
    });
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(jokesList).map(date => {
        const joke = jokesList[date];
        return (
          <Joke
            key={joke.id}
            id={joke.id}
            joke={getJokeText(joke)}
            liked={joke.liked}
            onLike={handleLikeJoke}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
