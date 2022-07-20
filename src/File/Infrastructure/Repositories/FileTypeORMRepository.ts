import IFileRepository from './IFileRepository';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import TypeORMPaginator from '../../../App/Presentation/Shared/Orm/TypeORMPaginator';
import FileFilter from '../../Presentation/Criterias/FileFilter';
import FileSchema from '../Schemas/FileTypeORM';
import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';

import BaseTypeORMRepository from '../../../App/Infrastructure/Repositories/BaseTypeORMRepository';

@injectable()
class FileTypeORMRepository extends BaseTypeORMRepository<IFileDomain> implements IFileRepository
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
            const name = filter.get(FileFilter.NAME);

            queryBuilder.andWhere(`i.${FileFilter.NAME} ilike :${FileFilter.NAME}`);
            queryBuilder.setParameter(FileFilter.NAME, `%${name}%`);
        }

        return new TypeORMPaginator(queryBuilder, criteria);
    }
}

export default FileTypeORMRepository;
