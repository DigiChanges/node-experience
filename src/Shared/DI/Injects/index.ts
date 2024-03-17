
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
    INotificationRepository = 'INotificationRepository',

    IFileRepository = 'IFileRepository',
    IFileVersionRepository = 'IFileVersionRepository',

    ICacheRepository = 'ICacheRepository',

    ICacheDataAccess = 'ICacheDataAccess'
}

export enum SERVICES {
    AuthorizeService = 'AuthorizeService',
}

export enum FACTORIES {
    IDatabaseFactory = 'IDatabaseFactory'
}
