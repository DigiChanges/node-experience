import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import IFileTransformer from '../Presentation/Transformers/IFileTransformer';

interface IFileBody extends IBodyResponse
{
    data: IFileTransformer;
}

interface IListFileBody extends IBodyResponse
{
    data: IFileTransformer[];
}

export interface IFileResponse extends IFetchResponse
{
    body: IFileBody;
}

export interface IListFilesResponse extends IFetchResponse
{
    body: IListFileBody;
}
