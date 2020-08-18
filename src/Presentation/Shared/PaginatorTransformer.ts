import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import Transformer from "./Transformer";

class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator)
    {
        return {
            'total': paginator.getTotal(),
            'currentUrl': paginator.getCurrentUrl(),
            'nextUrl': paginator.getNextUrl(),
        };
    }
}

export default PaginatorTransformer;