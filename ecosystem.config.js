module.exports = {
    apps : [{
        name: "node-experience",
        script: "./dist/src/index.js",
        error_file: "./dist/src/logs/err.log",
        watch: false,
        instances: 2,
        ignore_watch: './dist/src/logs/*',
        instance_var: "0",
        env: {
            NODE_ENV: "production",
            NODE_CONFIG_STRICT_MODE: false
        }
    }]
}
