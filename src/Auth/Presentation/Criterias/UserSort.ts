import { Sort } from '@digichanges/shared-experience';

class UserSort extends Sort
{
    static readonly EMAIL: string = 'email';
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): string[]
    {
        return [
            UserSort.EMAIL,
            UserSort.CREATED_AT
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [UserSort.CREATED_AT]: 'desc' }
        ];
    }
}

export default UserSort;
