import ICriteria from '../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../Shared/Infrastructure/Orm/IPaginator';
import IRoleDomain from '../Domain/Entities/IRoleDomain';
import { responseIPaginator } from './DataMock';

const responseIRoleDomain = {
    createdAt: undefined, name: '', permissions: [], updatedAt: undefined
} as IRoleDomain;

class RoleMockRepository
{
    async list(criteria: ICriteria): Promise<IPaginator>
    {
        return new Promise<IPaginator>((resolve) => resolve(responseIPaginator));
    }
    async getAll(): Promise<IRoleDomain[]>
    {
        return new Promise<IRoleDomain[]>((resolve) => resolve([responseIRoleDomain]));
    }
    async delete(name: string): Promise<any>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }
    async update(element: IRoleDomain, id: string): Promise<IRoleDomain>
    {
        return new Promise<IRoleDomain>((resolve) => resolve(responseIRoleDomain));
    }
}

export default RoleMockRepository;
