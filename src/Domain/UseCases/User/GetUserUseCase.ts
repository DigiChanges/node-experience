import { lazyInject } from "../../../inversify.config";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";

class GetUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUser>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }
}

export default GetUserUseCase;
