import ICategoryRepository from 'Category/Infrastructure/Repositories/ICategoryRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';

class ListCategoryUseCase {
  private repository: ICategoryRepository;

  constructor() {
    const { container } = getRequestContext();
    this.repository = container.resolve<ICategoryRepository>(
      REPOSITORIES.ICategoryRepository
    );
  }

  async handle(payload: ICriteria): Promise<IPaginator> {
    return await this.repository.list(payload);
  }
}

export default ListCategoryUseCase;
