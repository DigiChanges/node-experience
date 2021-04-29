import {IBodyResponse} from '../../App/InterfaceAdapters/Tests/IBodyResponse';
import {IFetchResponse} from '../../App/InterfaceAdapters/Tests/IFetchResponse';
import IItemDomain from '../InterfaceAdapters/IItemDomain';

interface IItemTransformer extends IItemDomain // TODO: make interface IItemTransformer and import here and use to ItemTransformer return type
{
    id: string;
}

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