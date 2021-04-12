import * as express from 'express';
import {ICriteria} from '@digichanges/shared-experience';

import RequestCriteria from '../Defaults/RequestCriteria';

import RoleSort from '../../../Criterias/Role/RoleSort';
import RoleFilter from '../../../Criterias/Role/RoleFilter';
import Pagination from '../../../Shared/Pagination';

class RoleRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
        super(new RoleSort(request), new RoleFilter(request), new Pagination(request));
    }
}

export default RoleRequestCriteria;
