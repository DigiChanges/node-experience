import { DependencyContainer } from 'tsyringe';
import ChangeForgotPasswordPayload from '../Payloads/ChangeForgotPasswordPayload';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';

import { REPOSITORIES, SERVICES } from '../../../Config/Injects';
import Password from '../../../App/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/MainConfig';
import Locales from '../../../App/Presentation/Shared/Locales';
import ILocaleMessage from '../../../App/InterfaceAdapters/ILocaleMessage';
import AuthService from '../Services/AuthService';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class ChangeForgotPasswordUseCase
{
    private repository: IUserRepository;
    private authService: AuthService;

    constructor()
    {
        const { container } = getRequestContext();
        this.authService = container.resolve(SERVICES.AuthService);
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ChangeForgotPasswordPayload): Promise<ILocaleMessage>
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;
        const { password, confirmationToken } = payload;

        const decodeToken = this.authService.validateToken(confirmationToken);

        const user = await this.repository.getOneByEmail(decodeToken.email);
        user.confirmationToken = null;
        user.passwordRequestedAt = null;

        user.password = await (new Password(password, minLength, maxLength)).ready();

        await this.repository.update(user);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.changeForgotPassword';

        return { message: locales.__(key), messageCode: key };
    }
}

export default ChangeForgotPasswordUseCase;
