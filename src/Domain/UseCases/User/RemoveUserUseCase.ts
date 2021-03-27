import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class RemoveUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveUserUseCase;
