import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IGroupPermission from '../../Config/IGroupPermission';

interface IPermissionsBody extends IBodyResponse
{
    data: IGroupPermission[];
}

export interface IPermissionsResponse extends IFetchResponse
{
    body: IPermissionsBody;
}
