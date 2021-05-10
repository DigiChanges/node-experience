import {IBodyResponse} from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import {IFetchResponse} from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IRoleDomain from '../InterfaceAdapters/IRoleDomain';

interface IRoleTransformer extends IRoleDomain // TODO: make interface IRoleTransformer and import here and use to RoleTransformer return type
{
    id: string;
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