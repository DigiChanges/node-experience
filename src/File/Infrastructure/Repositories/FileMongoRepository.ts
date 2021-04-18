import {Query} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import IFileRepository from '../../InterfaceAdapters/IFileRepository';

import FileFilter from '../../Presentation/Criterias/FileFilter';
import MongoPaginator from '../../../App/Presentation/Shared/MongoPaginator';
import IFile from '../../InterfaceAdapters/IFileDocument';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';

import NotFoundException from '../../../App/Infrastructure/Exceptions/NotFoundException';
import BaseMongoRepository from '../../../App/Infrastructure/Repositories/BaseMongoRepository';

@injectable()
class FileMongoRepository extends BaseMongoRepository<IFileDomain, IFile> implements IFileRepository
{
    constructor()
    {
        super('File');
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        const file = await this.repository.findOne({_id: id});

        if (!file)
        {
            throw new NotFoundException('File');
        }

        return file;
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

    async update(file: IFileDomain): Promise<IFileDomain>
    {
        return this.repository.findByIdAndUpdate({_id: file.getId()}, file);
    }

    async delete(id: string): Promise<IFileDomain>
    {
        const file = await this.repository.findByIdAndDelete({_id: id});

        if (!file)
        {
            throw new NotFoundException('File');
        }

        return file;
    }
}

export default FileMongoRepository;
