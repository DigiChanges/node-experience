import Sort from '../../../Shared/Presentation/Requests/Sort';

class UserSort extends Sort
{
    static readonly EMAIL: string = 'email';
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): any
    {
        return [
            UserSort.EMAIL,
            UserSort.CREATED_AT
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [UserSort.CREATED_AT]: 'DESC' }
        ];
    }
}

export default UserSort;
