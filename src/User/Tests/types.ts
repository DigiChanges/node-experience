import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IUserTransformer from '../Presentation/Transformers/IUserTransformer';

interface IUserBody extends IBodyResponse
{
    data: IUserTransformer;
}

interface IListUserBody extends IBodyResponse
{
    data: IUserTransformer[];
}

export interface IUserResponse extends IFetchResponse
{
    body: IUserBody;
}

export interface IListUsersResponse extends IFetchResponse
{
    body: IListUserBody;
}
