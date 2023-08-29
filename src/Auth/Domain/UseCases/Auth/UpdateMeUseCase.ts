import IUserDomain from '../../Entities/IUserDomain';
import UpdateMePayload from '../../Payloads/Auth/UpdateMePayload';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import UpdateMeSchemaValidation from '../../../Presentation/Validations/Auth/UpdateMeSchemaValidation';

class UpdateMeUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: UpdateMePayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(UpdateMeSchemaValidation, payload);

        const { authUser } = payload;

        const data = {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            birthdate: payload.birthdate,
            gender: payload.gender,
            phone: payload.phone,
            country: payload.country,
            emailVerified: undefined
        };

        authUser.updateRep(data);
        authUser.enable = payload.enable;

        return await this.repository.update(authUser);
    }
}

export default UpdateMeUseCase;
