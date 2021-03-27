import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import IUserDomain from '../../../InterfaceAdapters/IDomain/IUserDomain';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

class GetUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetUserUseCase;
