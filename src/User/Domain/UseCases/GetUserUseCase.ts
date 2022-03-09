import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../Entities/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';

class GetUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        return this.repository.getOne(payload.id);
    }
}

export default GetUserUseCase;
