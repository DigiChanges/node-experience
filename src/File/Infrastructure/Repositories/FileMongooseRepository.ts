import { Query } from 'mongoose';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from '../../Domain/Repositories/IFileRepository';
import File from '../../Domain/Entities/File';
import { FileMongooseDocument } from '../Schemas/FileMongoose';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

class FileMongooseRepository extends BaseMongooseRepository<IFileDomain, FileMongooseDocument> implements IFileRepository
{
    constructor()
    {
        super(File.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<FileMongooseDocument[], FileMongooseDocument> = this.repository.find();
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
