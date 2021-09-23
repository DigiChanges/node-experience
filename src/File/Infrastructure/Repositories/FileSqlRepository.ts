import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import Paginator from '../../../App/Presentation/Shared/Paginator';
import FileFilter from '../../Presentation/Criterias/FileFilter';
import FileSchema from '../Schema/FileTypeORM';
import File from '../../Domain/Entities/File';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';

import BaseSqlRepository from '../../../App/Infrastructure/Repositories/BaseSqlRepository';

@injectable()
class FileSqlRepository extends BaseSqlRepository<IFileDomain> implements IFileRepository
{
    constructor()
    {
        super(File.name, FileSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder = this.repository.createQueryBuilder('i');

        const filter = criteria.getFilter();

        queryBuilder.where('1 = 1');

        if (filter.has(FileFilter.NAME))
        {
            queryBuilder.andWhere(`i.${  FileFilter.NAME  } like :${  FileFilter.NAME}`);
            queryBuilder.setParameter(FileFilter.NAME, `%${filter.get(FileFilter.NAME)}%`);
        }

        return new Paginator(queryBuilder, criteria);
    }
}

export default FileSqlRepository;
