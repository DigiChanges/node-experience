
export enum FACTORIES  {
    BcryptEncryptionStrategy = 'BcryptEncryptionStrategy',
    Md5EncryptionStrategy = 'Md5EncryptionStrategy',

    EmailStrategy = 'EmailStrategy',
    WebPushStrategy = 'WebPushStrategy',

    AppExpress = 'AppExpress',
    AppKoa = 'AppKoa'
}

export enum REPOSITORIES  {
    IItemRepository = 'IItemRepository',
    IUserRepository = 'IUserRepository',
    IRoleRepository = 'IRoleRepository',
    IFileRepository = 'IFileRepository',
    IFileVersionRepository = 'IFileVersionRepository',
    ITokenRepository = 'ITokenRepository',
    INotificationRepository = 'INotificationRepository'
}

export enum SERVICES {
    AuthService = 'AuthService'
}

export enum TYPES  {
    IFormatResponder = 'IFormatResponder',
    Responder = 'Responder',
    IErrorHandler = 'IErrorHandler',
    IHandler = 'IHandler',
    IController = 'IHandler'
}
