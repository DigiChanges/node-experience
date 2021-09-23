import { ParsedQs } from 'qs';
import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from '../../../../App/Presentation/Requests/RequestCriteria';

import ItemFilter from '../../Criterias/ItemFilter';
import ItemSort from '../../Criterias/ItemSort';
import Pagination from '../../../../App/Presentation/Shared/Pagination';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new ItemSort(query), new ItemFilter(query), new Pagination(query, url));
    }
}

export default ItemRequestCriteria;
