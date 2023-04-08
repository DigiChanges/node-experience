import { DependencyContainer } from 'tsyringe';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import Locales from '../../../../Shared/Presentation/Shared/Locales';
import { REPOSITORIES } from '../../../../Config/Injects';
import ITokenDomain from '../../Entities/ITokenDomain';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import LogoutPayload from '../../Payloads/Auth/LogoutPayload';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';

class LogoutUseCase
{
    private repository: IAuthRepository;
    private readonly container: DependencyContainer;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
        this.container = container;
    }

    async handle(payload: LogoutPayload): Promise<ILocaleMessage>
    {
        await this.repository.logout(payload);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.logout';

        return { message: locales.__(key), messageCode: key };
    }
}

export default LogoutUseCase;
