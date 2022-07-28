import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import UpdateMePayload from '../Payloads/UpdateMePayload';
import { REPOSITORIES } from '../../../Config/Injects';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

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
        const authUser = payload.authUser;
        authUser.updateRep(payload);

        return await this.repository.update(authUser);
    }
}

export default UpdateMeUseCase;
