import IUserDomain from '../Domain/Entities/IUserDomain';
import ICriteria from '../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../Shared/Infrastructure/Orm/IPaginator';
import UserAssignRolePayload from '../Domain/Payloads/User/UserAssignRolePayload';

const reponseIUserDomain: IUserDomain = {
    birthdate: '',
    country: '',
    createdAt: undefined,
    email: '',
    emailVerified: false,
    enable: false,
    firstName: '',
    genre: '',
    lastName: '',
    phone: '',
    updatedAt: undefined
} as IUserDomain;

const responseIPaginator: IPaginator = {
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

class UserMockRepository
{
    async save(element: IUserDomain, password: string): Promise<IUserDomain>
    {
        return new Promise<IUserDomain>((resolve) => resolve(reponseIUserDomain));
    }

    async getOneByEmail(email: string): Promise<IUserDomain>
    {
        return new Promise<IUserDomain>((resolve) => resolve(reponseIUserDomain));
    }

    async updatePassword(id: string, password: string): Promise<unknown>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        return new Promise<IPaginator>((resolve) => resolve(responseIPaginator));
    }

    async active(element: IUserDomain): Promise<unknown>
    {
        return new Promise<unknown>((resolve) => resolve({}));
    }

    async assignRoles(payload: UserAssignRolePayload): Promise<void>
    {
        return new Promise<void>((resolve) => resolve());
    }
}

export default UserMockRepository;
