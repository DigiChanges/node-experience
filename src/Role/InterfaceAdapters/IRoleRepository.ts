import IBaseRepository from '../../App/InterfaceAdapters/IBaseRepository';
import IRoleDomain from './IRoleDomain';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    get_by_slug(slug: string): Promise<IRoleDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IRoleRepository;
