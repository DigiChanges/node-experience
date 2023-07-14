import { Query } from 'mongoose';
import { NotFoundException, IPaginator, ICriteria } from '@digichanges/shared-experience';

import IFileVersionRepository from './IFileVersionRepository';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoosePaginator from '../../../Shared/Infrastructure/Orm/MongoosePaginator';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

import BaseMongooseRepository from '../../../Shared/Infrastructure/Repositories/BaseMongooseRepository';
import FileVersion from '../../Domain/Entities/FileVersion';
import IByOptions from '../../../Shared/Infrastructure/Repositories/IByOptions';
import { FileVersionMongooseDocument } from '../Schemas/FileVersionMongoose';

class FileVersionMongooseRepository extends BaseMongooseRepository<IFileVersionDomain, FileVersionMongooseDocument> implements IFileVersionRepository
{
    constructor()
    {
        super(FileVersion.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<FileVersionMongooseDocument[], FileVersionMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }

    async getLastOneByFields(file: string, version: number = null, options: IByOptions = {}): Promise<IFileVersionDomain>
    {
        const { initThrow = false } = options;

        let conditions: any = { file };

        if (version)
        {
            conditions = { ...conditions, version };
        }

        const [fileVersion] = await this.repository.find(conditions)
            .sort({ version: -1 })
            .limit(1)
            .populate(this.populate);

        if (!fileVersion && initThrow)
        {
            throw new NotFoundException(this.entityName);
        }

        return fileVersion;
    }

    async getOneByFileIdAndVersion(file: string, version: number = null): Promise<IFileVersionDomain>
    {
        let conditions: any = { file };

        if (version)
        {
            conditions = { ...conditions, version };
        }

        return await this.getOneBy(conditions);
    }

    async getAllByFileId(file: string): Promise<IFileVersionDomain[]>
    {
        return await this.getBy({ file });
    }
}

export default FileVersionMongooseRepository;
