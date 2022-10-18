import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IGroupPermission from '../../Config/IGroupPermission';
import IRoleTransformer from '../../Auth/Presentation/Transformers/IRoleTransformer';
import IUserTransformer from '../../Auth/Presentation/Transformers/IUserTransformer';

interface IPermissionsBody extends IBodyResponse
{
    data: IGroupPermission[];
}

export interface IPermissionsResponse extends IFetchResponse
{
    body: IPermissionsBody;
}

interface IRoleBody extends IBodyResponse
{
    data: IRoleTransformer;
}

interface IListRoleBody extends IBodyResponse
{
    data: IRoleTransformer[];
}

export interface IRoleResponse extends IFetchResponse
{
    body: IRoleBody;
}

export interface IListRolesResponse extends IFetchResponse
{
    body: IListRoleBody;
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
