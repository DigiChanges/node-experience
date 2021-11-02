import UserSeed from './User/Infrastructure/Seeds/UserSeed';
import ItemSeed from './Item/Infrastructure/Seeds/ItemSeed';

const seeds = {
    [UserSeed.name]: UserSeed,
    [ItemSeed.name]: ItemSeed
};

export default seeds;
