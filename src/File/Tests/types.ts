import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IFileVersionTransformer from '../Presentation/Transformers/IFileVersionTransformer';
import IFileTransformer from '../Presentation/Transformers/IFileTransformer';

interface IFileBody extends IBodyResponse
{
    data: IFileTransformer;
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
