import { Query } from 'mongoose';

import FileFilter from '../../Presentation/Criterias/FileFilter';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IFileDomain from '../../Domain/Entities/IFileDomain';
import IFileRepository from '../../Domain/Repositories/IFileRepository';
import File from '../../Domain/Entities/File';
import { FileMongooseDocument } from '../Schemas/FileMongoose';
import { ICriteria } from '../../../Main/Domain/Criteria';
import ResponsePayload from '../../../Shared/Utils/ResponsePayload';

class FileMongooseRepository extends BaseMongooseRepository<IFileDomain, FileMongooseDocument> implements IFileRepository
{
    constructor()
    {
        super(File.name);
    }

    async list(criteria: ICriteria): Promise<ResponsePayload<IFileDomain>>
    {
        const queryBuilder: Query<FileMongooseDocument[], FileMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rSearch);
        }

        return this.pagination(queryBuilder, criteria);
    }
}

export default FileMongooseRepository;
