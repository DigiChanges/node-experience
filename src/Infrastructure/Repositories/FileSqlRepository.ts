import IFileRepository from "../../InterfaceAdapters/IRepositories/IFileRepository";
import {DeleteResult, getRepository, Repository} from "typeorm";
import {injectable} from "inversify";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import Paginator from "../../Presentation/Shared/Paginator";
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";
import FileFilter from "../../Presentation/Criterias/File/FileFilter";
import FileSchema from "../Schema/TypeORM/File";
import File from "../../Domain/Entities/File";
import IFileDomain from "../../InterfaceAdapters/IDomain/IFileDomain";

@injectable()
class FileSqlRepository implements IFileRepository
{
    private repository: Repository<File>;

    constructor()
    {
        this.repository = getRepository<File>(FileSchema);
    }

    async save (file: IFileDomain ): Promise<File>
    {
        return await this.repository.save(file);
    }

    async getOne(id: string): Promise<File>
    {
        const file = await this.repository.findOne(id);

        if (!file)
        {
            throw new ErrorException(StatusCode.HTTP_BAD_REQUEST, 'File Not Found')
        }

        return file;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        if (filter.has(FileFilter.TYPE))
        {
            queryBuilder.andWhere("i." + FileFilter.TYPE + " = :" + FileFilter.TYPE);
            queryBuilder.setParameter(FileFilter.TYPE, filter.get(FileFilter.TYPE));
        }
        if (filter.has(FileFilter.NAME))
        {
            queryBuilder.andWhere("i." + FileFilter.NAME + " like :" + FileFilter.NAME);
            queryBuilder.setParameter(FileFilter.NAME, '%' + filter.get(FileFilter.NAME) + '%');
        }

        return new Paginator(queryBuilder, criteria);
    }

    async update(file: IFileDomain): Promise<any>
    {
        await this.repository.save(file);
    }

    async delete(id: any): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

}

export default FileSqlRepository;
