import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import UpdateMePayload from '../Payloads/UpdateMePayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';

class UpdateMeUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: UpdateMePayload): Promise<IUserDomain>
    {
        const authUser = payload.authUser;
        authUser.updateRep(payload);

        return await this.repository.update(authUser);
    }
}

export default UpdateMeUseCase;
