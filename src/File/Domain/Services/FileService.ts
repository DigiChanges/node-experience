import {injectable} from 'inversify';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import IFileService from '../../InterfaceAdapters/IFileService';

@injectable()
class FileService implements IFileService
{
    public async getFileUrl(file: IFileDomain, expiry: number): Promise<string>
    {
        const  filesystem = FilesystemFactory.create();

        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        return await filesystem.presignedGetObject(file.getId(), expiry, metadata);
    }
}

export default FileService;
