import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import isEmpty from 'lodash.isempty';

import {Joke} from './Joke';
import {useStorage} from '../../hooks';
import {Spinner, NoData} from '../../components';
import {getJokeText} from '../../utils';
import {getSortedJokes} from './utilities/getSortedJokes';
import {getMockedJokes} from './utilities/getMockedJokes';

export const HistoryJokes = () => {
  const [jokesList, setJokesList] = useState(null);
  const [isPreparingData, setIsPreparingData] = useState(true);
  const sortedJokes = useMemo(
    () => (jokesList ? getSortedJokes(jokesList) : jokesList),
    [jokesList],
  );
  const {setToStorage, getFromStorage} = useStorage();

  useEffect(() => {
    setMockedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMockedData = async () => {
    await setToStorage('history', getMockedJokes());
  };

  // set updated joke to storage on component unmount
  useEffect(() => {
    return () => {
      setJokesListToStorage();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jokesList]);

  useEffect(() => {
    getJokesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setJokesListToStorage = () => {
    jokesList && !isEmpty(jokesList) && setToStorage('history', jokesList);
  };

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

  const handleLikeJoke = date => {
    setJokesList({
      ...jokesList,
      [date]: {...jokesList[date], liked: !jokesList[date].liked},
    });
  };

  return (
    <ScrollView style={styles.container}>
      {Object.keys(sortedJokes).map(date => {
        const joke = sortedJokes[date];
        return (
          <Joke
            key={joke.id}
            date={joke.date}
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
