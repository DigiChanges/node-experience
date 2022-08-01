import IBaseRepository from '../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Domain/Payloads/IPaginator';

interface IUserRepository extends IBaseRepository<IUserDomain>
{
    getOneByEmail(email: string): Promise<IUserDomain>;
    getOneByConfirmationToken(confirmationToken: string): Promise<IUserDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IUserRepository;
