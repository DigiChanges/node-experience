import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
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
