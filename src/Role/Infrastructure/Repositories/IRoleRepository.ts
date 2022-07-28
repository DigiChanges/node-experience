import IBaseRepository from '../../../App/Infrastructure/Repositories/IBaseRepository';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    getBySlug(slug: string): Promise<IRoleDomain>;
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IRoleRepository;
