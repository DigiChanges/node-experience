import IBaseRepository from "./IBaseRepository";
import IUserDomain from "../IDomain/IUserDomain";

interface IUserRepository extends IBaseRepository
{
    getOneByEmail(email: string): Promise<IUserDomain>;
    getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>;
}

export default IUserRepository;