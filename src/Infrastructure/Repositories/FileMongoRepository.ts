import {Query, Model} from 'mongoose';
import {injectable} from 'inversify';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import IFileRepository from '../../InterfaceAdapters/IRepositories/IFileRepository';

import FileFilter from '../../Presentation/Criterias/File/FileFilter';
import MongoPaginator from '../../Presentation/Shared/MongoPaginator';
import IFile from '../../InterfaceAdapters/IEntities/Mongoose/IFileDocument';
import IFileDomain from '../../InterfaceAdapters/IDomain/IFileDomain';
import {connection} from '../Database/MongooseCreateConnection';

import NotFoundException from '../Exceptions/NotFoundException';

@injectable()
class FileMongoRepository implements IFileRepository
{
    private readonly repository: Model<IFile>;

    constructor()
    {
        this.repository = connection.model<IFile>('File');
    }

    async save(file: IFileDomain): Promise<IFileDomain>
    {
        return await this.repository.create(file);
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