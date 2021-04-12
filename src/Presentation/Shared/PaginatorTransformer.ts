import {IPaginator, Transformer} from '@digichanges/shared-experience';

class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator)
    {
        return {
            'total': paginator.getTotal(),
            'currentUrl': paginator.getCurrentUrl(),
            'nextUrl': paginator.getNextUrl()
        };
    }
}

export default PaginatorTransformer;
