import IBaseRepository from '../../../../Main/Infrastructure/Repositories/IBaseRepository';
import IRoleDomain from '../../../Domain/Entities/IRoleDomain';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

interface IRoleRepository extends Omit<IBaseRepository<IRoleDomain>, 'getInBy' | 'getBy' | 'getOneBy' | 'delete' | 'update'>
{
    list(criteria: ICriteria): Promise<IPaginator>;
    getAll(): Promise<IRoleDomain[]>;
    delete(name: string): Promise<any>;
    update(element: IRoleDomain, id: string): Promise<IRoleDomain>;
}

export default IRoleRepository;
