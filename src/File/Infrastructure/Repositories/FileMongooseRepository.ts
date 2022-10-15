import { Query } from 'mongoose';
import { injectable } from 'inversify';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import IFile from '../Schemas/FileMongooseDocument';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from './IFileRepository';
import File from '../../Domain/Entities/File';

@injectable()
class FileMongooseRepository extends BaseMongooseRepository<IFileDomain, IFile> implements IFileRepository
{
    constructor()
    {
        super(File.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IFile[], IFile> = this.repository.find();
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

export default FileMongooseRepository;
