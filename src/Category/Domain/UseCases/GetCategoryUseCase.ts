import ICategoryRepository from 'Category/Infrastructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryDomain from '../Entitites/ICategoryDomain';

class GetCategoryUseCase {
  private repository: ICategoryRepository;

  constructor() {
    const { container } = getRequestContext();
    this.repository = container.resolve<ICategoryRepository>(
      REPOSITORIES.ICategoryRepository
    );
  }

  async handle(payload: IdPayload): Promise<ICategoryDomain> {
    return await this.repository.getOne(payload.id);
  }
}

export default GetCategoryUseCase;
