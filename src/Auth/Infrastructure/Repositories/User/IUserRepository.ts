import IBaseRepository from '../../../../Shared/Infrastructure/Repositories/IBaseRepository';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../../Shared/Infrastructure/Orm/IPaginator';
import UserAssignRolePayload from '../../../Domain/Payloads/User/UserAssignRolePayload';

interface IUserRepository extends Omit<IBaseRepository<IUserDomain>, 'getInBy' | 'getBy' | 'getOneBy' | 'save'>
{
    save(element: IUserDomain, password: string): Promise<IUserDomain>;
    getOneByEmail(email: string): Promise<IUserDomain>;
    updatePassword(id: string, password: string): Promise<unknown>;
    list(criteria: ICriteria): Promise<IPaginator>;
    active(element: IUserDomain): Promise<unknown>;
    assignRoles(payload: UserAssignRolePayload): Promise<void>;
}

export default IUserRepository;
