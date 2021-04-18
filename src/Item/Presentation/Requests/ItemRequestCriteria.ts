import * as express from 'express';
import {ICriteria} from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../App/Presentation/Shared/Pagination';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
        super(new ItemSort(request), new ItemFilter(request), new Pagination(request));
    }
}

export default ItemRequestCriteria;
