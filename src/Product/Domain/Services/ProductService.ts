
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ProductSavePayload from '../Payloads/ProductSavePayload';
import IProductRepository from '../../Infraestructure/Repositories/IProductRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Product from '../Entities/Product';
import IProductDomain from '../Entities/IProductDomain';
import ICategoryRepository from '../../../Category/Infraestructure/Repositories/ICategoryRepository';

class ProductService
{
    private repository: IProductRepository;
    private repositoryCategory: ICategoryRepository;
    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IProductRepository>(REPOSITORIES.IProductRepository);
        this.repositoryCategory = container.resolve<ICategoryRepository>(REPOSITORIES.ICategoryRepository);
    }

    async create(payload: ProductSavePayload): Promise<Product>
    {
        const product = new Product(payload);
        await this.repository.save(product);
        return product;
    }

    async list(): Promise<IProductDomain[]>
    {
        const data: IProductDomain[] = await this.repository.list();
        const categories: Record<string, boolean> = {}; // Objeto para almacenar las categorías encontradas y su estado de habilitación
        const dataToShow: IProductDomain[] = [];
        for (const product of data)
        {
            const { category } = product;
            let categoryEnabled = categories[category]; // Verificar si la categoría ya se encuentra en el objeto

            if (categoryEnabled === undefined)
            { // Si no está, realizar una consulta a la base de datos
                const findCategory = await this.repositoryCategory.getOne(category);
                categoryEnabled = findCategory.enable;
                categories[category] = categoryEnabled; // Almacenar el estado de habilitación de la categoría para futuras consultas
            }

            if (categoryEnabled)
            {
                dataToShow.push(product);
            }
        }

        return dataToShow;
    }
}

export default ProductService;
