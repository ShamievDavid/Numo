import React, {useEffect, useState, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import isEmpty from 'lodash.isempty';

import {Joke} from './Joke';
import {useStorage} from '../../hooks';
import {Spinner, NoData} from '../../components';
import {getJokeText, getMockedJokes} from '../../utils';
import {getSortedJokes} from './utilities/getSortedJokes';

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
  }, []);

  const setMockedData = async () => {
    setToStorage('history', getMockedJokes());
  };

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
    <View style={styles.container}>
      {Object.keys(sortedJokes).map(date => {
        const joke = sortedJokes[date];
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
