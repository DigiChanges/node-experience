import {IBaseRepository} from '@digichanges/shared-experience';
import IUserDomain from '../IDomain/IUserDomain';

interface IUserRepository extends IBaseRepository<IUserDomain>
{
    getOneByEmail(email: string): Promise<IUserDomain>;
    getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>;
}

export default IUserRepository;
