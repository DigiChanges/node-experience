import { PaginatorTransformerResponse } from './PaginatorTransformerResponse';
import { Transformer } from '../../Main/Presentation/Transformers';
import { IPaginator } from '../../Main/Domain/Criteria/IPaginator';

class PaginatorTransformer extends Transformer<IPaginator, PaginatorTransformerResponse>
{
    public async transform(paginator: IPaginator)
    {
        return {
            total: paginator.getTotal(),
            offset: paginator.getOffset(),
            limit: paginator.getLimit(),
            perPage: paginator.getPerPage(),
            currentPage: paginator.getCurrentPage(),
            lastPage: paginator.getLasPage(),
            from: paginator.getFrom(),
            to: paginator.getTo(),
            path: paginator.getPath(),
            firstUrl: paginator.getFirstUrl(),
            lastUrl: paginator.getLastUrl(),
            nextUrl: paginator.getNextUrl(),
            prevUrl: paginator.getPrevUrl(),
            currentUrl: paginator.getCurrentUrl()
        };
    }
}

export default PaginatorTransformer;
