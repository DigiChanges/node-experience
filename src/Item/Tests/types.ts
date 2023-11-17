import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IItemTransformer from '../Presentation/Transformers/IItemTransformer';

interface IItemBody extends IBodyResponse
{
    data: IItemTransformer;
}

interface IListItemBody extends IBodyResponse
{
    data: IItemTransformer[];
}

export interface IItemResponse extends IFetchResponse
{
    body: IItemBody;
}

export interface IListItemsResponse extends IFetchResponse
{
    body: IListItemBody;
}
