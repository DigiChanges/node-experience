import { IBaseDomain } from '@digichanges/shared-experience';
import IFileDomain from './IFileDomain';
import FileRepPayload from '../Payloads/FileRepPayload';

interface IFileVersionDomain extends IBaseDomain, FileRepPayload
{
    file: IFileDomain;
    setName(hasOriginalName: boolean): void;
}

export default IFileVersionDomain;
