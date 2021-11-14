import { ParsedQs } from 'qs';
import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

import RoleSort from '../Criterias/RoleSort';
import RoleFilter from '../Criterias/RoleFilter';
import Pagination from '../../../App/Presentation/Shared/Pagination';

class RoleRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new RoleSort(query), new RoleFilter(query), new Pagination(query, url));
    }
}

export default RoleRequestCriteria;
