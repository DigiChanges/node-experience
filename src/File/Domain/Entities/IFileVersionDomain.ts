import IFileDomain from './IFileDomain';
import FileRepPayload from '../Payloads/FileRepPayload';
import { IBaseDomain } from '../../../Main/Domain/Entities';

interface IFileVersionDomain extends IBaseDomain, FileRepPayload
{
    file: IFileDomain;
    setName(hasOriginalName: boolean): void;
}

export default IFileVersionDomain;
