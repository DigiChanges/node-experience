import IProductDomain from '../Entities/IProductDomain';
// import ProductSavePayload from '../Payloads/ProductSavePayload';
// import ProductService from '../Services/ProductService';

class GetCategoryUseCase
{
    // private categoryService: ProductService;
    constructor()
    {
        // this.categoryService = new ProductService();
    }

    async handle(): Promise<void>
    {
        // const category: IProductDomain[] = await this.categoryService.list();
        // return category;
    }
}

export default GetCategoryUseCase;
