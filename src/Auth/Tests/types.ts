import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import IGroupPermission from '../../Config/IGroupPermission';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';

interface IPermissionsBody extends IBodyResponse
{
    data: IGroupPermission[];
}

export interface IPermissionsResponse extends IFetchResponse
{
    body: IPermissionsBody;
}
