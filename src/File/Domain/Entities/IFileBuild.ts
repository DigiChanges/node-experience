import IFileDomain from './IFileDomain';

interface IFileBuild
{
    originalName: string;
    isOriginalName: boolean;
    isOptimized: boolean;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    isPublic: boolean;
    file: IFileDomain;
}

export default IFileBuild;
