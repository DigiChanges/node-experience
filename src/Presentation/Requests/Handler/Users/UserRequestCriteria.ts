import * as express from 'express';
import { ICriteria } from '@digichanges/shared-experience';

import UserSort from '../../../Criterias/User/UserSort';
import UserFilter from '../../../Criterias/User/UserFilter';
import Pagination from '../../../Shared/Pagination';
import RequestCriteria from "../Defaults/RequestCriteria";

class UserRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
    		super(new UserSort(request), new UserFilter(request), new Pagination(request))
    }
}

export default UserRequestCriteria;
