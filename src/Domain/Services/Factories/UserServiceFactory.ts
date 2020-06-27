import container from "../../../inversify.config";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import {SERVICES} from "../../../services";

class UserServiceFactory
{
    static create()
    {
        return container.get<IUserService>(SERVICES.IUserService);
    }
}

export default UserServiceFactory;