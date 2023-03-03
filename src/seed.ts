import UserSeed from './Auth/Infrastructure/Seeds/UserSeed';
import ProductSeed from './Product/Infrastructure/Seeds/ProductSeed';
import CategorySeed from './Category/Infrastructure/Seeds/CategorySeed';

const seeds = {
    [UserSeed.name]: UserSeed,
    [CategorySeed.name]: CategorySeed,
    [ProductSeed.name]: ProductSeed
};

export default seeds;
