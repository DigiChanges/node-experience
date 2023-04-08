import LoginUseCase from '../../Domain/UseCases/Auth/LoginUseCase';
import ChangeForgotPasswordUseCase from '../../Domain/UseCases/Auth/ChangeForgotPasswordUseCase';
import ForgotPasswordUseCase from '../../Domain/UseCases/Auth/ForgotPasswordUseCase';
import RefreshTokenUseCase from '../../Domain/UseCases/Auth/RefreshTokenUseCase';
import PermissionUseCase from '../../Domain/UseCases/Auth/PermissionUseCase';
import RegisterUseCase from '../../Domain/UseCases/Auth/RegisterUseCase';
import UpdateMeUseCase from '../../Domain/UseCases/Auth/UpdateMeUseCase';
import LogoutUseCase from '../../Domain/UseCases/Auth/LogoutUseCase';
import VerifyYourAccountUseCase from '../../Domain/UseCases/Auth/VerifyYourAccountUseCase';

import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ChangeForgotPasswordPayload from '../../Domain/Payloads/Auth/ChangeForgotPasswordPayload';
import AuthPayload from '../../Domain/Payloads/Auth/AuthPayload';
import RefreshTokenPayload from '../../Domain/Payloads/Auth/RefreshTokenPayload';
import ForgotPasswordPayload from '../../Domain/Payloads/Auth/ForgotPasswordPayload';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import RegisterPayload from '../../Domain/Payloads/Auth/RegisterPayload';
import VerifyYourAccountPayload from '../../Domain/Payloads/Auth/VerifyYourAccountPayload';
import ILocaleMessage from '../../../Shared/InterfaceAdapters/ILocaleMessage';
import IGroupPermission from '../../../Config/IGroupPermission';
import UpdateMePayload from '../../Domain/Payloads/Auth/UpdateMePayload';
import AuthSchemaValidation from '../Validations/Auth/AuthSchemaValidation';
import RegisterSchemaValidation from '../Validations/Auth/RegisterSchemaValidation';
import UpdateMeSchemaValidation from '../Validations/Auth/UpdateMeSchemaValidation';
import RefreshTokenSchemaValidation from '../Validations/Auth/RefreshTokenSchemaValidation';
import ForgotPasswordSchemaValidation from '../Validations/Auth/ForgotPasswordSchemaValidation';
import ChangeForgotPasswordSchemaValidation from '../Validations/Auth/ChangeForgotPasswordSchemaValidation';
import VerifyYourAccountSchemaValidation from '../Validations/Auth/VerifyYourAccountSchemaValidation';
import ILoginResponse from '../../Domain/Models/ILoginResponse';
import LogoutPayload from '../../Domain/Payloads/Auth/LogoutPayload';

class AuthController
{
    public async login(payload: AuthPayload): Promise<ILoginResponse>
    {
        await ValidatorSchema.handle(AuthSchemaValidation, payload);

        const useCase = new LoginUseCase();
        return await useCase.handle(payload);
    }

    public async register(payload: RegisterPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(RegisterSchemaValidation, payload);

        const useCase = new RegisterUseCase();
        return await useCase.handle(payload);
    }

    public async updateMe(payload: UpdateMePayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(UpdateMeSchemaValidation, payload);

        const useCase = new UpdateMeUseCase();
        return await useCase.handle(payload);
    }

    public async logout(payload: LogoutPayload): Promise<ILocaleMessage>
    {
        const useCase = new LogoutUseCase();
        return await useCase.handle(payload);
    }

    public async refreshToken(payload: RefreshTokenPayload): Promise<any>
    {
        await ValidatorSchema.handle(RefreshTokenSchemaValidation, payload);

        const useCase = new RefreshTokenUseCase();
        return await useCase.handle(payload);
    }

    public async forgotPassword(payload: ForgotPasswordPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(ForgotPasswordSchemaValidation, payload);

        const useCase = new ForgotPasswordUseCase();
        return await useCase.handle(payload);
    }

    public async changeForgotPassword(payload: ChangeForgotPasswordPayload)
    {
        await ValidatorSchema.handle(ChangeForgotPasswordSchemaValidation, payload);

        const useCase = new ChangeForgotPasswordUseCase();
        return await useCase.handle(payload);
    }

    public async verifyYourAccount(payload: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(VerifyYourAccountSchemaValidation, payload);

        const useCase = new VerifyYourAccountUseCase();
        return await useCase.handle(payload);
    }

    public permissions(): IGroupPermission[]
    {
        const useCase = new PermissionUseCase();
        return useCase.handle();
    }

    public async syncRolesPermissions(): Promise<void>
    {
        // TODO: Add sync use case on keycloak
    }
}

export default AuthController;
