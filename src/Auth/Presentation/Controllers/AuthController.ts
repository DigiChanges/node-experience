import LoginUseCase from '../../Domain/UseCases/LoginUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/ChangeForgotPasswordUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/ForgotPasswordUseCase';
import KeepAliveUseCase from '../../Domain/UseCases/KeepAliveUseCase';
import PermissionUseCase from '../../Domain/UseCases/PermissionUseCase';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/SyncRolesPermissionUseCase';

import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import ChangeForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import IToken from '../../InterfaceAdapters/IToken';
import KeepAlivePayload from '../../InterfaceAdapters/Payloads/KeepAlivePayload';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IGroupPermission from '../../InterfaceAdapters/IGroupPermission';


class AuthController
{
    public async login(request: AuthPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const useCase = new LoginUseCase();
        return await useCase.handle(request);
    }

    public async keepAlive(request: KeepAlivePayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new KeepAliveUseCase();
        return await useCase.handle(request);
    }

    public async forgotPassword(request: ForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new ForgotPasswordUseCase();
        return await useCase.handle(request);
    }

    public async changeForgotPassword(request: ChangeForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new ChangeForgotPasswordUseCase();
        return await useCase.handle(request);
    }

    public permissions(): IGroupPermission[]
    {
        const useCase = new PermissionUseCase();
        return useCase.handle();
    }

    public syncRolesPermissions()
    {
        const useCase = new SyncRolesPermissionUseCase();
        return useCase.handle();
    }
}

export default AuthController;
