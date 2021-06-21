import * as express from 'express';
import {ICriteria} from '@digichanges/shared-experience';

import UserSort from '../../Criterias/UserSort';
import UserFilter from '../../Criterias/UserFilter';
import Pagination from '../../../../App/Presentation/Shared/Pagination';
import RequestCriteria from '../../../../App/Presentation/Requests/RequestCriteria';

class UserRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
        super(new UserSort(request), new UserFilter(request), new Pagination(request));
    }
}

export default UserRequestCriteria;
