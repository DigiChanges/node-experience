import { lazyInject } from "../../../inversify.config";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";

class GetUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetUserUseCase;
