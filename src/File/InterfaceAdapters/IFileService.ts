import IFileDomain from './IFileDomain';
import PresignedFileRepPayload from './Payloads/PresignedFileRepPayload';
import FileRepPayload from './Payloads/FileRepPayload';
import FileBase64RepPayload from './Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from './Payloads/FileMultipartRepPayload';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import ListObjectsPayload from './Payloads/ListObjectsPayload';
import CreateBucketPayload from './Payloads/CreateBucketPayload';
import IdPayload from '../../Shared/InterfaceAdapters/IdPayload';
import IFileDTO from './Payloads/IFileDTO';

interface IFileService
{
    getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    persist(file: IFileDomain, payload: FileRepPayload): Promise<IFileDomain>
    uploadFileBase64(file: IFileDomain, payload: FileBase64RepPayload): Promise<any>
    uploadFileMultipart(file: IFileDomain, payload: FileMultipartRepPayload): Promise<any>
    list(payload: ICriteria): Promise<IPaginator>
    listObjects(payload: ListObjectsPayload): Promise<any>
    getOne(id: string): Promise<IFileDomain>
    createBucket(payload: CreateBucketPayload): Promise<void>
    download(payload: IdPayload): Promise<IFileDTO>
    getFileUrl(file: IFileDomain, expiry: number): Promise<string>
}

export default IFileService;
