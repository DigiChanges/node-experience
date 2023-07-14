import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IRoleDomain from '../Domain/Entities/IRoleDomain';
import { payloadRole, responseIPaginator } from './DataMock';
import IRoleRepository from '../Infrastructure/Repositories/Role/IRoleRepository';
import Role from '../Domain/Entities/Role';

class RoleMockRepository implements IRoleRepository
{
    async list(criteria: ICriteria): Promise<IPaginator>
    {
        return new Promise<IPaginator>((resolve) => resolve(responseIPaginator));
    }

    async getAll(): Promise<IRoleDomain[]>
    {
        const role = new Role(payloadRole);
        return new Promise<IRoleDomain[]>((resolve) => resolve([role]));
    }

    async delete(name: string): Promise<any>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }

    async update(element: IRoleDomain, id: string): Promise<IRoleDomain>
    {
        const role = new Role(payloadRole);
        return new Promise<IRoleDomain>((resolve) => resolve(role));
    }

    getOne(id: string): Promise<IRoleDomain>
    {
        return Promise.resolve(undefined);
    }

    save(element: IRoleDomain): Promise<IRoleDomain>
    {
        return Promise.resolve(undefined);
    }
}

export default RoleMockRepository;
