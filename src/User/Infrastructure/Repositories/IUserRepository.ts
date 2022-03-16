import IBaseRepository from '../../../App/InterfaceAdapters/IBaseRepository';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IUserRepository extends IBaseRepository<IUserDomain>
{
    getOneByEmail(email: string): Promise<IUserDomain>;
    getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IUserRepository;
