import { Filter } from '../../../Main/Domain/Criteria';

class NotificationFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly KIND: string = 'kind';

    getFields(): any
    {
        return [
            NotificationFilter.NAME,
            NotificationFilter.KIND
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default NotificationFilter;
