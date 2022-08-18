module.exports = {
  devServer: {
    // Fixing issue with WDS disconnected and sockjs network error
    // host: '0.0.0.0',
    // public: '0.0.0.0:8080',
    // disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 5000,
    },
  },
};
