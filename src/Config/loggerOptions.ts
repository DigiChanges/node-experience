const loggerOptions = {
    file: {
        level: 'error',
        filename: './dist/logs/error.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        datePattern: '.yyyy-MM-dd',
        timestamp: true,
        meta: true
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

export default loggerOptions;
