import { ILocaleMessage } from '@digichanges/shared-experience';
import Locales from '../../../../Shared/Utils/Locales';
import { REPOSITORIES } from '../../../../Config/Injects';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import LogoutPayload from '../../Payloads/Auth/LogoutPayload';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';

class LogoutUseCase
{
    private repository: IAuthRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
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
