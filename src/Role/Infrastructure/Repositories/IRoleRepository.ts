import IBaseRepository from '../../../App/InterfaceAdapters/IBaseRepository';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    getBySlug(slug: string): Promise<IRoleDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IRoleRepository;
