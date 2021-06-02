import {Query} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import IFileRepository from '../../InterfaceAdapters/IFileRepository';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import IFile from '../../InterfaceAdapters/IFileDocument';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';

import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';
import File from '../../Domain/Entities/File';

@injectable()
class FileMongoRepository extends BaseMongoRepository<IFileDomain, IFile> implements IFileRepository
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
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(FileFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }
}

export default FileMongoRepository;
