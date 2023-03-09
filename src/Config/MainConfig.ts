import dotenv from 'dotenv';
dotenv.config(); // Need before get config
import { readFile } from 'node:fs/promises';
import { resolve } from 'path';
import Config from 'config';
import { TAlgorithm } from 'jwt-simple';
import { validateEnv } from './validateEnv';

type AuthConfig = {
    clientId: string
    clientSecret: string
    authorization: boolean
    host: string
};

type AppConfig = {
    default: string;
    path: string;
    setAppProxy: boolean;
    setCookieSecure: boolean,
    setCookieSameSite: boolean | 'None' | 'Lax' | 'Strict',
    serverPort: number,
}

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
    driver: string;
    ssl: boolean;
    sslValidate: boolean;
    sslCA: string | null;
    replicaSet: string | null;
};

type MikroORMConfig = {
    dbName: string,
    host: string;
    port: number;
    type: 'mysql' | 'mariadb' | 'postgresql' | 'sqlite',
    user: string;
    password: string;
};

export type DbConfigType = {
    TypeORM: TypeORMConfig,
    Mongoose: MongooseConfig,
    MikroORM: MikroORMConfig,
    default: string
}

export type CacheConfig = {
    host: string;
    port: number;
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

export type IHttpStatusCode =
{
    code: number;
    statusCode: string;
    status: string;
}

type ConfigType = {
    env: string,
    auth: AuthConfig;
    app: AppConfig,
    dbConfig: DbConfigType,
    cache: {
        redis: CacheConfig,
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
    validationSettings: ValidateSettingsType,
    apiWhitelist: ApiWhiteType[],
    statusCode: Record<string, IHttpStatusCode>
}

type DomainInfoConfig = {
    name: string,
    fileInfra: string,
    handlers: string[]
}

type ConfigInfoType = {
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
