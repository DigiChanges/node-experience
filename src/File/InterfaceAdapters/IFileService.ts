import IFileDomain from './IFileDomain';

interface IFileService
{
    getFileUrl(file: IFileDomain, expiry: number): Promise<string>
}

export default IFileService;
