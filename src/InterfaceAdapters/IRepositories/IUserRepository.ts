import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository
{
    getOneByEmail(email: string): Promise<any>;
    getOneByConfirmationToken(confirmationToken: string): Promise<any>;
}

export default IUserRepository;