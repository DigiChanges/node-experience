import IBaseRepository from "./IBaseRepository";
import User from "../../Entities/User";

interface IUserRepository extends IBaseRepository
{
    getOneByEmail(email: string): Promise<User>;
    getOneByConfirmationToken(confirmationToken: string): Promise<User>;
}

export default IUserRepository;