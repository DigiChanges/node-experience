import container from "../../inversify.config";
import IUserService from "../Contracts/IUserService";
import {SERVICES} from "../../services";

class UserServiceFactory
{
    static create()
    {
        return container.get<IUserService>(SERVICES.IUserService);
    }
}

export default UserServiceFactory;