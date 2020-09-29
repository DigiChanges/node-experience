import {DocumentQuery, Model} from "mongoose";
import {injectable} from "inversify";

import ErrorException from "../../Application/Shared/ErrorException";
import IFileRepository from "../../InterfaceAdapters/IRepositories/IFileRepository";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

import StatusCode from "../../Presentation/Shared/StatusCode";
import FileFilter from "../../Presentation/Criterias/File/FileFilter";
import MongoPaginator from "../../Presentation/Shared/MongoPaginator";
import IFile from "../../InterfaceAdapters/IEntities/Mongoose/IFileDocument";
import IFileDomain from "../../InterfaceAdapters/IDomain/IFileDomain";
import {connection} from "../Database/MongooseCreateConnection";

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
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'File Not Found');
            }

            return item;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'File Not Found');
        }
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: DocumentQuery<IFile[], IFile> = this.repository.find();
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
                throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'File Not Found');
            }

            return item;
        }
        catch(e)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'File Not Found');
        }
    }

}

export default FileMongoRepository;