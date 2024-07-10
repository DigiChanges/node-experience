import IFileDomain from '../Entities/IFileDomain';
import IBaseRepository from '../../../Main/Domain/Repositories/IBaseRepository';

abstract class IFileRepository extends IBaseRepository<IFileDomain>
{}

export default IFileRepository;
