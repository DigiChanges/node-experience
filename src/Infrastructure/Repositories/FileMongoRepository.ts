import {Query, Model} from "mongoose";
import {injectable} from "inversify";

import IFileRepository from "../../InterfaceAdapters/IRepositories/IFileRepository";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

import FileFilter from "../../Presentation/Criterias/File/FileFilter";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IFile from "../../InterfaceAdapters/IEntities/Mongoose/IFileDocument";
import IFileDomain from "../../InterfaceAdapters/IDomain/IFileDomain";
import {connection} from "../Database/MongooseCreateConnection";

import NotFoundException from "../Exceptions/NotFoundException";

@injectable()
class FileMongoRepository implements IFileRepository
{
    private readonly repository: Model<IFile>;

    constructor()
    {
        this.repository = connection.model<IFile>('File');
    }

    async save (item: IFileDomain): Promise<IFileDomain>
    {
        return await this.repository.create(item);
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        try
        {
            const item = await this.repository.findOne({_id: id});

            if (!item)
            {
                throw new NotFoundException('File');
            }

            return item;
        }
        catch(e)
        {
            throw new NotFoundException('File');
        }
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IFile[], IFile> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FileFilter.NAME))
        {
            const name: string = filter.get(FileFilter.NAME);
            const rsearch = new RegExp(name, "g");

            queryBuilder.where(FileFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }

    async update(item: IFileDomain): Promise<IFileDomain>
    {
        return this.repository.updateOne({_id: item.getId()}, item);
    }

    async delete(id: string): Promise<IFileDomain>
    {
        try
        {
            const item = await this.repository.findByIdAndDelete({_id: id});

            if (!item)
            {
                throw new NotFoundException('File');
            }

            return item;
        }
        catch(e)
        {
            throw new NotFoundException('File');
        }
    }

}

export default FileMongoRepository;