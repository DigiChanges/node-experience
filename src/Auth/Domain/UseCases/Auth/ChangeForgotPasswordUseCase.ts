import ChangeForgotPasswordPayload from '../../Payloads/Auth/ChangeForgotPasswordPayload';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';

import { REPOSITORIES } from '../../../../Config/Injects';
import Locales from '../../../../Shared/Utils/Locales';
import ILocaleMessage from '../../../../Shared/InterfaceAdapters/ILocaleMessage';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import AuthHelperService from '../../Services/AuthHelperService';
import ValidatorSchema from '../../../../Shared/Utils/ValidatorSchema';
import ChangeForgotPasswordSchemaValidation
    from '../../../Presentation/Validations/Auth/ChangeForgotPasswordSchemaValidation';

class ChangeForgotPasswordUseCase
{
    private repository: IUserRepository;
    private authHelperService: AuthHelperService;

    constructor()
    {
        const { container } = getRequestContext();
        this.authHelperService = new AuthHelperService();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ChangeForgotPasswordPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(ChangeForgotPasswordSchemaValidation, payload);

        const { password, confirmationToken } = payload;

        const decodeToken = this.authHelperService.validateToken(confirmationToken);
        const user = await this.repository.getOneByEmail(decodeToken.email);

        await this.repository.updatePassword(user.getId(), password);

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.changeForgotPassword';

        return { message: locales.__(key), messageCode: key };
    }
}

export default ChangeForgotPasswordUseCase;
