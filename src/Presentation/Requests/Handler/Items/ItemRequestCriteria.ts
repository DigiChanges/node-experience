import * as express from 'express';
import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from "../Defaults/RequestCriteria";

import ItemFilter from '../../../Criterias/Item/ItemFilter';
import ItemSort from '../../../Criterias/Item/ItemSort';
import Pagination from '../../../Shared/Pagination';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
			super(new ItemSort(request), new ItemFilter(request), new Pagination(request))
    }
}

export default ItemRequestCriteria;
