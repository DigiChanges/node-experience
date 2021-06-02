import IBaseRepository from '../../App/InterfaceAcapters/IBaseRepository';
import IUserDomain from './IUserDomain';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

interface IUserRepository extends IBaseRepository<IUserDomain>
{
    getOneByEmail(email: string): Promise<IUserDomain>;
    getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IUserRepository;
