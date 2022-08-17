
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.4.16",
      skipMD5: true
    },
    instance: {},
    autoStart: false,
    useSharedDBForAllJestWorkers: false
  }
};
