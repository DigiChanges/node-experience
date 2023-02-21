import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IProductTransformer from '../Presentation/Transformers/IProductTransformer';

interface IProductBody extends IBodyResponse
{
    data: IProductTransformer;
}

interface IListProductBody extends IBodyResponse
{
    data: IProductTransformer[];
}

export interface IProductResponse extends IFetchResponse
{
    body: IProductBody;
}

export interface IListProductsResponse extends IFetchResponse
{
    body: IListProductBody;
}
