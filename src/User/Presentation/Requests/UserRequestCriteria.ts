import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import UserSort from '../Criterias/UserSort';
import UserFilter from '../Criterias/UserFilter';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';

class UserRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(data: Record<string, any>)
    {
        super(new UserSort(data.query), new UserFilter(data.query), new Pagination(data.query, data.url));
    }
}

export default UserRequestCriteria;
