import {ICriteria} from '@digichanges/shared-experience';

import RequestCriteria from '../../../../App/Presentation/Requests/RequestCriteria';

import ItemFilter from '../../Criterias/ItemFilter';
import ItemSort from '../../Criterias/ItemSort';
import Pagination from '../../../../App/Presentation/Shared/Pagination';
import IReqDTO from '../../../../Shared/InterfaceAdapters/IReqDTO';

class ItemRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor({query, url}: IReqDTO)
    {
        super(new ItemSort(query), new ItemFilter(query), new Pagination(query, url));
    }
}

export default ItemRequestCriteria;
