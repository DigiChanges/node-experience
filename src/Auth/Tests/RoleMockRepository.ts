import ICriteria from '../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../Shared/Infrastructure/Orm/IPaginator';
import IRoleDomain from '../Domain/Entities/IRoleDomain';

const responseIPaginator: IPaginator =
{
    getCurrentPage(): number
    {
        return 0;
    }, getCurrentUrl(): string
    {
        return '';
    }, getExist(): boolean
    {
        return false;
    }, getFirstUrl(): string
    {
        return '';
    }, getFrom(): number
    {
        return 0;
    }, getLasPage(): number
    {
        return 0;
    }, getLastUrl(): string
    {
        return '';
    }, getLimit(): number
    {
        return 0;
    }, getMetadata(): Record<string, unknown>
    {
        return undefined;
    }, getNextUrl(): string | null
    {
        return undefined;
    }, getOffset(): number
    {
        return 0;
    }, getPath(): string
    {
        return '';
    }, getPerPage(): number
    {
        return 0;
    }, getPrevUrl(): string | null
    {
        return undefined;
    }, getTo(): number
    {
        return 0;
    }, getTotal(): number
    {
        return 0;
    }, paginate(): Promise<unknown>
    {
        return Promise.resolve(undefined);
    }
};

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
