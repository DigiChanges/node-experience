import UserSeed from './User/Infrastructure/Seeds/UserSeed';
import ItemSeed from './Item/Infrastructure/Seeds/ItemSeed';

const seeds = {
    [UserSeed.name]: new UserSeed(),
    [ItemSeed.name]: new ItemSeed()
};

export default seeds;