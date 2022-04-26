import ChangeForgotPasswordPayload from '../Payloads/ChangeForgotPasswordPayload';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';

import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import Password from '../../../App/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/mainConfig';
import Locales from '../../../App/Presentation/Shared/Locales';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';
import AuthService from '../Services/AuthService';

class ChangeForgotPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private authService = new AuthService();

    async handle(payload: ChangeForgotPasswordPayload): Promise<ILocaleMessage>
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;
        const { password, confirmationToken } = payload;

        const decodeToken = this.authService.validateToken(confirmationToken);

        const user = await this.repository.getOneByEmail(decodeToken.email);
        user.passwordRequestedAt = null;

        user.password = await (new Password(password, minLength, maxLength)).ready();

        await this.repository.update(user);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.changeForgotPassword';

        return { message: locales.__(key), messageCode: key };
    }
}

export default ChangeForgotPasswordUseCase;
