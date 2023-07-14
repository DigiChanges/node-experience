import { IBaseDomain } from '@digichanges/shared-experience';

interface IFileDomain extends IBaseDomain
{
    currentVersion: number;
}

export default IFileDomain;
