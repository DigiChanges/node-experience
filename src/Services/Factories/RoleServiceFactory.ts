import container from "../../inversify.config";
import IRoleService from "../Contracts/IRoleService";
import {SERVICES} from "../../services";

class RoleServiceFactory
{
    static create()
    {
        return container.get<IRoleService>(SERVICES.IRoleService);
    }
}

export default RoleServiceFactory;