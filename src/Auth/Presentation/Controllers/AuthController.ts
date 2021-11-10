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
import LogoutUseCase from '../../Domain/UseCases/LogoutUseCase';
import ITokenDecode from '../../../Shared/InterfaceAdapters/ITokenDecode';
import UserSavePayload from '../../../User/InterfaceAdapters/Payloads/UserSavePayload';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import SaveUserUseCase from '../../../User/Domain/UseCases/SaveUserUseCase';
import RegisterPayload from '../../InterfaceAdapters/Payloads/RegisterPayload';
import RegisterUseCase from '../../Domain/UseCases/RegisterUseCase';
import UpdateMeUseCase from '../../Domain/UseCases/UpdateMeUseCase';
import UserRepPayload from '../../../User/InterfaceAdapters/Payloads/UserRepPayload';

class AuthController
{
    public async login(request: AuthPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const useCase = new LoginUseCase();
        return await useCase.handle(request);
    }

    public async register(request: RegisterPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RegisterUseCase();
        return await useCase.handle(request);
    }

    public async updateMe(request: UserRepPayload, authUser: IUserDomain): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateMeUseCase();
        return await useCase.handle(request, authUser);
    }

    public async logout(tokenDecode:ITokenDecode): Promise<Record<string, any>>
    {
        const useCase = new LogoutUseCase();
        return await useCase.handle(tokenDecode);
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

    public syncRolesPermissions(): string[]
    {
        const useCase = new SyncRolesPermissionUseCase();
        return useCase.handle();
    }
}

export default AuthController;
