import dayjs from 'dayjs';
import { IPaginator } from '../../Main/Domain/Criteria/IPaginator';

export const payloadUser = {
    birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
    country: 'AR',
    createdAt: 1663779723,
    email: 'jhon@doe.com',
    emailVerified: false,
    enable: false,
    firstName: 'Jhon',
    gender: 'M',
    lastName: 'Doe',
    phone: '2234487968',
    updatedAt: 1663779723
};

export const payloadRole = {
    createdAt: 1663779723,
    name: 'Admin',
    permissions: [],
    updatedAt: 1663779723
};

export const responseIPaginator: IPaginator = {
    getCurrentPage(): number
    {
        return 0;
    },
    getCurrentUrl(): string
    {
        return '';
    },
    getExist(): boolean
    {
        return false;
    },
    getFirstUrl(): string
    {
        return '';
    },
    getFrom(): number
    {
        return 0;
    },
    getLasPage(): number
    {
        return 0;
    },
    getLastUrl(): string
    {
        return '';
    },
    getLimit(): number
    {
        return 0;
    },
    getMetadata(): Record<string, unknown>
    {
        return undefined;
    },
    getNextUrl(): string | null
    {
        return undefined;
    },
    getOffset(): number
    {
        return 0;
    },
    getPath(): string
    {
        return '';
    },
    getPerPage(): number
    {
        return 0;
    },
    getPrevUrl(): string | null
    {
        return undefined;
    },
    getTo(): number
    {
        return 0;
    },
    getTotal(): number
    {
        return 0;
    },
    paginate<T>(): Promise<T>
    {
        return Promise.resolve(undefined);
    }
};
