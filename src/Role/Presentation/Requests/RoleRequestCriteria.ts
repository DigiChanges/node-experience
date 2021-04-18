import * as express from 'express';
import {ICriteria} from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

import RoleSort from '../Criterias/RoleSort';
import RoleFilter from '../Criterias/RoleFilter';
import Pagination from '../../../App/Presentation/Shared/Pagination';

class RoleRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
        super(new RoleSort(request), new RoleFilter(request), new Pagination(request));
    }
}

export default RoleRequestCriteria;
