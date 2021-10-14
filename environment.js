import Constants from "expo-constants";

const ENV = {
  dev: {
    API_URL: 'https://6166ceb813aa1d00170a67bd.mockapi.io/api/v1',
  },

  qa: {
    API_URL: 'https://6166ceb813aa1d00170a67bd.mockapi.io/api/v1',
  },

  prod: {
    API_URL: 'https://6166ceb813aa1d00170a67bd.mockapi.io/api/v1',
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__ || env === 'dev') {
    return ENV.dev;
  } else if (env === 'qa') {
    return ENV.qa;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;