import { Query } from 'mongoose';
import { injectable } from 'inversify';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import IFileVersionRepository from './IFileVersionRepository';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import IFileVersion from '../Schemas/FileVersionMongooseDocument';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import FileVersion from '../../Domain/Entities/FileVersion';

@injectable()
class FileVersionMongooseRepository extends BaseMongooseRepository<IFileVersionDomain, IFileVersion> implements IFileVersionRepository
{
    constructor()
    {
        super(FileVersion.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IFileVersion[], IFileVersion> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default FileVersionMongooseRepository;
