import IBaseRepository from '../../../../Main/Infrastructure/Repositories/IBaseRepository';
import IUserDomain from '../../../Domain/Entities/IUserDomain';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
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
