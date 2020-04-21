import container from "../../inversify.config";
import IRoleRepository from "../Contracts/IRoleRepository";

class RoleRepoFactory
{
    static create()
    {
        return container.get<IRoleRepository>("IRoleRepository");
    }
}

export default RoleRepoFactory;