import VerifyYourAccountPayload from '../../Payloads/Auth/VerifyYourAccountPayload';
import Locales from '../../../../Shared/Utils/Locales';
import { ILocaleMessage } from '@digichanges/shared-experience';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import AuthHelperService from '../../Services/AuthHelperService';
import { REPOSITORIES } from '../../../../Config/Injects';
import IAuthRepository from '../../../Infrastructure/Repositories/Auth/IAuthRepository';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import IUserDomain from '../../Entities/IUserDomain';
import SendEmailService from '../../../../Notification/Domain/Services/SendEmailService';
import TypeNotificationEnum from '../../../../Notification/Domain/Enum/TypeNotificationEnum';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import VerifyYourAccountSchemaValidation
    from '../../../Presentation/Validations/Auth/VerifyYourAccountSchemaValidation';

class VerifyYourAccountUseCase
{
    private authHelperService: AuthHelperService;
    private repository: IAuthRepository;
    private userRepository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IAuthRepository>(REPOSITORIES.IAuthRepository);
        this.userRepository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authHelperService = new AuthHelperService();
    }

    async handle(payload: VerifyYourAccountPayload): Promise<ILocaleMessage>
    {
        await ValidatorSchema.handle(VerifyYourAccountSchemaValidation, payload);

        const { confirmationToken } = payload;

        const { email } = this.authHelperService.validateToken(confirmationToken);

        const user: IUserDomain = await this.userRepository.getOneByEmail(email);

        await this.repository.verifyAccount({ id: user.getId() });

        void await SendEmailService.handle({
            type: TypeNotificationEnum.VERIFIED_ACCOUNT,
            to: user.email,
            name: 'Verified account',
            args: {
                userName: user.firstName
            },
            data: {
                EMAIL_USER: user.email
            },
            external: true,
            templatePathNameFile: 'auth/verifiedAccount.hbs'
        });

        const locales = Locales.getInstance().getLocales();
        const key = 'auth.domain.messages.verifiedAccount';

        return { message: locales.__(key), messageCode: key };
    }
}

export default VerifyYourAccountUseCase;
