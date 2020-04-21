import container from "../../inversify.config";
import IUserRepository from "../Contracts/IUserRepository";

class UserRepoFactory
{
    static create()
    {
        return container.get<IUserRepository>("IUserRepository");
    }
}

export default UserRepoFactory;