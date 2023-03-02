import ICategoryRepository from 'Category/Infrastructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ICategoryDomain from '../Entitites/ICategoryDomain';

class RemoveCategoryUseCase {
  private repository: ICategoryRepository;

  constructor() {
    const { container } = getRequestContext();
    this.repository = container.resolve<ICategoryRepository>(
      REPOSITORIES.ICategoryRepository
    );
  }

  async handle(payload: IdPayload): Promise<ICategoryDomain> {
    const { id } = payload;
    return await this.repository.delete(id);
  }
}

export default RemoveCategoryUseCase;
