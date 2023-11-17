
export enum FACTORIES  {
    BcryptEncryptionStrategy = 'BcryptEncryptionStrategy',
    Md5EncryptionStrategy = 'Md5EncryptionStrategy',

    EmailStrategy = 'EmailStrategy',
    WebPushStrategy = 'WebPushStrategy',

    AppFastify = 'AppFastify'
}

export enum REPOSITORIES  {
    IAuthRepository = 'IAuthRepository',
    IItemRepository = 'IItemRepository',
    INotificationRepository = 'INotificationRepository'
}

export enum SERVICES {
    AuthorizeService = 'AuthorizeService'
}
