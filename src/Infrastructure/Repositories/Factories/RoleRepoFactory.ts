import container from "../../../inversify.config";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";

class RoleRepoFactory
{
    static create()
    {
        return container.get<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }
}

export default RoleRepoFactory;