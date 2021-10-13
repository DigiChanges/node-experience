import IFileDomain from './IFileDomain';

interface IFileService
{
    get_file_url(file: IFileDomain, expiry: number): Promise<string>
}

export default IFileService;
