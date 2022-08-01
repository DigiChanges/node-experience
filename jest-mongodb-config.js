
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.4.0",
      skipMD5: true
    },
    instance: {},
    autoStart: false,
    useSharedDBForAllJestWorkers: false
  }
};
