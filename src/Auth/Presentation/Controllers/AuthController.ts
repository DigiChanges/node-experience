import LoginUseCase from '../../Domain/UseCases/Auth/LoginUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/Auth/ForgotPasswordUseCase';
import RefreshTokenUseCase from '../../Domain/UseCases/Auth/RefreshTokenUseCase';
import PermissionUseCase from '../../Domain/UseCases/Auth/PermissionUseCase';
import SyncRolesPermissionUseCase from '../../Domain/UseCases/Auth/SyncRolesPermissionUseCase';
import RegisterUseCase from '../../Domain/UseCases/Auth/RegisterUseCase';
import UpdateMeUseCase from '../../Domain/UseCases/Auth/UpdateMeUseCase';
import LogoutUseCase from '../../Domain/UseCases/Auth/LogoutUseCase';
import VerifyYourAccountUseCase from '../../Domain/UseCases/Auth/VerifyYourAccountUseCase';

import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';
import ChangeForgotPasswordPayload from '../../Domain/Payloads/Auth/ChangeForgotPasswordPayload';
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import RefreshTokenPayload from '../../Domain/Payloads/Auth/RefreshTokenPayload';
import ForgotPasswordPayload from '../../Domain/Payloads/Auth/ForgotPasswordPayload';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import RegisterPayload from '../../Domain/Payloads/Auth/RegisterPayload';
import VerifyYourAccountPayload from '../../Domain/Payloads/Auth/VerifyYourAccountPayload';
import IToken from '../../Domain/Models/IToken';
import ILocaleMessage from '../../../Shared/InterfaceAdapters/ILocaleMessage';
import IGroupPermission from '../../../Config/IGroupPermission';
import UpdateMePayload from '../../Domain/Payloads/Auth/UpdateMePayload';

class AuthController
{
    public async login(request: AuthPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const useCase = new LoginUseCase();
        return await useCase.handle(request);
    }

    public async register(request: RegisterPayload): Promise<ILocaleMessage>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RegisterUseCase();
        return await useCase.handle(request);
    }

    public async updateMe(request: UpdateMePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateMeUseCase();
        return await useCase.handle(request);
    }

    public async logout(request: RefreshTokenPayload): Promise<ILocaleMessage>
    {
        const useCase = new LogoutUseCase();
        return await useCase.handle(request);
    }

    public async refreshToken(request: RefreshTokenPayload): Promise<IToken>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RefreshTokenUseCase();
        return await useCase.handle(request);
    }

    public async forgotPassword(request: ForgotPasswordPayload): Promise<ILocaleMessage>
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

    public async verifyYourAccount(request: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        await ValidatorRequest.handle(request);

        const useCase = new VerifyYourAccountUseCase();
        return await useCase.handle(request);
    }

    public permissions(): IGroupPermission[]
    {
        const useCase = new PermissionUseCase();
        return useCase.handle();
    }

    public syncRolesPermissions(): Promise<string[]>
    {
        const useCase = new SyncRolesPermissionUseCase();
        return useCase.handle();
    }
}

export default AuthController;
