import UserSeed from './Auth/Infrastructure/Seeds/UserSeed';
import ProductSeed from './Product/Infrastructure/Seeds/ProductSeed';
import ItemSeed from './Item/Infrastructure/Seeds/ItemSeed';

const seeds = {
    [UserSeed.name]: UserSeed,
    [ProductSeed.name]: ProductSeed,
    [ItemSeed.name]: ItemSeed
};

export default seeds;
