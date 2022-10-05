import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IFileVersionTransformer from '../Presentation/Transformers/IFileVersionTransformer';

interface IFileBody extends IBodyResponse
{
    data: IFileVersionTransformer;
}

interface IListFileBody extends IBodyResponse
{
    data: IFileVersionTransformer[];
}

export interface IFileResponse extends IFetchResponse
{
    body: IFileBody;
}

export interface IListFilesResponse extends IFetchResponse
{
    body: IListFileBody;
}
