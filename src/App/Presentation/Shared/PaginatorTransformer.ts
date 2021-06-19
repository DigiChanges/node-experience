import {IPaginator, Transformer} from '@digichanges/shared-experience';
import {IPaginatorTransformer} from '../../../Shared/InterfaceAdapters/Tests/IPaginatorTransformer';

class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator): IPaginatorTransformer
    {
        return {
            total: paginator.getTotal(),
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
