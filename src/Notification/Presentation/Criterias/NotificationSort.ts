import { Sort } from '@digichanges/shared-experience';

class NotificationSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly KIND: string = 'kind';

    getFields(): string[]
    {
        return [
            NotificationSort.NAME,
            NotificationSort.KIND
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [NotificationSort.NAME]: 'asc' }
        ];
    }
}

export default NotificationSort;
