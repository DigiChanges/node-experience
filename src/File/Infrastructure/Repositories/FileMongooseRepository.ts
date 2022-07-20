import { Query } from 'mongoose';
import { injectable } from 'inversify';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import IFileRepository from './IFileRepository';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../App/Presentation/Shared/Orm/MongoosePaginator';
import IFile from '../Schemas/IFileDocument';
import IFileDomain from '../../Domain/Entities/IFileDomain';

import BaseMongooseRepository from '../../../App/Infrastructure/Repositories/BaseMongooseRepository';
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
            const name: string = filter.get(FileFilter.NAME);
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default FileMongooseRepository;
