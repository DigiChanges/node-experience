import { ParsedQs } from 'qs';

import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';

import RoleSort from '../Criterias/RoleSort';
import RoleFilter from '../Criterias/RoleFilter';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

class RoleRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new RoleSort(query), new RoleFilter(query), new Pagination(query, url));
    }
}

export default RoleRequestCriteria;
