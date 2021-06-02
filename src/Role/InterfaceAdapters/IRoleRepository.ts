import IBaseRepository from '../../App/InterfaceAcapters/IBaseRepository';
import IRoleDomain from './IRoleDomain';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    getBySlug(slug: string): Promise<IRoleDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IRoleRepository;
