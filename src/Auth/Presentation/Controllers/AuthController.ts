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

        const use_case = new LoginUseCase();
        return await use_case.handle(request);
    }

    public async keep_alive(request: KeepAlivePayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new KeepAliveUseCase();
        return await use_case.handle(request);
    }

    public async forgot_password(request: ForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new ForgotPasswordUseCase();
        return await use_case.handle(request);
    }

    public async change_forgot_password(request: ChangeForgotPasswordPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new ChangeForgotPasswordUseCase();
        return await use_case.handle(request);
    }

    public permissions(): IGroupPermission[]
    {
        const use_case = new PermissionUseCase();
        return use_case.handle();
    }

    public sync_roles_permissions()
    {
        const use_case = new SyncRolesPermissionUseCase();
        return use_case.handle();
    }
}

export default AuthController;
