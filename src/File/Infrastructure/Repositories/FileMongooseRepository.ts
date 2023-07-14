import { Query } from 'mongoose';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from './IFileRepository';
import File from '../../Domain/Entities/File';
import { FileMongooseDocument } from '../Schemas/FileMongoose';

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
