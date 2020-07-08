import container from "../../inversify.config";
import IUserRepository from "../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../repositories";

class UserRepoFactory
{
    static create()
    {
        return container.get<IUserRepository>(REPOSITORIES.IUserRepository);
    }
}

export default UserRepoFactory;