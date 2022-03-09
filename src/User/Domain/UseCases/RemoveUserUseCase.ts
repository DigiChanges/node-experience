import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../Entities/IUserDomain';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';

class RemoveUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveUserUseCase;
