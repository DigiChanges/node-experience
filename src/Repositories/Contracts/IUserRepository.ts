import IBaseRepository from "./IBaseRepository";

interface IUserRepository extends IBaseRepository
{
    getOneByEmail(email: string): any;
}

export default IUserRepository;