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
        'saltRounds': 10,
        'algorithm': 'HS512' // TODO: CHANGE hardcording alg
    },
    'jwt': {
        'secret': process.env.JWT_SECRET ? process.env.JWT_SECRET : Config.get('jwt.secret'),
        'expires': process.env.JWT_EXPIRES ? process.env.JWT_EXPIRES : Config.get('jwt.expires'),
        'iss': process.env.JWT_ISS ? process.env.JWT_ISS : Config.get('jwt.iss'),
        'aud': process.env.JWT_AUD ? process.env.JWT_AUD : Config.get('jwt.aud')
    },
    'apiWhitelist': [
        {
            method: ['POST'],
            url: '/api/auth/login'
        },
        {
            method: ['POST'],
            url: '/api/auth/forgotPassword'
        },        
        {
            method: ['POST'],
            url: '/api/users'
        },        
    ],
    'mail': {
        'host': process.env.SMTP_HOST ? process.env.SMTP_HOST : Config.get('mail.host'),
        'port': process.env.SMTP_PORT ? process.env.SMTP_PORT : Config.get('mail.port'),       
        'username': process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : Config.get('mail.username'),
        'password': process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD : Config.get('mail.password'),
        "secure": process.env.SMTP_SECURE_SSL ? process.env.SMTP_SECURE_SSL : Config.get('mail.secureSsl'),
        "senderName": process.env.SMTP_SENDERNAME ? process.env.SMTP_SENDERNAME : Config.get('mail.senderName'),
        "senderEmailDefault": process.env.SMTP_SENDER_EMAIL_DEFAULT ? process.env.SMTP_SENDER_EMAIL_DEFAULT : Config.get('mail.senderEmailDefault')
    },
    'url':{
        'url_api': process.env.URL_API ? process.env.URL_API : Config.get('url.url_api'),
        'url_web': process.env.URL_WEB ? process.env.URL_WEB : Config.get('url.url_web'),
    }
};

export default config;