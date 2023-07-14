import { IPaginator, Transformer } from '@digichanges/shared-experience';

class PaginatorTransformer extends Transformer
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
