export const getJokeText = currentJoke =>
  currentJoke.joke || `${currentJoke?.setup} ${currentJoke?.delivery}`;
