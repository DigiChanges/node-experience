import dotenv from 'dotenv';
dotenv.config(); // Need before get config
import Config from 'config';
import { TAlgorithm } from 'jwt-simple';

type TypeORMConfig = {
    type: string;
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    synchronize: boolean;
    migrationsRun: boolean;
    logging: boolean;
    entities: string[];
    migrations: string[];
    subscribers: string[];
    cli: {
        entitiesDir: string;
        migrationsDir: string;
        subscribersDir: string;
    };
};

type MongooseConfig = {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
};

type RedisConfig = {
    host: string;
    port: number;
    password: string;
};

type MinioConfig = {
    endPoint: string;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    port: number;
    region: string;
    bucket: string;
};

type JwtConfig = {
    secret: string;
    expires: number;
    iss: string;
    aud: string;
};

type MailConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    secure: boolean;
    senderName: string;
    senderEmailDefault: string;
    templateDir: string;
};

type PushConfig = {
    privateKey: string;
    publicKey: string;
};

type BCryptType = {
    type: string;
    saltRounds: number;
    algorithm: TAlgorithm;
};

type ValidateSettingsType = {
    password: {
        minLength: number;
        maxLength: number;
    };
};

type ApiWhiteType = {
    methods: string[];
    url: string;
    urlRegExp?: RegExp;
};

type ConfigType = {
    env: string;
    nodePath: string;
    serverPort: number;
    auth: {
        authorization: boolean;
    };
    dbConfig: {
        TypeORM: TypeORMConfig;
        Mongoose: MongooseConfig;
        default: string;
    };
    cache: {
        redis: RedisConfig;
    };
    filesystem: {
        minio: MinioConfig;
        local: {
            type: string;
        };
        default: string;
        expiry: number;
    };
    encryption: {
        bcrypt: BCryptType;
        default: string;
    };
    jwt: JwtConfig;
    mail: MailConfig;
    push: PushConfig;
    url: {
        urlApi: string;
        urlWeb: string;
    };
    productInfo: {
        name: string;
    };
    validationSettings: ValidateSettingsType;
    apiWhitelist: ApiWhiteType[];
}

class MainConfig
{
    private mainConfig: ConfigType;
    private static instance: MainConfig = new MainConfig();

    private constructor()
    {
        this.mainConfig = Config.util.loadFileConfigs();

        if (MainConfig.instance)
        {
            throw new Error('Error: Instantiation failed: Use getInstance() instead of new.');
        }

        MainConfig.instance = this;
    }

    public static getInstance(): MainConfig
    {
        if (!MainConfig.instance)
        {
            MainConfig.instance = new MainConfig();
        }

        return MainConfig.instance;
    }

    public getConfig(): ConfigType
    {
        return this.mainConfig;
    }
}

// config from dist/config folder
// const ourConfigDir = path.resolve(__dirname, '../config');
// const mainConfig = Config.util.loadFileConfigs(ourConfigDir);
export default MainConfig;
