import { ParsedQs } from 'qs';
import { ICriteria } from '@digichanges/shared-experience';

import UserSort from '../Criterias/UserSort';
import UserFilter from '../Criterias/UserFilter';
import Pagination from '../../../App/Presentation/Shared/Pagination';
import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

class UserRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new UserSort(query), new UserFilter(query), new Pagination(query, url));
    }
}

export default UserRequestCriteria;
