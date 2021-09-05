const settings = {
    dev: {
      apiUrl: 'http://localhost:4000/api',
    },
    staging: {
        apiUrl: 'http://localhost:4000/api',
    },
    prod: {
        apiUrl: 'http://localhost:4000/api',
    },
  };
  
  const getCurrentSettings = () => {
    return settings.dev;
  };
  
  export default getCurrentSettings();
  