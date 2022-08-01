import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';

import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(data: Record<string, any>)
    {
        super(new ItemSort(data.query), new ItemFilter(data.query), new Pagination(data.query, data.url));
    }
}

export default ItemRequestCriteria;
