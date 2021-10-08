import IBaseRepository from '../../App/InterfaceAdapters/IBaseRepository';
import IUserDomain from './IUserDomain';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IUserRepository extends IBaseRepository<IUserDomain>
{
    get_one_by_email(email: string): Promise<IUserDomain>;
    get_one_by_confirmation_token(confirmationToken: string): Promise<IUserDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IUserRepository;
