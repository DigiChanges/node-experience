
export enum FACTORIES  {
    BcryptEncryptionStrategy = 'BcryptEncryptionStrategy',
    Md5EncryptionStrategy = 'Md5EncryptionStrategy',

    EmailStrategy = 'EmailStrategy',
    WebPushStrategy = 'WebPushStrategy',

    AppKoa = 'AppKoa'
}

export enum REPOSITORIES  {
    IAuthRepository = 'IAuthRepository',
    IAuthzRepository = 'IAuthzRepository',
    IItemRepository = 'IItemRepository',
    IUserRepository = 'IUserRepository',
    IRoleRepository = 'IRoleRepository',
    IFileRepository = 'IFileRepository',
    IFileVersionRepository = 'IFileVersionRepository',
    INotificationRepository = 'INotificationRepository'
}

export enum SERVICES {
    AuthService = 'AuthService',
    KeycloakAuthService = 'KeycloakAuthService',
    AuthorizeService = 'AuthorizeService'
}
