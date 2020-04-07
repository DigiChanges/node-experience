import Config from "config";
import dotenv from "dotenv";

dotenv.config();

const config = {
    'serverPort': process.env.SERVER_PORT ? process.env.SERVER_PORT : Config.get('serverPort'),
    'dbConfig': {
        'host': process.env.DB_HOST ? process.env.DB_HOST : Config.get('dbConfig.host'),
        'port': process.env.DB_PORT ? process.env.DB_PORT : Config.get('dbConfig.port'),
        'database': process.env.DB_DATABASE ? process.env.DB_DATABASE : Config.get('dbConfig.database'),
        'user': process.env.DB_USER ? process.env.DB_USER : Config.get('dbConfig.user'),
        'password': process.env.DB_PASSWORD ? process.env.DB_PASSWORD : Config.get('dbConfig.password'),
    },
    'encryption': {
        'type': 'bcrypt',
        'saltRounds': 10
    }
};

export default config;