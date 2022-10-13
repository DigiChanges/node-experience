import IFileVersionRepository from './IFileVersionRepository';
import { injectable } from 'inversify';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import Paginator from '../../../Shared/Infrastructure/Orm/MikroORMPaginator';
import FileFilter from '../../Presentation/Criterias/FileFilter';
import FileVersionSchema from '../Schemas/FileVersionMikroORM';
import FileVersion from '../../Domain/Entities/FileVersion';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

import BaseMikroORMRepository from '../../../Shared/Infrastructure/Repositories/BaseMikroORMRepository';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../../Shared/Infrastructure/Repositories/IByOptions';

@injectable()
class FileVersionMikroORMRepository extends BaseMikroORMRepository<IFileVersionDomain> implements IFileVersionRepository
{
    constructor()
    {
        super('FileVersion', FileVersionSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.em.createQueryBuilder('FileVersion', 'i');

        const filter = criteria.getFilter();

        void queryBuilder.where('1 = 1');

        if (filter.has(FileFilter.NAME))
        {
            void queryBuilder.andWhere(`i.${  FileFilter.NAME  } like %?%`, [filter.get(FileFilter.NAME)]);
        }

        return new Paginator(queryBuilder, criteria);
    }

    async getLastOneBy(conditions: Record<string, any>, options: IByOptions = {}): Promise<IFileVersionDomain>
    {
        const { initThrow = false } = options;

        const queryOptions = {
            populate: this.populate,
            orderBy: { createdAt: 'desc' },
            limit: 1
        };
        const [fileVersion] = await this.repository.find(conditions, queryOptions as any);

        if (!fileVersion && initThrow)
        {
            throw new NotFoundException(this.entityName);
        }

        return fileVersion;
    }
}

export default FileVersionMikroORMRepository;
