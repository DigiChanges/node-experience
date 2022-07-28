import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../App/Presentation/Shared/Pagination';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(data: Record<string, any>)
    {
        super(new ItemSort(data.query), new ItemFilter(data.query), new Pagination(data.query, data.url));
    }
}

export default ItemRequestCriteria;
