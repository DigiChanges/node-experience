import IFileDomain from './IFileDomain';

interface IFileBuild
{
    originalName: string;
    hasOriginalName: boolean;
    isOptimized: boolean;
    file: IFileDomain;
}

export default IFileBuild;
