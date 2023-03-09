
export enum FACTORIES  {
    BcryptEncryptionStrategy = 'BcryptEncryptionStrategy',
    Md5EncryptionStrategy = 'Md5EncryptionStrategy',

    EmailStrategy = 'EmailStrategy',
    WebPushStrategy = 'WebPushStrategy',

    AppKoa = 'AppKoa'
}

export enum REPOSITORIES  {
    IAuthRepository = 'IAuthRepository',
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
