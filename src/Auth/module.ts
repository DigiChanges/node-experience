import { InjectorModule } from '@deepkit/injector';

import { MainConfig } from '../Config/MainConfig';
import PermissionUseCase from './Domain/UseCases/PermissionUseCase';
import SyncPermissionsUseCase from './Domain/UseCases/SyncPermissionsUseCase';
import AuthSupabaseRepository from './Infrastructure/Repositories/AuthSupabaseRepository';
import IAuthRepository from './Domain/Repositories/IAuthRepository';
import AuthMockRepository from './Tests/AuthMockRepository';
import IAuthorizeService from './Domain/Services/IAuthorizeService';
import AuthorizeSupabaseService from './Domain/Services/AuthorizeSupabaseService';

export const authModule = new InjectorModule([
    // UseCases
    { provide: 'PermissionUseCase', useClass: PermissionUseCase },
    { provide: 'SyncPermissionsUseCase', useClass: SyncPermissionsUseCase },

    // Repositories
    { provide: IAuthRepository, useFactory: () =>
    {
        const config = MainConfig.getEnv();

        if (config.isTest)
        {
            return new AuthMockRepository();
        }

        return new AuthSupabaseRepository();
    } },

    // Services
    { provide: IAuthorizeService, useClass: AuthorizeSupabaseService }
]).forRoot();
