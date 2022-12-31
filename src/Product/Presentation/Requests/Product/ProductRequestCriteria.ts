import { ParsedQs } from 'qs';

import RequestCriteria from '../../../../Shared/Presentation/Requests/RequestCriteria';

import ProductSort from '../../Criterias/ProductSort';
import ProductFilter from '../../Criterias/ProductFilter';
import Pagination from '../../../../Shared/Presentation/Shared/Pagination';
import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';

class ProductRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new ProductSort(query), new ProductFilter(query), new Pagination(query, url));
    }
}

export default ProductRequestCriteria;
