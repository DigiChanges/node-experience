import {IBaseRepository} from '@digichanges/shared-experience';
import IRoleDomain from './IRoleDomain';

interface IRoleRepository extends IBaseRepository<IRoleDomain>
{
    getBySlug(slug: string): Promise<IRoleDomain>;
}

export default IRoleRepository;
