import {IBodyResponse} from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import {IFetchResponse} from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IUserDomain from '../InterfaceAdapters/IUserDomain';

interface IUserTransformer extends IUserDomain // TODO: make interface IUserTransformer and import here and use to UserTransformer return type
{
    id: string;
}

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