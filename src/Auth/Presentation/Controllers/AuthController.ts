import LoginUseCase from '../../Domain/UseCases/LoginUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/ChangeForgotPasswordUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/ForgotPasswordUseCase';
import KeepAliveUseCase from '../../Domain/UseCases/KeepAliveUseCase';
import PermissionUseCase from '../../Domain/UseCases/PermissionUseCase';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/SyncRolesPermissionUseCase';

import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import ChangeForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeForgotPasswordPayload';
import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import IToken from '../../InterfaceAdapters/IToken';
import KeepAlivePayload from '../../InterfaceAdapters/Payloads/KeepAlivePayload';
import ForgotPasswordPayload from '../../InterfaceAdapters/Payloads/ForgotPasswordPayload';
import IGroupPermission from '../../../Shared/InterfaceAdapters/IGroupPermission';


class AuthController
{
    public async login(request: AuthPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const loginUseCase = new LoginUseCase();
        return await loginUseCase.handle(request);
    }

    public async keepAlive(request: KeepAlivePayload)
    {
        await ValidatorRequest.handle(request);

        const keepAliveUseCase = new KeepAliveUseCase();
        return await keepAliveUseCase.handle(request);
    }

    public async forgotPassword(request: ForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const forgotPasswordUseCase = new ForgotPasswordUseCase();
        return await forgotPasswordUseCase.handle(request);
    }

    public async changeForgotPassword(request: ChangeForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();
        return await changeForgotPasswordUseCase.handle(request);
    }

    public permissions(): IGroupPermission[]
    {
        const permissionUseCase = new PermissionUseCase();
        return permissionUseCase.handle();
    }

    public syncRolesPermissions()
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        return syncRolesPermissionUseCase.handle();
    }
}

export default AuthController;
