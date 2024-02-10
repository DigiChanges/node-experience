import { readFile } from 'node:fs/promises';
import { resolve } from 'path';
import Config from 'config';
import { TAlgorithm } from 'jwt-simple';
import { validateEnv } from './validateEnv';

export type AuthConfig = {
    apiKey: string;
    host: string;
    secret: string;
    authorization: boolean;
};

export type AppConfig = {
    default: string;
    path: string;
    setAppProxy: boolean;
    setCookieSecure: boolean,
    setCookieSameSite: boolean | 'None' | 'Lax' | 'Strict' | 'none' | 'lax' | 'strict',
    serverPort: number,
}

export type MongooseConfig = {
    uri: string;
};

export type MikroORMConfig = {
    dbName: string,
    host: string;
    port: number;
    type: 'mysql' | 'mariadb' | 'postgresql' | 'sqlite',
    user: string;
    password: string;
};

export type DbConfigType = {
    Mongoose: MongooseConfig,
    MikroORM: MikroORMConfig,
    default: string
}

export type CacheConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
};

export type MinioConfig = {
    endPoint: string;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    port: number;
    publicBucket: string;
    privateBucket: string;
    rootPath: string;
    region: string;
};

export type JwtConfig = {
    secret: string;
    expires: number;
    iss: string;
    aud: string;
};

export type MailConfig = {
    host: string;
    port: number;
    username: string;
    password: string;
    secure: boolean;
    senderName: string;
    senderEmailDefault: string;
    templateDir: string;
};

export type PushConfig = {
    privateKey: string;
    publicKey: string;
};

export type BCryptType = {
    type: string;
    saltRounds: number;
    algorithm: TAlgorithm;
};

export type ValidateSettingsType = {
    password: {
        minLength: number;
        maxLength: number;
    };
};

export type MessageBrokerConfig = {
    protocol: string,
    hostname: string,
    username: string,
    password: string,
    port: number
}

export type ConfigType = {
    env: string,
    auth: AuthConfig;
    app: AppConfig,
    dbConfig: DbConfigType,
    messageBroker: MessageBrokerConfig,
    cache: {
        redis: CacheConfig,
        enable: boolean
    };
    filesystem: {
        minio: MinioConfig,
        default: string,
        expiry: number
    };
    encryption: {
        bcrypt: BCryptType,
        default: string
    };
    jwt: JwtConfig,
    mail: MailConfig,
    push: PushConfig,
    url: {
        urlApi: string,
        urlWeb: string
    };
    productInfo: {
        name: string
    };
    executeCrons: boolean,
    validationSettings: ValidateSettingsType
}

export type DomainInfoConfig = {
    name: string,
    fileInfra: string,
    handlers: string[]
}

export type ConfigInfoType = {
    http: string[],
    orm: string[],
    domains: DomainInfoConfig[]
}

class MainConfig
{
    private readonly mainConfig: ConfigType;
    private static instance: MainConfig = new MainConfig();

    private constructor()
    {
        const cleanEnv: any = validateEnv();

        process.env = { ...process.env, ...cleanEnv };

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

    public async getConfigInfo(): Promise<ConfigInfoType>
    {
        const path = resolve('config/info.json');
        const file = await readFile(path);
        return JSON.parse(file.toString());
    }
}

export default MainConfig;
