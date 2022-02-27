import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IRoleTransformer from '../Presentation/Transformers/IRoleTransformer';

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
